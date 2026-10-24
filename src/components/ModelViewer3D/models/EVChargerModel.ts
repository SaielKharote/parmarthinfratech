import * as THREE from 'three';
import { HotspotInfo } from '../../../types';
import { Procedural3DModelResult } from './SolarTrackerModel';

export function createEVChargerModel(): Procedural3DModelResult {
  const root = new THREE.Group();
  root.name = 'EVChargerModel';

  const materials: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];

  // 1. Foundation Base Pad
  const baseGeo = new THREE.BoxGeometry(4.0, 0.4, 3.2);
  geometries.push(baseGeo);
  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.9,
    metalness: 0.1,
  });
  materials.push(concreteMat);
  const baseMesh = new THREE.Mesh(baseGeo, concreteMat);
  baseMesh.position.y = 0.2;
  root.add(baseMesh);

  // 2. Main Aerodynamic Charger Body Pillar (Dual Tone: Anthracite and Bright Cyan)
  const bodyGeo = new THREE.BoxGeometry(2.4, 6.2, 1.8);
  geometries.push(bodyGeo);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f172a, // Deep slate obsidian
    roughness: 0.25,
    metalness: 0.6,
    clearcoat: 0.6,
  });
  materials.push(bodyMat);
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.position.y = 3.5;
  bodyMesh.castShadow = true;
  root.add(bodyMesh);

  // Front Fascia Plate (Bright architectural finish)
  const faceGeo = new THREE.BoxGeometry(2.1, 5.8, 0.15);
  geometries.push(faceGeo);
  const faceMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.3,
    metalness: 0.5,
  });
  materials.push(faceMat);
  const faceMesh = new THREE.Mesh(faceGeo, faceMat);
  faceMesh.position.set(0, 3.5, 0.95);
  root.add(faceMesh);

  // 3. High-Tech Touch Interface Screen
  const screenGeo = new THREE.PlaneGeometry(1.6, 2.2);
  geometries.push(screenGeo);

  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 384;
  screenCanvas.height = 512;
  const ctx = screenCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, 384, 512);

    // Header
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('PIPL EV SUPERFAST', 30, 48);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px monospace';
    ctx.fillText('DC FAST DISPENSER 150kW', 30, 78);

    // Circular Battery Progress
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(192, 230, 90, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(192, 230, 90, -Math.PI / 2, Math.PI * 0.7);
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 64px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('78%', 192, 240);
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#10b981';
    ctx.fillText('CHARGING ACTIVE', 192, 280);

    // Metrics
    ctx.textAlign = 'left';
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '20px monospace';
    ctx.fillText('DELIVERED: 42.4 kWh', 35, 380);
    ctx.fillText('RATE: 142 kW (800V)', 35, 415);
    ctx.fillText('TIME LEFT: 11 MIN', 35, 450);
  }
  const screenTex = new THREE.CanvasTexture(screenCanvas);
  screenTex.colorSpace = THREE.SRGBColorSpace;
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
  materials.push(screenMat);

  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.set(0, 4.0, 1.05);
  root.add(screenMesh);

  // Top Halo LED Status Ring
  const haloGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.18, 32);
  geometries.push(haloGeo);
  const haloMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4, // Cyan beacon
    emissive: 0x06b6d4,
    emissiveIntensity: 0.8,
    roughness: 0.2,
  });
  materials.push(haloMat);
  const haloMesh = new THREE.Mesh(haloGeo, haloMat);
  haloMesh.position.set(0, 6.7, 0);
  root.add(haloMesh);

  // 4. Dual Charging Cables & Heavy-Duty CCS2 Guns
  const gunGeo = new THREE.CylinderGeometry(0.18, 0.22, 1.1, 16);
  geometries.push(gunGeo);
  const gunMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.7 });
  materials.push(gunMat);

  const cableMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.6 });
  materials.push(cableMat);

  // Left Gun & Cable Holster
  const leftHolster = new THREE.Group();
  leftHolster.position.set(-1.5, 3.2, 0.4);
  const leftGun = new THREE.Mesh(gunGeo, gunMat);
  leftGun.rotation.z = 0.4;
  leftHolster.add(leftGun);
  root.add(leftHolster);

  // Right Gun & Cable Holster
  const rightHolster = new THREE.Group();
  rightHolster.position.set(1.5, 3.2, 0.4);
  const rightGun = new THREE.Mesh(gunGeo, gunMat);
  rightGun.rotation.z = -0.4;
  rightHolster.add(rightGun);
  root.add(rightHolster);

  // 5. Internal SiC Power Electronics Modules (visible when exploded)
  const moduleGeo = new THREE.BoxGeometry(1.8, 1.2, 1.2);
  geometries.push(moduleGeo);
  const moduleMat = new THREE.MeshStandardMaterial({
    color: 0x047857, // High-voltage emerald
    roughness: 0.35,
    metalness: 0.6,
  });
  materials.push(moduleMat);

  const powerModule1 = new THREE.Mesh(moduleGeo, moduleMat);
  powerModule1.position.set(0, 2.2, 0);
  root.add(powerModule1);

  const powerModule2 = new THREE.Mesh(moduleGeo, moduleMat);
  powerModule2.position.set(0, 4.2, 0);
  root.add(powerModule2);

  const hotspots: HotspotInfo[] = [
    {
      id: 'dispenser-screen',
      title: 'Dynamic High-Resolution HMI & Payment Terminal',
      category: 'E-Mobility Interface',
      description: 'Sunlight-readable optical bonded display supporting RFID authorization, QR payments, and OCPP 2.0.1 cloud telemetry protocol.',
      techSpecs: [
        { label: 'Protocols', value: 'OCPP 1.6J / 2.0.1 Ready' },
        { label: 'Authentication', value: 'RFID, QR, Mobile App, AutoCharge (ISO 15118)' },
        { label: 'Display Protection', value: 'IK10 Vandal-Proof Tempered Glass' },
        { label: 'Application', value: 'Housing Societies, C&I, Highways' },
      ],
      position: [0, 4.0, 1.2],
    },
    {
      id: 'power-converter',
      title: 'Silicon Carbide (SiC) Liquid-Cooled Power Stack',
      category: 'Power Electronics',
      description: 'Ultra-compact SiC MOSFET inverter modules delivering >96% peak efficiency and wide voltage range (150V - 1000V) for modern 800V EV architectures.',
      techSpecs: [
        { label: 'Output Power', value: '150 kW Continuous (Boost 180 kW)' },
        { label: 'Efficiency', value: '> 96.5% at rated power' },
        { label: 'Cooling', value: 'Closed-loop Glycol Liquid Cooling' },
      ],
      position: [0, 2.2, 0.8],
    },
    {
      id: 'ccs2-guns',
      title: 'Dual Liquid-Cooled CCS2 Charging Guns',
      category: 'Dispensing & Safety',
      description: 'Ergonomic dual gun system capable of charging two EVs simultaneously with dynamic dynamic load balancing and active temperature monitoring in the pins.',
      techSpecs: [
        { label: 'Connectors', value: 'Dual CCS Type 2 / Optional CHAdeMO' },
        { label: 'Continuous Current', value: '300A Liquid Cooled' },
        { label: 'Cable Length', value: '5.5 meters balanced suspension' },
      ],
      position: [1.6, 3.2, 0.8],
    },
  ];

  return {
    group: root,
    update: (time: number, explodedFactor: number, wireframe: boolean) => {
      // Glow pulse on halo
      haloMesh.position.y = 6.7 + Math.sin(time * 2) * 0.05;

      // Exploded views
      faceMesh.position.z = 0.95 + explodedFactor * 2.8;
      screenMesh.position.z = 1.05 + explodedFactor * 2.8;

      leftHolster.position.x = -1.5 - explodedFactor * 1.6;
      rightHolster.position.x = 1.5 + explodedFactor * 1.6;

      powerModule1.position.z = explodedFactor * -1.8;
      powerModule2.position.z = explodedFactor * -1.8;

      materials.forEach((m) => {
        if ('wireframe' in m) {
          (m as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      });
    },
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      screenTex.dispose();
    },
    hotspots,
  };
}
