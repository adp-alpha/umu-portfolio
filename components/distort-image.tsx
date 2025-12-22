'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { StaticImageData } from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { ShaderMaterial, TextureLoader, Vector2 } from 'three';

interface DistortImageProps {
    canvasImage: string | StaticImageData;
    revealImage?: string | StaticImageData;
    blockSize?: number;
    objectFit?: 'cover' | 'contain';
}

// --------------------------------------------------------------------------------
// SHADER: SIMULATION (The Liquid Trail)
// --------------------------------------------------------------------------------
const simulationVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const simulationFragmentShader = `
uniform sampler2D uInput; // Previous frame
uniform vec2 uMouse;
uniform float uAspect;
uniform bool uHasMouse;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    // Sample previous frame
    vec4 current = texture2D(uInput, uv);

    // Fade out (Dissipation)
    // .96 = Long trails, .90 = Short trails
    current.rgb *= 0.94;

    // Mouse Input (Brush)
    if (uHasMouse) {
        // Adjust mouse distance for aspect ratio to get perfect circle
        vec2 aspectUV = uv;
        aspectUV.x *= uAspect;

        vec2 aspectMouse = uMouse;
        aspectMouse.x *= uAspect;

        float dist = distance(aspectUV, aspectMouse);

        // Brush size and intensity
        float radius = 0.15;
        float intensity = smoothstep(radius, 0.0, dist);

        // Add to current buffer (Liquid addition)
        current.rgb += intensity * 0.8;
    }

    current.rgb = clamp(current.rgb, 0.0, 1.0);
    gl_FragColor = current;
}
`;

// --------------------------------------------------------------------------------
// SHADER: MAIN RENDER (Displacement + Reveal)
// --------------------------------------------------------------------------------
const mainVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const mainFragmentShader = `
uniform sampler2D uTexture;     // Base
uniform sampler2D uReveal;      // Reveal
uniform bool uHasReveal;
uniform sampler2D uDisplacement; // FBO Trail
uniform float uImgAspect;
uniform float uCanvasAspect;
uniform float uObjectFit;

varying vec2 vUv;

vec3 grayscale(vec3 color) {
    float g = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(g);
}

void main() {
    vec2 uv = vUv;

    // --- 1. Get Displacement Value ---
    vec4 disp = texture2D(uDisplacement, uv);
    float d = disp.r; // Distortion intensity from trail

    // --- 2. Displace UVs for LIQUID effect ---
    // We displace the UVs used for the texture lookup.
    // Shift pixels slightly based on trail intensity
    vec2 distortUV = uv - vec2(d * 0.05, d * 0.05 * (uCanvasAspect > 1.0 ? 1.0 : uCanvasAspect));

    // --- 3. Aspect Ratio Correction ---
    // We must apply aspect correction to the DISTORTED UVs
    vec2 finalUV = distortUV;

    float canvasRatio = uCanvasAspect;
    float imageRatio = uImgAspect;
    vec2 scale = vec2(1.0);

    if (uObjectFit > 0.5) { // Contain
        if (canvasRatio > imageRatio) scale.x = imageRatio / canvasRatio;
        else scale.y = canvasRatio / imageRatio;
    } else { // Cover
        if (canvasRatio > imageRatio) scale.y = canvasRatio / imageRatio;
        else scale.x = imageRatio / canvasRatio;
    }
    finalUV = (finalUV - 0.5) / scale + 0.5;

    // Bounds check
    if (finalUV.x < 0.0 || finalUV.x > 1.0 || finalUV.y < 0.0 || finalUV.y > 1.0) discard;

    // --- 4. Sample Colors ---
    vec4 baseColor = texture2D(uTexture, finalUV);
    if (!uHasReveal) baseColor.rgb = grayscale(baseColor.rgb);
    vec4 revealColor = texture2D(uReveal, finalUV);

    // --- 5. Mix based on Displacement (Reveal Mask) ---
    // Map d (0..1) to opacity.
    float mixFactor = smoothstep(0.05, 0.4, d); // Threshold to reveal

    vec4 finalColor = mix(baseColor, revealColor, mixFactor);

    // Optional: Add a "glitch" line or chromatic aberration at the edge?
    // Let's keep it clean liquid like Lando.

    gl_FragColor = finalColor;
}
`;


const DistortImage = ({ canvasImage, revealImage, objectFit = 'cover' }: DistortImageProps) => {
    const { gl, size, viewport } = useThree();
    const mouseRef = useRef(new Vector2(0.5, 0.5));
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const [revealTexture, setRevealTexture] = useState<THREE.Texture | null>(null);
    const [imgAspect, setImgAspect] = useState(1);
    const hasMouseMoved = useRef(false);

    // FBO Setup (Ping-Pong buffers)
    const [simulationTargetA] = useState(() => new THREE.WebGLRenderTarget(512, 512, {
        type: THREE.HalfFloatType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
    }));
    const [simulationTargetB] = useState(() => new THREE.WebGLRenderTarget(512, 512, {
        type: THREE.HalfFloatType,
        format: THREE.RGBAFormat,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
    }));

    const simCamera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);
    const simScene = useMemo(() => new THREE.Scene(), []);
    const simMaterial = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            uInput: { value: null },
            uMouse: { value: new Vector2(0.5, 0.5) },
            uAspect: { value: 1.0 },
            uHasMouse: { value: false }
        },
        vertexShader: simulationVertexShader,
        fragmentShader: simulationFragmentShader
    }), []);
    const simMesh = useMemo(() => new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial), [simMaterial]);

    useEffect(() => {
        simScene.add(simMesh);
    }, [simScene, simMesh]);


    // Load Textures
    useEffect(() => {
        const loader = new TextureLoader();
        const load = async () => {
             const src = typeof canvasImage === 'string' ? canvasImage : canvasImage.src;
             const tex:any = await new Promise<THREE.Texture>(resolve => loader.load(src, resolve));
             setTexture(tex);
             if (tex.image) setImgAspect(tex.image.width / tex.image.height);

             if (revealImage) {
                 const revSrc = typeof revealImage === 'string' ? revealImage : revealImage.src;
                 const revTex = await new Promise<THREE.Texture>(resolve => loader.load(revSrc, resolve));
                 setRevealTexture(revTex);
             } else {
                 setRevealTexture(tex);
             }
        };
        load();
    }, [canvasImage, revealImage]);

    // Mouse Handler
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = gl.domElement.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - ((e.clientY - rect.top) / rect.height);
            mouseRef.current.set(x, y);
            hasMouseMoved.current = true;
        };
        gl.domElement.addEventListener('mousemove', handleMouseMove);
        return () => {
             gl.domElement.removeEventListener('mousemove', handleMouseMove);
        };
    }, [gl]);

    // Main Material
    const renderMaterial = useMemo(() => new ShaderMaterial({
        uniforms: {
            uTexture: { value: null },
            uReveal: { value: null },
            uHasReveal: { value: false },
            uDisplacement: { value: null },
            uImgAspect: { value: 1 },
            uCanvasAspect: { value: 1 },
            uObjectFit: { value: objectFit === 'contain' ? 1 : 0 }
        },
        vertexShader: mainVertexShader,
        fragmentShader: mainFragmentShader
    }), [objectFit]);

    // Render Loop (Ping Pong)
    const targets = useRef({ read: simulationTargetB, write: simulationTargetA });

    useFrame(({ gl }) => {
        // 1. Update Simulation
        simMaterial.uniforms.uInput.value = targets.current.read.texture;
        simMaterial.uniforms.uMouse.value.copy(mouseRef.current);
        simMaterial.uniforms.uAspect.value = size.width / size.height;
        simMaterial.uniforms.uHasMouse.value = hasMouseMoved.current;

        // Render to write target
        gl.setRenderTarget(targets.current.write);
        gl.render(simScene, simCamera);
        gl.setRenderTarget(null);

        // 2. Update Main Material
        renderMaterial.uniforms.uDisplacement.value = targets.current.write.texture;
        renderMaterial.uniforms.uImgAspect.value = imgAspect;
        renderMaterial.uniforms.uCanvasAspect.value = size.width / size.height;
        if (texture) renderMaterial.uniforms.uTexture.value = texture;
        if (revealTexture) renderMaterial.uniforms.uReveal.value = revealTexture;
        renderMaterial.uniforms.uHasReveal.value = !!revealImage;

        // 3. Swap targets
        const t = targets.current.read;
        targets.current.read = targets.current.write;
        targets.current.write = t;
    });


    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <primitive object={renderMaterial} />
        </mesh>
    );
};

const DistortImageCanvas = ({
    canvasImage,
    revealImage,
    blockSize = 25,
    objectFit = 'cover'
}: DistortImageProps) => {
    return (
        <Canvas
            style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                display: 'block',
                cursor: 'none'
            }}
            camera={{ position: [0, 0, 5], fov: 75 }}
            dpr={[1, 2]}
        >
            <DistortImage
                canvasImage={canvasImage}
                revealImage={revealImage}
                blockSize={blockSize}
                objectFit={objectFit}
            />
        </Canvas>
    );
};

export default DistortImageCanvas;
