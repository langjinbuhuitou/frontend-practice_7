const scene = new THREE.Scene();
// 深空黑背景，模拟宇宙
scene.background = new THREE.Color(0x05071A);
scene.fog = new THREE.Fog(0x05071A, 15, 40);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 6, 12);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

// 基础光源
scene.add(new THREE.AmbientLight(0xffffff, 0.2));

// 太阳：自发光球体
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 48, 48),
  new THREE.MeshStandardMaterial({ color: 0xffcc00, emissive: 0xff8800, emissiveIntensity: 1.2 })
);
scene.add(sun);

// 太阳方向光，模拟太阳系中心光源
const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// 行星组
const planets = new THREE.Group();

// 水星
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.15, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0x8c8c8c })
);
mercury.position.set(2.2, 0, 0);
planets.add(mercury);

// 金星
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(0.22, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0xffcc80 })
);
venus.position.set(3.2, 0, 0);
planets.add(venus);

// 地球
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.25, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x42a5f5 })
);
earth.position.set(4.3, 0, 0);
planets.add(earth);

// 火星
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0xef5350 })
);
mars.position.set(5.4, 0, 0);
planets.add(mars);

// 木星
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(0.6, 48, 48),
  new THREE.MeshStandardMaterial({ color: 0xffcc99 })
);
jupiter.position.set(7, 0, 0);
planets.add(jupiter);

// 土星+土星环
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 48, 48),
  new THREE.MeshStandardMaterial({ color: 0xffe0b2 })
);
saturn.position.set(9, 0, 0);
planets.add(saturn);

const saturnRing = new THREE.Mesh(
  new THREE.TorusGeometry(0.8, 0.12, 16, 64),
  new THREE.MeshStandardMaterial({ color: 0xd7ccc8, side: THREE.DoubleSide })
);
saturnRing.rotation.x = Math.PI / 2.5;
saturnRing.position.set(9, 0, 0);
planets.add(saturnRing);

scene.add(planets);


// 窗口resize适配
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};
animate();
