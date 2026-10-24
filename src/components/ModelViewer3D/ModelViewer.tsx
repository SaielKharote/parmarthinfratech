import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { isSoftwareGl, scheduleNextFrame } from '../../utils/webgl';
import { HotspotInfo, ThemeMode } from '../../types';
import { createSolarTrackerModel, Procedural3DModelResult } from './models/SolarTrackerModel';
import { createSmartMeterModel } from './models/SmartMeterModel';
import { createTransformerModel } from './models/TransformerModel';
import { createEVChargerModel } from './models/EVChargerModel';
import { ModelDock } from './ModelDock';
import { ComponentDetailModal } from './ComponentDetailModal';
import { Eye } from 'lucide-react';

interface ModelViewerProps {
  initialModel?: 'solar' | 'meter' | 'transformer' | 'ev';
  theme: ThemeMode;
  onExploreService?: (serviceId: string) => void;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  initialModel = 'solar',
  theme,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [modelType, setModelType] = useState<'solar' | 'meter' | 'transformer' | 'ev'>(initialModel);
  const [explodedValue, setExplodedValue] = useState<number>(0);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [lightingPreset, setLightingPreset] = useState<'daylight' | 'cyber' | 'sunset'>('cyber');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);

  // References for render loop state
  const stateRef = useRef({
    modelType,
    explodedValue: 0,
    targetExplodedValue: 0,
    isWireframe: false,
    autoRotate: true,
    lightingPreset: 'cyber',
    cameraAngle: { theta: 0.8, phi: 0.45, radius: 16 },
    targetAngle: { theta: 0.8, phi: 0.45, radius: 16 },
    lookAtY: 3.5,
    targetLookAtY: 3.5,
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    currentModel: null as Procedural3DModelResult | null,
    hotspotMeshes: [] as { mesh: THREE.Mesh; hotspot: HotspotInfo }[],
    isVisible: true,
  });

  // Keep stateRef synced with React state
  useEffect(() => {
    stateRef.current.modelType = modelType;
  }, [modelType]);

  useEffect(() => {
    stateRef.current.targetExplodedValue = explodedValue;
  }, [explodedValue]);

  useEffect(() => {
    stateRef.current.isWireframe = isWireframe;
  }, [isWireframe]);

  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    stateRef.current.lightingPreset = lightingPreset;
  }, [lightingPreset]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = null; // Transparent to blend with background

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(12, 8, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setSize(width, height);
    // Cap pixel ratio to 1.25 on mobile / low-power to prevent GPU stutter
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = !isSoftwareGl && window.innerWidth >= 768;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment map using PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    // Studio 3-Point Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(10, 18, 10);
    if (renderer.shadowMap.enabled) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.85); // Cool cyan fill
    fillLight.position.set(-10, 10, -8);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 1.1); // Warm solar rim
    rimLight.position.set(0, 12, -14);
    scene.add(rimLight);

    // Soft Contact Shadow Plane Grounding
    const shadowGeo = new THREE.PlaneGeometry(24, 24);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0,0,0,0.45)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.18)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // Group for currently active model
    const activeModelGroup = new THREE.Group();
    scene.add(activeModelGroup);

    // Hotspot group
    const hotspotGroup = new THREE.Group();
    scene.add(hotspotGroup);

    // Helper to load model
    const loadCurrentModel = (type: 'solar' | 'meter' | 'transformer' | 'ev') => {
      if (stateRef.current.currentModel) {
        stateRef.current.currentModel.dispose();
        activeModelGroup.clear();
      }

      hotspotGroup.clear();
      stateRef.current.hotspotMeshes = [];

      let model: Procedural3DModelResult;
      if (type === 'solar') {
        model = createSolarTrackerModel();
        stateRef.current.targetAngle = { theta: 0.8, phi: 0.45, radius: 18 };
        stateRef.current.targetLookAtY = 4.0;
      } else if (type === 'meter') {
        model = createSmartMeterModel();
        stateRef.current.targetAngle = { theta: 0.4, phi: 0.35, radius: 16 };
        stateRef.current.targetLookAtY = 4.2;
      } else if (type === 'transformer') {
        model = createTransformerModel();
        stateRef.current.targetAngle = { theta: 0.9, phi: 0.4, radius: 17 };
        stateRef.current.targetLookAtY = 3.2;
      } else {
        model = createEVChargerModel();
        stateRef.current.targetAngle = { theta: 0.6, phi: 0.35, radius: 16 };
        stateRef.current.targetLookAtY = 3.6;
      }

      stateRef.current.currentModel = model;
      activeModelGroup.add(model.group);

      // Create Hotspot Markers
      const markerGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.85,
      });

      model.hotspots.forEach((spot) => {
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.set(...spot.position);
        marker.userData = { isHotspot: true, hotspot: spot };
        hotspotGroup.add(marker);
        stateRef.current.hotspotMeshes.push({ mesh: marker, hotspot: spot });
      });
    };

    loadCurrentModel(stateRef.current.modelType);

    // Raycaster for mouse clicks on hotspots
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        stateRef.current.hotspotMeshes.map((h) => h.mesh)
      );

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData?.hotspot) {
          setActiveHotspot(hit.userData.hotspot);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('click', handleCanvasClick);

    // Mouse / Touch Orbit Controls (Configured to avoid scroll hijacking)
    let pointerStartX = 0;
    let pointerStartY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.dragStart.x;
      const dy = e.clientY - stateRef.current.dragStart.y;
      stateRef.current.dragStart = { x: e.clientX, y: e.clientY };

      stateRef.current.targetAngle.theta -= dx * 0.008;
      stateRef.current.targetAngle.phi = Math.max(
        0.05,
        Math.min(Math.PI / 2.1, stateRef.current.targetAngle.phi - dy * 0.008)
      );
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    // Zoom on wheel ONLY when Ctrl key is pressed or inside explicit zoom interaction,
    // so normal page scrolling is never blocked or hijacked!
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        stateRef.current.targetAngle.radius = Math.max(
          7,
          Math.min(28, stateRef.current.targetAngle.radius + e.deltaY * 0.015)
        );
      }
    };

    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // IntersectionObserver: Only render when 3D viewer is visible on screen!
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        stateRef.current.isVisible = entry ? entry.isIntersecting : true;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      width = mountRef.current.clientWidth;
      height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let currentActiveModelType = stateRef.current.modelType;

    const render = () => {
      // If element is offscreen, skip rendering to eliminate CPU/GPU lag!
      if (!stateRef.current.isVisible) {
        animationFrameId = scheduleNextFrame(renderer, render);
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Check if model changed in state
      if (currentActiveModelType !== stateRef.current.modelType) {
        currentActiveModelType = stateRef.current.modelType;
        loadCurrentModel(currentActiveModelType);
      }

      // Smooth camera interpolation
      const s = stateRef.current;
      if (s.autoRotate && !s.isDragging) {
        s.targetAngle.theta += delta * 0.25;
      }

      s.cameraAngle.theta += (s.targetAngle.theta - s.cameraAngle.theta) * 0.1;
      s.cameraAngle.phi += (s.targetAngle.phi - s.cameraAngle.phi) * 0.1;
      s.cameraAngle.radius += (s.targetAngle.radius - s.cameraAngle.radius) * 0.1;

      const r = s.cameraAngle.radius;
      const x = r * Math.sin(s.cameraAngle.phi) * Math.sin(s.cameraAngle.theta);
      const y = r * Math.cos(s.cameraAngle.phi);
      const z = r * Math.sin(s.cameraAngle.phi) * Math.cos(s.cameraAngle.theta);

      s.lookAtY += (s.targetLookAtY - s.lookAtY) * 0.1;
      camera.position.set(x, Math.max(1.2, y + 1.5), z);
      camera.lookAt(0, s.lookAtY, 0);

      // Smooth exploded value interpolation
      s.explodedValue += (s.targetExplodedValue - s.explodedValue) * 0.12;

      // Update model physics / exploded views
      if (s.currentModel) {
        s.currentModel.update(elapsedTime, s.explodedValue, s.isWireframe);
      }

      // Subtle hotspot pulsing scale
      s.hotspotMeshes.forEach((item, idx) => {
        const pulse = 1 + Math.sin(elapsedTime * 3 + idx) * 0.12;
        item.mesh.scale.set(pulse, pulse, pulse);
      });

      renderer.render(scene, camera);
      animationFrameId = scheduleNextFrame(renderer, render);
    };

    animationFrameId = scheduleNextFrame(renderer, render);

    return () => {
      observer.disconnect();
      domElement.removeEventListener('click', handleCanvasClick);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);

      if (isSoftwareGl) {
        clearTimeout(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
      }

      if (stateRef.current.currentModel) {
        stateRef.current.currentModel.dispose();
      }

      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      scene.clear();
      renderer.dispose();

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  const handleResetCamera = useCallback(() => {
    stateRef.current.targetAngle = { theta: 0.8, phi: 0.45, radius: 16 };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[400px] sm:h-[500px] md:h-[580px] rounded-3xl overflow-hidden border shadow-2xl transition-colors ${
        isDark
          ? 'bg-slate-950/80 border-slate-800 text-slate-100'
          : 'bg-slate-900/90 border-slate-700 text-slate-100'
      }`}
      data-testid="interactive-3d-model-viewer"
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'pan-y' }}
        aria-label="3D Interactive Digital Twin Canvas"
        role="img"
      />

      {/* Top Spec / Header Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex flex-col gap-1 pointer-events-none max-w-[80%] sm:max-w-none">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
            3D DIGITAL TWIN
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-mono truncate">
            {modelType === 'solar' && 'DUAL-AXIS TRACKER MW ARRAY'}
            {modelType === 'meter' && 'IS 16444 SMART AMI INFRA'}
            {modelType === 'transformer' && '33kV SUBSTATION TRANSFORMER'}
            {modelType === 'ev' && '150kW DC FAST CHARGER'}
          </span>
        </div>
        <div className="text-xs sm:text-sm font-semibold text-slate-200 hidden sm:block">
          Tap markers to inspect · Drag to orbit 360°
        </div>
      </div>

      {/* Top Right Quick Hint */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
        <Eye className="w-3.5 h-3.5 text-cyan-400" />
        <span>360° Inspector</span>
      </div>

      {/* Collapsible Bottom Control Dock */}
      <ModelDock
        modelType={modelType}
        onSelectModel={(t) => setModelType(t)}
        explodedValue={explodedValue}
        onExplodedChange={setExplodedValue}
        isWireframe={isWireframe}
        onToggleWireframe={() => setIsWireframe((prev) => !prev)}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate((prev) => !prev)}
        onResetCamera={handleResetCamera}
        lightingPreset={lightingPreset}
        onSelectLighting={setLightingPreset}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        theme={theme}
      />

      {/* Hotspot Technical Specification Modal */}
      <ComponentDetailModal
        hotspot={activeHotspot}
        onClose={() => setActiveHotspot(null)}
        theme={theme}
      />
    </div>
  );
};
