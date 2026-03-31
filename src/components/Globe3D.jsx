import { useEffect, useRef, useState } from "react";

// City markers shown on the globe
const CITIES = [
    { lat: 40.7128, lng: -74.0060, city: "New York", color: "#00f2ff" },
    { lat: 51.5074, lng: -0.1278, city: "London", color: "#00f2ff" },
    { lat: 41.0082, lng: 28.9784, city: "Istanbul", color: "#f59e0b" },
    { lat: 25.2048, lng: 55.2708, city: "Dubai", color: "#00f2ff" },
    { lat: 19.0760, lng: 72.8777, city: "Mumbai", color: "#00f2ff" },
    { lat: 35.6762, lng: 139.6503, city: "Tokyo", color: "#00f2ff" },
    { lat: -33.8688, lng: 151.2093, city: "Sydney", color: "#00f2ff" },
    { lat: -15.7801, lng: -47.9292, city: "Brasilia", color: "#00f2ff" },
];

// Arc connections between cities
const ARCS = [
    { startLat: 40.7128, startLng: -74.0060, endLat: 51.5074, endLng: -0.1278 },
    { startLat: 51.5074, startLng: -0.1278, endLat: 41.0082, endLng: 28.9784 },
    { startLat: 41.0082, startLng: 28.9784, endLat: 25.2048, endLng: 55.2708 },
    { startLat: 25.2048, startLng: 55.2708, endLat: 19.0760, endLng: 72.8777 },
    { startLat: 19.0760, startLng: 72.8777, endLat: 35.6762, endLng: 139.6503 },
    { startLat: 35.6762, startLng: 139.6503, endLat: -33.8688, endLng: 151.2093 },
    { startLat: 40.7128, startLng: -74.0060, endLat: -15.7801, endLng: -47.9292 },
];

export default function Globe3D({ width = 300, height = 300 }) {
    const globeEl = useRef(null);
    const globeRef = useRef(null);
    const [GlobeComponent, setGlobeComponent] = useState(null);

    // Dynamically import react-globe.gl (it has no SSR support)
    useEffect(() => {
        import("react-globe.gl").then((mod) => {
            setGlobeComponent(() => mod.default);
        });
    }, []);

    // Auto-rotate after mount
    useEffect(() => {
        if (!globeRef.current) return;
        const ctrl = globeRef.current.controls();
        if (ctrl) {
            ctrl.autoRotate = true;
            ctrl.autoRotateSpeed = 0.6;
            ctrl.enableZoom = false;
        }
    }, [GlobeComponent]);

    if (!GlobeComponent) {
        return (
            <div style={{
                width, height,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#7dd3fc", fontSize: "0.8rem"
            }}>
                Loading globe…
            </div>
        );
    }

    return (
        <div ref={globeEl} style={{ width, height, cursor: "grab" }}>
            <GlobeComponent
                ref={globeRef}
                width={width}
                height={height}
                backgroundColor="rgba(0,0,0,0)"

                // Earth textures
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                // Atmosphere glow
                atmosphereColor="#00a8ff"
                atmosphereAltitude={0.18}
                showAtmosphere={true}

                // City dots
                pointsData={CITIES}
                pointLat="lat"
                pointLng="lng"
                pointColor="color"
                pointAltitude={0.01}
                pointRadius={0.4}
                pointsMerge={false}

                // Arc connections
                arcsData={ARCS}
                arcStartLat="startLat"
                arcStartLng="startLng"
                arcEndLat="endLat"
                arcEndLng="endLng"
                arcColor={() => ["rgba(0,242,255,0.6)", "rgba(99,102,241,0.6)"]}
                arcAltitude={0.25}
                arcStroke={0.4}
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={2000}
            />
        </div>
    );
}
