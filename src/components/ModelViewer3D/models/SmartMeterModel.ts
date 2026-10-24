import * as THREE from 'three';
import { HotspotInfo } from '../../../types';
import { Procedural3DModelResult } from './SolarTrackerModel';

export function createSmartMeterModel(): Procedural3DModelResult {
  const root = new THREE.Group();
  root.name = 'SmartMeterModel';

  const materials: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];

  // 1. Back Mounting Chassis (Flame-retardant Polycarbonate)
  const chassisGeo = new THREE.BoxGeometry(4.8, 6.8, 1.2);
  geometries.push(chassisGeo);
  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.7,
    metalness: 0.2,
  });
  materials.push(chassisMat);
  const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
  chassisMesh.position.set(0, 4.0, -0.6);
  chassisMesh.castShadow = true;
  root.add(chassisMesh);

  // 2. Terminal Block Base (High-amperage brass connectors)
  const terminalBlockGeo = new THREE.BoxGeometry(4.4, 2.0, 1.8);
  geometries.push(terminalBlockGeo);
  const terminalMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.6,
    metalness: 0.4,
  });
  materials.push(terminalMat);
  const terminalMesh = new THREE.Mesh(terminalBlockGeo, terminalMat);
  terminalMesh.position.set(0, 1.3, 0);
  root.add(terminalMesh);

  // Brass terminal lugs
  const lugGeo = new THREE.CylinderGeometry(0.22, 0.22, 1.2, 16);
  geometries.push(lugGeo);
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    roughness: 0.25,
    metalness: 0.9,
  });
  materials.push(brassMat);

  [-1.6, -0.8, 0, 0.8, 1.6].forEach((x) => {
    const lug = new THREE.Mesh(lugGeo, brassMat);
    lug.position.set(x, 0.5, 0.2);
    terminalMesh.add(lug);
  });

  // 3. Main Meter Enclosure Front Shell
  const shellGeo = new THREE.BoxGeometry(4.6, 5.0, 1.6);
  geometries.push(shellGeo);
  const shellMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.35,
    metalness: 0.15,
  });
  materials.push(shellMat);
  const shellMesh = new THREE.Mesh(shellGeo, shellMat);
  shellMesh.position.set(0, 4.8, 0.4);
  shellMesh.castShadow = true;
  root.add(shellMesh);

  // 4. Procedural LCD Display Screen
  const lcdGeo = new THREE.PlaneGeometry(2.8, 1.5);
  geometries.push(lcdGeo);

  const lcdCanvas = document.createElement('canvas');
  lcdCanvas.width = 512;
  lcdCanvas.height = 256;
  const ctx = lcdCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#064e3b'; // High-contrast green backlit LCD
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 36px monospace';
    ctx.fillText('PIPL AMI SMART METER', 24, 50);
    ctx.font = 'bold 64px monospace';
    ctx.fillText('048291.6 kWh', 24, 130);
    ctx.font = '28px monospace';
    ctx.fillText('V: 238.4V | A: 14.8A | PF: 0.98', 24, 185);
    ctx.fillText('STATUS: SECURE RF MESH ACTIVE', 24, 230);
  }
  const lcdTex = new THREE.CanvasTexture(lcdCanvas);
  lcdTex.colorSpace = THREE.SRGBColorSpace;

  const lcdMat = new THREE.MeshBasicMaterial({
    map: lcdTex,
  });
  materials.push(lcdMat);
  const lcdMesh = new THREE.Mesh(lcdGeo, lcdMat);
  lcdMesh.position.set(0, 5.2, 1.22);
  root.add(lcdMesh);

  // 5. Optical Communication Port (for DLMS/COSEM probe readings)
  const opticalGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.25, 24);
  opticalGeo.rotateX(Math.PI / 2);
  geometries.push(opticalGeo);
  const opticalMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.2,
    metalness: 0.8,
  });
  materials.push(opticalMat);
  const opticalMesh = new THREE.Mesh(opticalGeo, opticalMat);
  opticalMesh.position.set(1.4, 3.4, 1.22);
  root.add(opticalMesh);

  // Push button toggle
  const btnGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 16);
  btnGeo.rotateX(Math.PI / 2);
  geometries.push(btnGeo);
  const btnMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 });
  materials.push(btnMat);
  const btnMesh = new THREE.Mesh(btnGeo, btnMat);
  btnMesh.position.set(-1.4, 3.4, 1.22);
  root.add(btnMesh);

  // 6. External Cellular / RF Mesh Antenna
  const antennaGeo = new THREE.CylinderGeometry(0.12, 0.15, 2.8, 16);
  geometries.push(antennaGeo);
  const antennaMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.6 });
  materials.push(antennaMat);
  const antennaMesh = new THREE.Mesh(antennaGeo, antennaMat);
  antennaMesh.position.set(2.4, 7.5, -0.4);
  root.add(antennaMesh);

  // Internal PCB Board (visible in exploded view!)
  const pcbGeo = new THREE.BoxGeometry(4.0, 4.4, 0.15);
  geometries.push(pcbGeo);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x065f46, // PCB green
    roughness: 0.4,
    metalness: 0.6,
  });
  materials.push(pcbMat);
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
  pcbMesh.position.set(0, 4.8, 0.0);
  root.add(pcbMesh);

  // Microcontroller chip
  const mcuGeo = new THREE.BoxGeometry(1.2, 1.2, 0.2);
  geometries.push(mcuGeo);
  const mcuMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3, metalness: 0.7 });
  materials.push(mcuMat);
  const mcuMesh = new THREE.Mesh(mcuGeo, mcuMat);
  mcuMesh.position.set(-0.5, 5.0, 0.15);
  root.add(mcuMesh);

  const hotspots: HotspotInfo[] = [
    {
      id: 'ami-lcd',
      title: 'Backlit DLMS/COSEM Smart Display',
      category: 'Smart Metering & AMI',
      description: 'Multi-parameter anti-tamper display tracking real-time voltage, instantaneous load, reactive energy, and load profile with 60-day non-volatile memory.',
      techSpecs: [
        { label: 'Accuracy Class', value: 'Class 1.0 / 0.5S' },
        { label: 'Standards', value: 'IS 16444 / IS 15959 DLMS' },
        { label: 'Tamper Protection', value: 'Magnetic & Neutral Disturbance Immune' },
        { label: 'Deployment', value: 'Adani Energy Solutions AMI rollout' },
      ],
      position: [0, 5.2, 1.5],
    },
    {
      id: 'rf-telemetry',
      title: 'Dual RF Mesh & NB-IoT Telemetry Module',
      category: 'Digital Grid Communication',
      description: 'Bi-directional secure wireless transceiver connecting meters into Head-End Systems (HES) and Meter Data Management (MDM) platforms.',
      techSpecs: [
        { label: 'Frequencies', value: '865-867 MHz RF Mesh & Cellular NB-IoT' },
        { label: 'Encryption', value: 'AES-128 / AES-256 GCM' },
        { label: 'Over-The-Air', value: 'Firmware Upgradable (FOTA)' },
      ],
      position: [2.4, 8.0, 0],
    },
    {
      id: 'latching-relay',
      title: 'Bi-Stable Solid State Disconnect Relay',
      category: 'Remote Operations',
      description: 'Integrated motor-driven latching relay allowing utilities to remotely connect/disconnect power and enforce prepayment credit limits.',
      techSpecs: [
        { label: 'Breaking Capacity', value: '100A @ 250V AC' },
        { label: 'Endurance', value: '10,000 mechanical operations' },
        { label: 'Surge Immunity', value: 'Up to 10 kV impulse test' },
      ],
      position: [0, 1.4, 0.8],
    },
  ];

  return {
    group: root,
    update: (time: number, explodedFactor: number, wireframe: boolean) => {
      // Exploded positions
      shellMesh.position.z = 0.4 + explodedFactor * 3.5;
      lcdMesh.position.z = 1.22 + explodedFactor * 3.5;
      opticalMesh.position.z = 1.22 + explodedFactor * 3.5;
      btnMesh.position.z = 1.22 + explodedFactor * 3.5;

      pcbMesh.position.z = 0.0 + explodedFactor * 1.5;
      mcuMesh.position.z = 0.15 + explodedFactor * 1.5;

      terminalMesh.position.y = 1.3 - explodedFactor * 1.8;
      chassisMesh.position.z = -0.6 - explodedFactor * 1.2;

      materials.forEach((m) => {
        if ('wireframe' in m) {
          (m as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      });
    },
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      lcdTex.dispose();
    },
    hotspots,
  };
}
