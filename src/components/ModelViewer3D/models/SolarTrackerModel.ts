import * as THREE from 'three';
import { HotspotInfo } from '../../../types';

export interface Procedural3DModelResult {
  group: THREE.Group;
  update: (time: number, explodedFactor: number, wireframe: boolean) => void;
  dispose: () => void;
  hotspots: HotspotInfo[];
}

export function createSolarTrackerModel(): Procedural3DModelResult {
  const root = new THREE.Group();
  root.name = 'SolarTrackerModel';

  const materials: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];

  // 1. Concrete Foundation Base
  const baseGeo = new THREE.CylinderGeometry(2.4, 2.7, 0.8, 16);
  geometries.push(baseGeo);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    roughness: 0.85,
    metalness: 0.1,
  });
  materials.push(baseMat);
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.y = 0.4;
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  root.add(baseMesh);

  // 2. Heavy-Duty Steel Pedestal Column
  const columnGeo = new THREE.CylinderGeometry(0.55, 0.65, 4.2, 24);
  geometries.push(columnGeo);
  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.35,
    metalness: 0.85,
  });
  materials.push(steelMat);
  const columnMesh = new THREE.Mesh(columnGeo, steelMat);
  columnMesh.position.y = 2.9;
  columnMesh.castShadow = true;
  root.add(columnMesh);

  // 3. Dual-Axis Slewing Drive / Motor Gearbox
  const gearboxGeo = new THREE.BoxGeometry(1.6, 1.4, 1.6);
  geometries.push(gearboxGeo);
  const gearboxMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // PIPL Tech Blue
    roughness: 0.3,
    metalness: 0.7,
  });
  materials.push(gearboxMat);
  const gearboxMesh = new THREE.Mesh(gearboxGeo, gearboxMat);
  gearboxMesh.position.y = 5.2;
  gearboxMesh.castShadow = true;
  root.add(gearboxMesh);

  // Hydraulic Tilt Actuator Arm
  const pistonGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.2, 16);
  geometries.push(pistonGeo);
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.1,
    metalness: 0.95,
  });
  materials.push(chromeMat);
  const pistonMesh = new THREE.Mesh(pistonGeo, chromeMat);
  pistonMesh.position.set(0.6, 4.8, 0.5);
  pistonMesh.rotation.z = 0.35;
  root.add(pistonMesh);

  // 4. Rotating Tracker Table / Gimbal Group (tilts and rotates)
  const trackerTable = new THREE.Group();
  trackerTable.position.set(0, 5.8, 0);

  // Main Torque Tube
  const torqueGeo = new THREE.CylinderGeometry(0.28, 0.28, 12.0, 16);
  torqueGeo.rotateZ(Math.PI / 2);
  geometries.push(torqueGeo);
  const torqueMesh = new THREE.Mesh(torqueGeo, steelMat);
  trackerTable.add(torqueMesh);

  // Sub-rack Purlins (transverse beams)
  const purlinGeo = new THREE.BoxGeometry(0.12, 0.2, 7.2);
  geometries.push(purlinGeo);
  const purlinMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.45,
    metalness: 0.75,
  });
  materials.push(purlinMat);

  const purlinPositions = [-4.5, -2.25, 0, 2.25, 4.5];
  purlinPositions.forEach((posX) => {
    const purlin = new THREE.Mesh(purlinGeo, purlinMat);
    purlin.position.set(posX, 0.2, 0);
    trackerTable.add(purlin);
  });

  // 5. High-Efficiency Bifacial Solar PV Modules (Grid of 10 panels)
  const panelGeo = new THREE.BoxGeometry(2.0, 0.08, 3.2);
  geometries.push(panelGeo);

  // Photovoltaic cell procedural texture
  const cellCanvas = document.createElement('canvas');
  cellCanvas.width = 256;
  cellCanvas.height = 256;
  const ctx = cellCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 256, 256);
    // Grid lines for multi-busbar solar cell
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    for (let i = 0; i < 256; i += 24) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 256);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(256, i);
      ctx.stroke();
    }
    // Silver busbars
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 3;
    [64, 128, 192].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    });
  }
  const cellTex = new THREE.CanvasTexture(cellCanvas);
  cellTex.colorSpace = THREE.SRGBColorSpace;
  cellTex.wrapS = THREE.RepeatWrapping;
  cellTex.wrapT = THREE.RepeatWrapping;
  cellTex.repeat.set(2, 2);

  const pvMat = new THREE.MeshPhysicalMaterial({
    color: 0x0c2540,
    roughness: 0.15,
    metalness: 0.4,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    map: cellTex,
  });
  materials.push(pvMat);

  // Exploded panels container
  const panelMeshes: { mesh: THREE.Mesh; origPos: THREE.Vector3; explodeDir: THREE.Vector3 }[] = [];

  const panelCols = [-4.4, -2.2, 0, 2.2, 4.4];
  const panelRows = [-1.75, 1.75];

  panelCols.forEach((cx, colIdx) => {
    panelRows.forEach((cz, rowIdx) => {
      const panel = new THREE.Mesh(panelGeo, pvMat);
      const px = cx;
      const py = 0.4;
      const pz = cz;
      panel.position.set(px, py, pz);
      panel.castShadow = true;
      trackerTable.add(panel);

      panelMeshes.push({
        mesh: panel,
        origPos: new THREE.Vector3(px, py, pz),
        explodeDir: new THREE.Vector3(cx * 0.4, 1.8 + (colIdx % 2) * 0.4, cz * 0.6),
      });
    });
  });

  // Weather sensor / Pyranometer on edge
  const sensorGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.4, 12);
  geometries.push(sensorGeo);
  const sensorMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.2, metalness: 0.8 });
  materials.push(sensorMat);
  const sensorMesh = new THREE.Mesh(sensorGeo, sensorMat);
  sensorMesh.position.set(5.7, 0.4, 0);
  trackerTable.add(sensorMesh);

  root.add(trackerTable);

  const hotspots: HotspotInfo[] = [
    {
      id: 'pv-modules',
      title: 'Bifacial Glass-Glass 580W+ PV Modules',
      category: 'Renewable Power Generation',
      description: 'High-efficiency Tier-1 N-Type TOPCon cells with dual-glass encapsulation providing up to 25% bifacial gain from albedo reflection.',
      techSpecs: [
        { label: 'Module Efficiency', value: '22.8%' },
        { label: 'Bifaciality Factor', value: '80% ± 5%' },
        { label: 'Degradation', value: '< 0.4% / year' },
        { label: 'PIPL Standard', value: 'MNRE Approved ALMM list' },
      ],
      position: [0, 6.4, 1.8],
    },
    {
      id: 'slewing-drive',
      title: 'Astronomical Dual-Axis Slewing Drive',
      category: 'Mechanical Actuation & Tracking',
      description: 'Heavy-duty enclosed IP66 worm gear drive with high holding torque capable of resisting Category-4 cyclonic wind loads.',
      techSpecs: [
        { label: 'Tracking Accuracy', value: '< ± 0.5°' },
        { label: 'Angular Range', value: '-60° to +60°' },
        { label: 'Holding Torque', value: '38 kNm' },
        { label: 'Energy Boost', value: '+28% to +35% vs fixed tilt' },
      ],
      position: [0, 5.2, 0.8],
    },
    {
      id: 'torque-tube',
      title: 'Galvanized Octagonal Torque Tube',
      category: 'Structural Engineering',
      description: 'Hot-dip galvanized high-tensile steel tube engineered with finite element analysis for torsional stiffness and zero flutter.',
      techSpecs: [
        { label: 'Steel Grade', value: 'S355 JR / ST-52' },
        { label: 'Corrosion Protection', value: '85 µm Hot-dip Galvanized' },
        { label: 'Foundation Standard', value: 'IS 456 / IS 875 Wind Code' },
      ],
      position: [3.2, 5.8, 0],
    },
  ];

  return {
    group: root,
    update: (time: number, explodedFactor: number, wireframe: boolean) => {
      // Gentle sun tracking tilt animation
      const tilt = Math.sin(time * 0.4) * 0.28 + 0.15;
      const pan = Math.cos(time * 0.25) * 0.35;
      trackerTable.rotation.x = tilt;
      trackerTable.rotation.y = pan;

      // Update exploded state smoothly
      panelMeshes.forEach((item) => {
        item.mesh.position.x = item.origPos.x + item.explodeDir.x * explodedFactor;
        item.mesh.position.y = item.origPos.y + item.explodeDir.y * explodedFactor;
        item.mesh.position.z = item.origPos.z + item.explodeDir.z * explodedFactor;
      });

      // Toggle wireframe on materials
      materials.forEach((mat) => {
        if ('wireframe' in mat) {
          (mat as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      });
    },
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      cellTex.dispose();
    },
    hotspots,
  };
}
