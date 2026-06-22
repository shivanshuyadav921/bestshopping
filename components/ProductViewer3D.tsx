/* PREMA ENGINEERING WORKS — 3D Product Viewer */
/* Interactive 3D visualization with rotation, zoom, and dramatic lighting */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ProductViewer3DProps {
  imageUrl: string;
  productName: string;
  lightingStyle: 'studio' | 'dramatic' | 'ambient';
}

export default function ProductViewer3D({ imageUrl, productName, lightingStyle }: ProductViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup based on style
    if (lightingStyle === 'studio') {
      // Studio lighting: bright, even, professional
      const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
      mainLight.position.set(5, 5, 5);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 2048;
      mainLight.shadow.mapSize.height = 2048;
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
      fillLight.position.set(-5, 3, -5);
      scene.add(fillLight);

      const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
      backLight.position.set(0, 5, -5);
      scene.add(backLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
    } else if (lightingStyle === 'dramatic') {
      // Dramatic lighting: high contrast, moody
      const mainLight = new THREE.DirectionalLight(0xff6b35, 1.5);
      mainLight.position.set(6, 4, 3);
      mainLight.castShadow = true;
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0x004e89, 0.8);
      fillLight.position.set(-6, 2, -4);
      scene.add(fillLight);

      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.4);
      scene.add(ambientLight);
    } else {
      // Ambient lighting: soft, natural
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const softLight = new THREE.DirectionalLight(0xffffff, 0.6);
      softLight.position.set(4, 4, 4);
      scene.add(softLight);
    }

    // Create a placeholder geometry (since we're using image as texture)
    // In a real scenario, you'd load an actual 3D model
    const geometry = new THREE.IcosahedronGeometry(1.5, 4);
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      imageUrl,
      (texture: THREE.Texture) => {
        const material = new THREE.MeshPhongMaterial({
          map: texture,
          shininess: 100,
          emissive: 0x111111,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        meshRef.current = mesh;
        setIsLoading(false);
      },
      undefined,
      (error: any) => {
        console.error('Error loading texture:', error);
        // Fallback: create a simple material
        const material = new THREE.MeshPhongMaterial({
          color: 0x888888,
          shininess: 100,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        meshRef.current = mesh;
        setIsLoading(false);
      }
    );

    // Mouse interaction
    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.movementX * 0.01;
      const deltaY = e.movementY * 0.01;

      setTargetRotation((prev) => ({
        x: prev.x + deltaY,
        y: prev.y + deltaX,
      }));
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('mouseleave', onMouseUp);

    // Touch interaction
    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const deltaX = (e.touches[0].clientX - touchStartX) * 0.01;
      const deltaY = (e.touches[0].clientY - touchStartY) * 0.01;

      setTargetRotation((prev) => ({
        x: prev.x + deltaY,
        y: prev.y + deltaX,
      }));

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    renderer.domElement.addEventListener('touchstart', onTouchStart);
    renderer.domElement.addEventListener('touchmove', onTouchMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation interpolation
      setRotation((prev) => ({
        x: prev.x + (targetRotation.x - prev.x) * 0.1,
        y: prev.y + (targetRotation.y - prev.y) * 0.1,
      }));

      if (meshRef.current) {
        meshRef.current.rotation.x = rotation.x;
        meshRef.current.rotation.y = rotation.y;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mouseleave', onMouseUp);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [lightingStyle]);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto" />
            <p className="text-sm text-gray-400">Loading {productName}...</p>
          </div>
        </div>
      )}

      {/* Interaction hint */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-500 pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
