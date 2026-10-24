import * as THREE from 'three';
import { HotspotInfo } from '../../../types';
import { Procedural3DModelResult } from './SolarTrackerModel';

export function createTransformerModel(): Procedural3DModelResult {
  const root = new THREE.Group();
  root.name = 'TransformerModel';

  const materials: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];

  // 1. Heavy Plinth Base / Foundation Pad
  const plinthGeo = new THREE.BoxGeometry(6.4, 0.6, 5.2);
  geometries.push(plinthGeo);
  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.9,
    metalness: 0.1,
  });
  materials.push(concreteMat);
  const plinthMesh = new THREE.Mesh(plinthGeo, concreteMat);
  plinthMesh.position.y = 0.3;
  plinthMesh.receiveShadow = true;
  root.add(plinthMesh);

  // 2. Transformer Main Steel Tank (Corrugated / Industrial Gray)
  const tankGeo = new THREE.BoxGeometry(4.2, 4.0, 3.2);
  geometries.push(tankGeo);
  const tankMat = new THREE.MeshStandardMaterial({
    color: 0x475569, // Substation gray
    roughness: 0.4,
    metalness: 0.7,
  });
  materials.push(tankMat);
  const tankMesh = new THREE.Mesh(tankGeo, tankMat);
  tankMesh.position.y = 2.6;
  tankMesh.castShadow = true;
  root.add(tankMesh);

  // 3. Radiator Cooling Fins (Flanking both sides)
  const finGeo = new THREE.BoxGeometry(0.1, 3.2, 2.6);
  geometries.push(finGeo);
  const finMat = new THREE.MeshStandardMaterial({
    color: 0x3b82f6, // PIPL Tech Indigo/Blue
    roughness: 0.35,
    metalness: 0.6,
  });
  materials.push(finMat);

  const leftFins: THREE.Mesh[] = [];
  const rightFins: THREE.Mesh[] = [];

  for (let i = 0; i < 6; i++) {
    const offset = (i - 2.5) * 0.35;
    // Left bank
    const lf = new THREE.Mesh(finGeo, finMat);
    lf.position.set(-2.5 - offset * 0.2, 2.6, offset);
    tankMesh.add(lf);
    leftFins.push(lf);

    // Right bank
    const rf = new THREE.Mesh(finGeo, finMat);
    rf.position.set(2.5 + offset * 0.2, 2.6, offset);
    tankMesh.add(rf);
    rightFins.push(rf);
  }

  // 4. Cylindrical Oil Conservator Tank (Mounted on top)
  const conservatorGeo = new THREE.CylinderGeometry(0.65, 0.65, 3.4, 24);
  conservatorGeo.rotateZ(Math.PI / 2);
  geometries.push(conservatorGeo);
  const conservatorMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.3,
    metalness: 0.8,
  });
  materials.push(conservatorMat);
  const conservatorMesh = new THREE.Mesh(conservatorGeo, conservatorMat);
  conservatorMesh.position.set(0, 5.6, -0.6);
  conservatorMesh.castShadow = true;
  root.add(conservatorMesh);

  // Buchholz Gas Protective Relay Pipe
  const pipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 16);
  geometries.push(pipeGeo);
  const pipeMesh = new THREE.Mesh(pipeGeo, tankMat);
  pipeMesh.position.set(0, 4.8, -0.6);
  root.add(pipeMesh);

  // 5. High-Voltage Ceramic Bushings (3 Phase: R, Y, B)
  const bushingBaseGeo = new THREE.CylinderGeometry(0.2, 0.3, 0.4, 16);
  geometries.push(bushingBaseGeo);
  const porcelainGeo = new THREE.CylinderGeometry(0.16, 0.22, 1.6, 16);
  geometries.push(porcelainGeo);
  const terminalCapGeo = new THREE.SphereGeometry(0.14, 16, 16);
  geometries.push(terminalCapGeo);

  const porcelainMat = new THREE.MeshPhysicalMaterial({
    color: 0x7c2d12, // Glazed brown ceramic
    roughness: 0.15,
    metalness: 0.1,
    clearcoat: 0.9,
  });
  materials.push(porcelainMat);

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    roughness: 0.2,
    metalness: 0.9,
  });
  materials.push(copperMat);

  const hvGroup = new THREE.Group();
  hvGroup.position.set(0, 4.6, 0.6);

  const bushingOffsets = [-1.2, 0, 1.2];
  bushingOffsets.forEach((x, idx) => {
    const singleBushing = new THREE.Group();
    singleBushing.position.set(x, 0, 0);

    const bBase = new THREE.Mesh(bushingBaseGeo, tankMat);
    singleBushing.add(bBase);

    const bPorc = new THREE.Mesh(porcelainGeo, porcelainMat);
    bPorc.position.y = 0.9;
    singleBushing.add(bPorc);

    const bCap = new THREE.Mesh(terminalCapGeo, copperMat);
    bCap.position.y = 1.75;
    singleBushing.add(bCap);

    // Subtle disc sheds on bushing
    for (let s = 0; s < 4; s++) {
      const shedGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.06, 16);
      geometries.push(shedGeo);
      const shed = new THREE.Mesh(shedGeo, porcelainMat);
      shed.position.y = 0.4 + s * 0.32;
      singleBushing.add(shed);
    }

    hvGroup.add(singleBushing);
  });
  root.add(hvGroup);

  // 6. Marshalling Box / Intelligent Electronic Device (IED) panel
  const iedGeo = new THREE.BoxGeometry(0.9, 1.4, 0.4);
  geometries.push(iedGeo);
  const iedMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, // Amber safety control box
    roughness: 0.35,
    metalness: 0.5,
  });
  materials.push(iedMat);
  const iedMesh = new THREE.Mesh(iedGeo, iedMat);
  iedMesh.position.set(1.4, 2.2, 1.8);
  root.add(iedMesh);

  // Copper Grounding Busbar
  const groundGeo = new THREE.BoxGeometry(5.0, 0.08, 0.08);
  geometries.push(groundGeo);
  const groundMesh = new THREE.Mesh(groundGeo, copperMat);
  groundMesh.position.set(0, 0.7, 1.7);
  root.add(groundMesh);

  const hotspots: HotspotInfo[] = [
    {
      id: 'transformer-bushings',
      title: '33kV/11kV Glazed Ceramic HV Bushings',
      category: 'Electrical EPC & Substation',
      description: 'Hermetically sealed creepage-optimized porcelain bushings compliant with IEC 60137 for high impulse withstand under monsoon pollution levels.',
      techSpecs: [
        { label: 'Voltage Rating', value: '33 kV / 11 kV Step-Up' },
        { label: 'BIL Impulse', value: '170 kV Peak' },
        { label: 'Creepage Distance', value: '31 mm/kV (Heavy Pollution Class)' },
        { label: 'Installation', value: 'Government Approved Electrical Standards' },
      ],
      position: [0, 6.2, 0.8],
    },
    {
      id: 'oil-conservator',
      title: 'Conservator & Buchholz Gas Protection',
      category: 'Asset Reliability & Safety',
      description: 'Double-float Buchholz relay installed on the pipe connecting the main tank to conservator for instantaneous fault detection and alarm tripping.',
      techSpecs: [
        { label: 'Fluid Type', value: 'Inhibited Mineral Oil / Synthetic Ester' },
        { label: 'Protection', value: 'Overpressure relief & gas accumulation trip' },
        { label: 'Breather', value: 'Silica gel dehydrating air breather' },
      ],
      position: [0, 5.8, -0.6],
    },
    {
      id: 'cooling-radiator',
      title: 'Forced Air Corrugated Radiator Banks',
      category: 'Thermal Engineering',
      description: 'ONAN/ONAF cooling radiator system providing continuous full-load heat dissipation without overheating even at 48°C ambient.',
      techSpecs: [
        { label: 'Cooling Class', value: 'ONAN / ONAF' },
        { label: 'Temperature Rise', value: '< 50°C Oil / 55°C Winding' },
        { label: 'Sound Level', value: '< 65 dB(A) acoustic damping' },
      ],
      position: [-2.8, 2.6, 0],
    },
  ];

  return {
    group: root,
    update: (time: number, explodedFactor: number, wireframe: boolean) => {
      // Exploded offsets
      conservatorMesh.position.y = 5.6 + explodedFactor * 2.2;
      pipeMesh.position.y = 4.8 + explodedFactor * 2.2;
      hvGroup.position.y = 4.6 + explodedFactor * 1.8;

      // Expand side radiators outwards
      leftFins.forEach((fin, idx) => {
        fin.position.x = -2.5 - explodedFactor * (1.2 + idx * 0.1);
      });
      rightFins.forEach((fin, idx) => {
        fin.position.x = 2.5 + explodedFactor * (1.2 + idx * 0.1);
      });

      iedMesh.position.z = 1.8 + explodedFactor * 1.5;

      materials.forEach((m) => {
        if ('wireframe' in m) {
          (m as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      });
    },
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    },
    hotspots,
  };
}
