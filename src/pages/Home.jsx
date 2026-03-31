import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../App.css';

const countriesData = [
  { name: "TURKEY", color: "#e63946", lat: 39, lon: 35,
    cities: ["CAPADOCIA", "UZUNGÖL", "FETHIYE", "BOSPHORUS", "GALATA TOWER"]},
  {name: "SAUDI ARABIA", color: "#f4a261", lat: 24, lon: 45,
    cities: ["AL-ULA", "SHEBARA", "AL-DISAH"]},
  { name: "SWITZERLAND", color: "#2a9d8f", lat: 47, lon: 8,
    cities: ["ZERMATT", "GRINDELWALD", "OESCHINENSEE"]},
  { name: "ITALY", color: "#e9c46a", lat: 42, lon: 12,
    cities: ["LAKE COMO", "ROME COLOSSEUM", "AMALFI COAST"]},
  {name: "JAPAN", color: "#ff6b9d", lat: 36, lon: 138,
    cities: ["MOUNT FUJI", "SHIBUYA", "KINKAKU-JI"]},
];

const Home = () => {
  const globeRef = useRef();
  const controlsRef = useRef();
  const rendererRef = useRef();
  const markersRef = useRef([]);
  const cameraRef = useRef();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    if (globeRef.current) {
      globeRef.current.innerHTML = '';
      globeRef.current.appendChild(renderer.domElement);
    }
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    const loader = new THREE.TextureLoader();
    const earthTex  = loader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');
    const specTex   = loader.load('https://threejs.org/examples/textures/earth_specular_2048.jpg');

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 64, 64),
      new THREE.MeshPhongMaterial({
        map: earthTex,
        specularMap: specTex,
        specular: new THREE.Color(0x334466),
        shininess: 15,
      }));
    globeGroup.add(globe);
    const atmosMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x3399ff,
        transparent: true,
        opacity: 0.07,
        side: THREE.FrontSide,
      })
    );
    globeGroup.add(atmosMesh);
    const glowMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.97, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x0055cc,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide,
      })
    );
    scene.add(glowMesh);
    const markersGroup = new THREE.Group();
    globeGroup.add(markersGroup);
    markersRef.current = [];

    countriesData.forEach(country => {
      const phi   = (90 - country.lat) * (Math.PI / 180);
      const theta = (country.lon + 180) * (Math.PI / 180);
      const R = 2.0;
      const pos = new THREE.Vector3(
        -(R * Math.sin(phi) * Math.cos(theta)),
         R * Math.cos(phi),
         R * Math.sin(phi) * Math.sin(theta)
      );
      const ring = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 20, 20),
        new THREE.MeshBasicMaterial({ color: country.color, transparent: true, opacity: 0.55 })
      );
      ring.position.copy(pos);
      ring.userData = country;
      markersGroup.add(ring);
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      dot.position.copy(pos);
      markersGroup.add(dot);

      markersRef.current.push({ ring, dot, country });
    });
    scene.add(new THREE.AmbientLight(0x334466, 1.4));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(6, 4, 6);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x4488ff, 0.5);
    rim.position.set(-6, 0, -4);
    scene.add(rim);
    camera.position.set(3, 2.0, -6);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = 0.4;
    controls.maxPolarAngle = Math.PI - 0.4;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const getHit = (e) => {
      mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const rings = markersRef.current.map(m => m.ring);
      const hits  = raycaster.intersectObjects(rings);
      return hits.length > 0 ? hits[0].object.userData : null;
    };

    const onMove  = (e) => setHovered(getHit(e));
    const onClick = (e) => {
      const hit = getHit(e);
      if (hit) setSelected(prev => prev?.name === hit.name ? null : hit);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();

      const t = Date.now() * 0.003;
      markersRef.current.forEach(({ ring, country }) => {
        const isHov = hovered?.name === country.name;
        const isSel = selected?.name === country.name;
        const base = isSel ? 1.6 : isHov ? 1.3 : 1;
        const pulse = base + Math.sin(t * 2) * 0.12;
        ring.scale.setScalar(pulse);
      });
      renderer.render(scene, camera);
    };
    animate();
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="travelo-wrapper">

      <div className="trav-header">
        <span className="trav-logo">✈ TRAVELO</span>
      </div>

      {!selected && <div className="fixed-world">WORLD</div>}

  
      {hovered && !selected && (
        <div className="hover-label" style={{ color: hovered.color }}>
          {hovered.name}
        </div>
      )}


      {selected && (
        <div className="selected-country-bg" style={{ color: selected.color }}>
          {selected.name}
        </div>
      )}

      <div className={`globe-main ${selected ? 'shifted' : ''}`}>
        <div ref={globeRef} />
      </div>
      {selected && (
        <div className="city-sidebar">
          <div className="sidebar-line" style={{ background: selected.color }} />
          <p className="sidebar-country" style={{ color: selected.color }}>
            {selected.name}
          </p>
          <p className="sidebar-sub">DESTINATIONS</p>
          {selected.cities.map((city, i) => (
            <div
              key={i}
              className="city-item"
              style={{ animationDelay: `${i * 0.08}s`, borderColor: selected.color + '33' }}
            >
              <div className="city-dot" style={{ background: selected.color }} />
              <span className="city-name">{city}</span>
            </div>
          ))}
          <button className="back-btn" onClick={() => setSelected(null)}>
            ← BACK TO WORLD
          </button>
        </div>
      )}


    </div>
  );
};

export default Home;
