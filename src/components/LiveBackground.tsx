import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isSoftwareGl, scheduleNextFrame } from '../utils/webgl';
import { BackgroundStyle, ThemeMode } from '../types';
import { Compass, Smartphone, MousePointer, Sparkles } from 'lucide-react';

interface LiveBackgroundProps {
  style?: BackgroundStyle;
  theme?: ThemeMode;
  interactive?: boolean;
}

export const LiveBackground: React.FC<LiveBackgroundProps> = ({
  style = 'grid',
  theme = 'dark',
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [motionSource, setMotionSource] = useState<'mouse' | 'gyro'>('mouse');
  const [gyroPermitted, setGyroPermitted] = useState<boolean | null>(null);
  const [tiltDisplay, setTiltDisplay] = useState({ x: 0, y: 0 });
  const [showHud, setShowHud] = useState(false);

  // References for render loop
  const motionRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isGyro: false,
  });

  // Request Gyroscope permission for iOS if needed
  const requestGyroPermission = async () => {
    if (
      typeof window !== 'undefined' &&
      typeof (DeviceOrientationEvent as any) !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setGyroPermitted(true);
        } else {
          setGyroPermitted(false);
        }
      } catch (err) {
        console.warn('Gyro permission error:', err);
      }
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 42;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const isDark = theme === 'dark';

    // 2. Lighting for 3D Solar Panels
    const ambientLight = new THREE.AmbientLight(isDark ? 0x223344 : 0x778899, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.2 : 2.8);
    dirLight.position.set(20, 40, 30);
    scene.add(dirLight);

    const blueRimLight = new THREE.DirectionalLight(isDark ? 0x06b6d4 : 0x0284c7, 1.5);
    blueRimLight.position.set(-25, -20, 10);
    scene.add(blueRimLight);

    const sunLight = new THREE.PointLight(isDark ? 0xf59e0b : 0xfbbf24, 1.0, 100);
    sunLight.position.set(15, 20, 20);
    scene.add(sunLight);

    // 3. Create Procedural Solar Cell Texture
    const createSolarCellTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Deep blue photovoltaic wafer background
        ctx.fillStyle = isDark ? '#0c1b33' : '#14315c';
        ctx.fillRect(0, 0, 512, 512);

        // Individual silicon solar wafer grid (6x6 cells)
        const cols = 6;
        const rows = 6;
        const pad = 4;
        const cellW = (512 - pad * (cols + 1)) / cols;
        const cellH = (512 - pad * (rows + 1)) / rows;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = pad + c * (cellW + pad);
            const y = pad + r * (cellH + pad);

            // Solar cell gradient
            const grad = ctx.createLinearGradient(x, y, x + cellW, y + cellH);
            grad.addColorStop(0, isDark ? '#16325c' : '#1e4887');
            grad.addColorStop(0.5, isDark ? '#0f2442' : '#193d73');
            grad.addColorStop(1, isDark ? '#0a1930' : '#132d54');
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, cellW, cellH);

            // Fine micro-busbars / finger lines
            ctx.fillStyle = 'rgba(180, 220, 255, 0.25)';
            for (let f = 1; f < 5; f++) {
              ctx.fillRect(x + (cellW / 5) * f, y, 1, cellH);
            }
          }
        }

        // 3 Vertical silver main busbar ribbons
        ctx.fillStyle = 'rgba(230, 245, 255, 0.8)';
        ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fillRect(110, 0, 4, 512);
        ctx.fillRect(254, 0, 4, 512);
        ctx.fillRect(398, 0, 4, 512);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    const solarTexture = createSolarCellTexture();

    // 4. Construct 3D Solar Panel Meshes Group
    const solarPanelsGroup = new THREE.Group();
    scene.add(solarPanelsGroup);

    // Common materials for performance
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x334155 : 0x94a3b8,
      metalness: 0.85,
      roughness: 0.25,
    });

    const cellMaterial = new THREE.MeshStandardMaterial({
      map: solarTexture,
      roughness: 0.2,
      metalness: 0.6,
      emissive: isDark ? 0x051b36 : 0x07284f,
      emissiveIntensity: 0.4,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f172a : 0xcbd5e1,
      roughness: 0.8,
    });

    // Panel geometry specifications
    const panelWidth = 7.5;
    const panelHeight = 11;
    const panelThickness = 0.35;
    const frameThickness = 0.25;

    interface SolarPanelData {
      group: THREE.Group;
      baseX: number;
      baseY: number;
      baseZ: number;
      baseRotX: number;
      baseRotY: number;
      baseRotZ: number;
      floatPhase: number;
      floatSpeed: number;
      depthFactor: number;
    }

    const panelList: SolarPanelData[] = [];
    const panelCount = isSoftwareGl ? 6 : 14;

    for (let i = 0; i < panelCount; i++) {
      const panelGroup = new THREE.Group();

      // Outer Aluminum Frame
      const frameGeo = new THREE.BoxGeometry(panelWidth, panelHeight, panelThickness);
      const frameMesh = new THREE.Mesh(frameGeo, frameMaterial);
      panelGroup.add(frameMesh);

      // Front Solar Glass & Wafers
      const cellGeo = new THREE.PlaneGeometry(panelWidth - frameThickness * 2, panelHeight - frameThickness * 2);
      const cellMesh = new THREE.Mesh(cellGeo, cellMaterial);
      cellMesh.position.z = panelThickness / 2 + 0.02;
      panelGroup.add(cellMesh);

      // Backplate
      const backGeo = new THREE.PlaneGeometry(panelWidth - frameThickness * 2, panelHeight - frameThickness * 2);
      const backMesh = new THREE.Mesh(backGeo, backMaterial);
      backMesh.position.z = -panelThickness / 2 - 0.02;
      backMesh.rotation.y = Math.PI;
      panelGroup.add(backMesh);

      // Aluminum mounting rails on back
      const railGeo = new THREE.BoxGeometry(0.3, panelHeight, 0.4);
      const rail1 = new THREE.Mesh(railGeo, frameMaterial);
      rail1.position.set(-1.8, 0, -panelThickness / 2 - 0.2);
      const rail2 = new THREE.Mesh(railGeo, frameMaterial);
      rail2.position.set(1.8, 0, -panelThickness / 2 - 0.2);
      panelGroup.add(rail1);
      panelGroup.add(rail2);

      // Position panels dispersed gracefully around the 3D depth space
      const angle = (i / panelCount) * Math.PI * 2;
      const radiusX = 22 + (i % 3) * 10;
      const radiusY = 14 + (i % 2) * 8;
      const zDepth = -10 - (i % 4) * 8; // from -10 to -34

      const baseX = Math.cos(angle) * radiusX + (Math.random() - 0.5) * 6;
      const baseY = Math.sin(angle) * radiusY + (Math.random() - 0.5) * 5;
      const baseZ = zDepth;

      // Realistic photovoltaic tilt angle towards top-left / center sun
      const baseRotX = -0.35 + (Math.random() - 0.5) * 0.2;
      const baseRotY = (baseX > 0 ? -0.3 : 0.3) + (Math.random() - 0.5) * 0.2;
      const baseRotZ = (Math.random() - 0.5) * 0.15;

      panelGroup.position.set(baseX, baseY, baseZ);
      panelGroup.rotation.set(baseRotX, baseRotY, baseRotZ);

      // Slight scale variation
      const scale = 0.85 + (Math.random() * 0.3);
      panelGroup.scale.set(scale, scale, scale);

      solarPanelsGroup.add(panelGroup);

      panelList.push({
        group: panelGroup,
        baseX,
        baseY,
        baseZ,
        baseRotX,
        baseRotY,
        baseRotZ,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.6 + Math.random() * 0.6,
        depthFactor: (45 + baseZ) / 45, // parallax weight
      });
    }

    // 5. Constellation Ambient Particles
    const particleCount = isSoftwareGl ? 180 : (style === 'grid' ? 500 : 700);
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const primaryColor = isDark ? new THREE.Color(0x06b6d4) : new THREE.Color(0x0284c7);
    const secondaryColor = isDark ? new THREE.Color(0xf59e0b) : new THREE.Color(0x38bdf8);
    const tertiaryColor = isDark ? new THREE.Color(0x10b981) : new THREE.Color(0x0d9488);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 110;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 45;

      velocities[i3] = (Math.random() - 0.5) * 0.03;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.03;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.015;

      const rand = Math.random();
      const col = rand > 0.7 ? secondaryColor : rand > 0.4 ? tertiaryColor : primaryColor;
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pCtx = particleCanvas.getContext('2d');
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
      gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: isDark ? 1.5 : 1.2,
      map: particleTexture,
      transparent: true,
      opacity: isDark ? 0.6 : 0.4,
      vertexColors: true,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particlesMaterial);
    scene.add(particles);

    // 6. Network Line Connections
    let lineMesh: THREE.LineSegments | null = null;
    let linePositions: Float32Array | null = null;
    let lineColors: Float32Array | null = null;
    const maxLineConnections = isSoftwareGl ? 150 : 350;

    if (style === 'grid' || style === 'particles') {
      const lineGeometry = new THREE.BufferGeometry();
      linePositions = new Float32Array(maxLineConnections * 6);
      lineColors = new Float32Array(maxLineConnections * 6);

      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isDark ? 0.18 : 0.12,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });

      lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineMesh);
    }

    // 7. INPUT LISTENERS: Laptop Mouse Movement & Phone Gyro Movement

    // A. Laptop / Desktop Mouse Cursor Movement
    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      // Normalized between -1 and 1
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      motionRef.current.targetX = nx;
      motionRef.current.targetY = ny;
      motionRef.current.isGyro = false;
      setMotionSource('mouse');
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // B. Mobile Phone Gyroscope (DeviceOrientation) Movement
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!interactive) return;
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right tilt in [-90, 90]
        // beta: front-to-back tilt in [-180, 180]. Typical handheld posture is ~45°
        const gammaNorm = Math.max(-1.5, Math.min(1.5, e.gamma / 30));
        const betaNorm = Math.max(-1.5, Math.min(1.5, (e.beta - 45) / 35));

        motionRef.current.targetX = gammaNorm;
        motionRef.current.targetY = betaNorm;
        motionRef.current.isGyro = true;
        setMotionSource('gyro');
      }
    };

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    // C. Window Resize
    const handleResize = () => {
      if (!container) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation & Parallax Physics Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let hudThrottle = 0;

    const renderLoop = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for motion
      const lerpSpeed = motionRef.current.isGyro ? 0.08 : 0.05;
      motionRef.current.x += (motionRef.current.targetX - motionRef.current.x) * lerpSpeed;
      motionRef.current.y += (motionRef.current.targetY - motionRef.current.y) * lerpSpeed;

      const currentX = motionRef.current.x;
      const currentY = motionRef.current.y;

      // Update HUD display occasionally
      hudThrottle++;
      if (hudThrottle % 15 === 0) {
        setTiltDisplay({
          x: Math.round(currentX * 100) / 100,
          y: Math.round(currentY * 100) / 100,
        });
      }

      // Parallax 1: Three.js Camera Translation and Tilt
      camera.position.x = currentX * 7;
      camera.position.y = -currentY * 5;
      camera.lookAt(0, 0, 0);

      // Parallax 2: Solar Panels Array Collective Dynamic Rotation (Tracking Sun / Mouse / Gyro)
      solarPanelsGroup.rotation.y = currentX * 0.28;
      solarPanelsGroup.rotation.x = -currentY * 0.22;

      // Parallax 3: Individual Floating Solar Panels Wave & Solar Glint
      for (let i = 0; i < panelList.length; i++) {
        const p = panelList[i];
        // Floating wave oscillation
        const wave = Math.sin(elapsedTime * p.floatSpeed + p.floatPhase);
        const cosWave = Math.cos(elapsedTime * p.floatSpeed * 0.8 + p.floatPhase);

        p.group.position.y = p.baseY + wave * 0.75 - currentY * 2.5 * p.depthFactor;
        p.group.position.x = p.baseX + currentX * 3.5 * p.depthFactor;
        p.group.position.z = p.baseZ + cosWave * 0.4;

        // Reactive tilt on individual panels
        p.group.rotation.x = p.baseRotX + wave * 0.05 - currentY * 0.15;
        p.group.rotation.y = p.baseRotY + cosWave * 0.05 + currentX * 0.18;
      }

      // Parallax 4: Particle Drift & Line Network
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        // Wrap boundaries
        if (posArray[i3] > 60) posArray[i3] = -60;
        else if (posArray[i3] < -60) posArray[i3] = 60;

        if (posArray[i3 + 1] > 45) posArray[i3 + 1] = -45;
        else if (posArray[i3 + 1] < -45) posArray[i3 + 1] = 45;

        if (posArray[i3 + 2] > 25) posArray[i3 + 2] = -25;
        else if (posArray[i3 + 2] < -25) posArray[i3 + 2] = 25;
      }
      posAttr.needsUpdate = true;

      // Update line connections
      if (lineMesh && linePositions && lineColors) {
        let lineIndex = 0;
        const lineAttr = lineMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        const colAttr = lineMesh.geometry.getAttribute('color') as THREE.BufferAttribute;
        const linePosArray = lineAttr.array as Float32Array;
        const lineColArray = colAttr.array as Float32Array;

        const maxDist = isSoftwareGl ? 8 : 11;
        const step = isSoftwareGl ? 4 : 2;

        for (let i = 0; i < particleCount && lineIndex < maxLineConnections; i += step) {
          const i3 = i * 3;
          for (let j = i + 1; j < particleCount && lineIndex < maxLineConnections; j += step) {
            const j3 = j * 3;
            const dx = posArray[i3] - posArray[j3];
            const dy = posArray[i3 + 1] - posArray[j3 + 1];
            const dz = posArray[i3 + 2] - posArray[j3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < maxDist * maxDist) {
              const l6 = lineIndex * 6;
              linePosArray[l6] = posArray[i3];
              linePosArray[l6 + 1] = posArray[i3 + 1];
              linePosArray[l6 + 2] = posArray[i3 + 2];
              linePosArray[l6 + 3] = posArray[j3];
              linePosArray[l6 + 4] = posArray[j3 + 1];
              linePosArray[l6 + 5] = posArray[j3 + 2];

              const alpha = 1.0 - Math.sqrt(distSq) / maxDist;
              const r = (colors[i3] + colors[j3]) * 0.5 * alpha;
              const g = (colors[i3 + 1] + colors[j3 + 1]) * 0.5 * alpha;
              const b = (colors[i3 + 2] + colors[j3 + 2]) * 0.5 * alpha;

              lineColArray[l6] = r;
              lineColArray[l6 + 1] = g;
              lineColArray[l6 + 2] = b;
              lineColArray[l6 + 3] = r;
              lineColArray[l6 + 4] = g;
              lineColArray[l6 + 5] = b;

              lineIndex++;
            }
          }
        }
        lineMesh.geometry.setDrawRange(0, lineIndex * 2);
        lineAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameId = scheduleNextFrame(renderer, renderLoop);
    };

    animationFrameId = scheduleNextFrame(renderer, renderLoop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
      }

      // Clean up Three.js resources
      geometry.dispose();
      particlesMaterial.dispose();
      particleTexture.dispose();
      solarTexture.dispose();
      frameMaterial.dispose();
      cellMaterial.dispose();
      backMaterial.dispose();

      if (lineMesh) {
        lineMesh.geometry.dispose();
        (lineMesh.material as THREE.Material).dispose();
      }

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [style, theme, interactive]);

  return (
    <>
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={mountRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-opacity duration-700"
        data-testid="live-background-canvas"
      />

      {/* Discreet Interactive Motion Status Indicator & Mobile Gyro Trigger */}
      <div className="fixed bottom-4 left-4 z-30 pointer-events-auto">
        <div className="flex items-center gap-2">
          {/* Motion Badge Button */}
          <button
            onClick={() => setShowHud(!showHud)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs backdrop-blur-md shadow-lg transition-all"
            title="3D Motion Sensor Status"
          >
            {motionSource === 'gyro' ? (
              <Smartphone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            ) : (
              <MousePointer className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span className="text-[11px] font-mono font-medium">
              3D Solar Motion: {motionSource === 'gyro' ? 'Phone Tilt' : 'Cursor Parallax'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </button>

          {/* Quick iOS Motion Permission trigger if needed */}
          {gyroPermitted === null && typeof window !== 'undefined' && 'DeviceOrientationEvent' in window && (
            <button
              onClick={requestGyroPermission}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[11px] font-medium backdrop-blur-md transition-colors"
            >
              <Compass className="w-3 h-3" />
              <span>Enable Gyro</span>
            </button>
          )}
        </div>

        {/* Detailed Motion HUD Popup */}
        {showHud && (
          <div className="mt-2 p-3.5 rounded-2xl bg-slate-900/95 border border-slate-800 backdrop-blur-md text-xs text-slate-300 shadow-2xl max-w-xs space-y-2.5 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-100 flex items-center gap-1.5 font-heading">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                3D Solar Background
              </span>
              <button
                onClick={() => setShowHud(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Floating 3D monocrystalline solar panels dynamically track your device motion. Move your mouse cursor or tilt your mobile phone to experience full 360° solar array parallax!
            </p>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-950 p-2 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block">X-TILT:</span>
                <span className="text-cyan-400 font-bold">{tiltDisplay.x}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Y-TILT:</span>
                <span className="text-amber-400 font-bold">{tiltDisplay.y}</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 italic">
              Active mode: {motionSource === 'gyro' ? 'Phone Gyroscope Sensor' : 'Laptop Cursor Hover'}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
