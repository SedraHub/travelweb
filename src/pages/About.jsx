import { Link } from "react-router-dom";
import { Map, Compass, Globe, Star, ArrowRight, TrendingUp, Users, Award, Shield } from "lucide-react";
import Globe3D from "../components/Globe3D";
import "./About.css";
import worldMap from "../assets/world-map.png";

const features = [
    { icon: <Map size={18} />, label: "Explore" },
    { icon: <Compass size={18} />, label: "Navigate" },
    { icon: <Globe size={18} />, label: "Discover" },
    { icon: <Star size={18} />, label: "Experience" },
];

const ticker = [
    { label: "Active Travelers", value: "50K+", delta: "+12%", up: true },
    { label: "Destinations", value: "120", delta: "+8", up: true },
    { label: "Avg. Rating", value: "4.9★", delta: "Stable", up: null },
    { label: "Partners", value: "340", delta: "+24", up: true },
];

const infoColumns = [
    {
        icon: <Globe size={16} />,
        title: "What we do",
        body: "Showcase countries and destinations with rich, immersive storytelling and data-driven insights.",
    },
    {
        icon: <TrendingUp size={16} />,
        title: "Why we built this",
        body: "To inspire travel, eliminate friction, and make discovery genuinely personal.",
    },
    {
        icon: <Shield size={16} />,
        title: "Our Approach",
        body: "Curated, verified, and continuously updated — every detail vetted by real travelers.",
    },
    {
        icon: <Award size={16} />,
        title: "Our Vision",
        body: "Make travel exploration interactive, transparent, and accessible to everyone.",
    },
];

const team = [
    { name: "Layla Hassan", role: "Founder & CEO", emoji: "👩‍💼", color: "#7c3aed", since: "2010" },
    { name: "Omar Khalil", role: "Co-Founder & CTO", emoji: "👨‍💻", color: "#2563eb", since: "2010" },
    { name: "Sara Yilmaz", role: "Brand Director", emoji: "👩‍🎨", color: "#0891b2", since: "2015" },
    { name: "Ahmed Nour", role: "Head of Operations", emoji: "👨‍✈️", color: "#059669", since: "2018" },
];

const mapLocations = [
    { top: "27.4%", left: "29.4%", city: "New York" }, // lat:40.71  lng:-74.01
    { top: "21.4%", left: "50.0%", city: "London" }, // lat:51.51  lng:-0.13
    { top: "27.2%", left: "58.1%", city: "Istanbul" }, // lat:41.01  lng:28.98
    { top: "36.0%", left: "65.4%", city: "Dubai" }, // lat:25.20  lng:55.27
    { top: "39.4%", left: "70.2%", city: "Mumbai" }, // lat:19.08  lng:72.88
    { top: "30.2%", left: "88.8%", city: "Tokyo" }, // lat:35.68  lng:139.65
];

export default function About() {
    return (
        <div className="ab-page">
            {/* Added float animation to title for organic vitality */}
            <h1 className="ab-page-title stagger-1" style={{ animation: 'slideUp 0.8s ease forwards' }}>About Us</h1>

            {/* Main Dashboard Card - Staggered entrance */}
            <div className="ab-card stagger-2">

                {/* ── Top bar ── */}
                <div className="ab-topbar">
                    <div className="ab-brand">
                        <span className="ab-brand-dot" />
                        <span className="ab-brand-name">Travelo</span>
                        <span className="ab-live-badge">● LIVE</span>
                    </div>

                    {/* Ticker */}
                    <div className="ab-ticker">
                        {ticker.map((t, i) => (
                            <div key={i} className="ab-ticker-item">
                                <span className="ab-ticker-label">{t.label}</span>
                                <span className="ab-ticker-value">{t.value}</span>
                                {t.up !== null && (
                                    <span className={`ab-ticker-delta ${t.up ? "ab-delta-up" : "ab-delta-down"}`}>
                                        {t.up ? "↑" : "↓"} {t.delta}
                                    </span>
                                )}
                                {t.up === null && (
                                    <span className="ab-ticker-delta ab-delta-stable">— {t.delta}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <Link to="/destinations" className="ab-generate-btn">
                        Destinations <ArrowRight size={13} />
                    </Link>
                    <button className="ab-expand-btn" aria-label="expand">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                    </button>
                </div>

                {/* ── Hero Section ── */}
                <div className="ab-hero">
                    {/* Left: Text */}
                    <div className="ab-hero-left stagger-3">
                        <div className="ab-trust-row">
                            <Shield size={13} />
                            <span>Trusted by 50,000+ travelers worldwide</span>
                        </div>
                        <h2 className="ab-hero-title">
                            Discover the World<br />
                            Through <span className="ab-title-accent">Experiences</span>
                        </h2>
                        <p className="ab-hero-sub">
                            Helping you explore countries, cultures, and must-visit
                            locations with an immersive, data-backed experience.
                        </p>
                        <div className="ab-feature-pills">
                            {features.map((f, i) => (
                                <button key={i} className="ab-pill" title={f.label}>
                                    {f.icon}
                                    <span className="ab-pill-label">{f.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: 3D Globe */}
                    <div className="ab-globe-wrap stagger-4">
                        <div className="ab-globe-glow" />
                        <Globe3D width={340} height={300} />
                        {/* Globe stats overlay */}
                        <div className="ab-globe-stat ab-gstat-1" style={{ animation: 'float 4s infinite ease-in-out' }}>
                            <span className="ab-gstat-val">120+</span>
                            <span className="ab-gstat-lbl">Countries</span>
                        </div>
                        <div className="ab-globe-stat ab-gstat-2" style={{ animation: 'float 5s infinite ease-in-out reverse' }}>
                            <span className="ab-gstat-val">15 yrs</span>
                            <span className="ab-gstat-lbl">Experience</span>
                        </div>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="ab-divider" />

                {/* ── Bottom Section ── */}
                <div className="ab-bottom stagger-5">
                    {/* Map column */}
                    <div className="ab-map-col">
                        <div className="ab-map-header">
                            <p className="ab-section-label">Global Coverage</p>
                            <span className="ab-map-live-dot">●</span>
                        </div>
                        <div className="ab-map-wrap">
                            <img src={worldMap} alt="World map" className="ab-world-map" />
                            {/* SVG connection lines */}
                            <svg className="ab-map-lines" viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
                                {/* New York → London */}
                                <line x1="64.7" y1="41.1" x2="110" y2="32.1" stroke="rgba(0,242,255,0.3)" strokeWidth="0.5" strokeDasharray="3 3" />
                                {/* London → Istanbul */}
                                <line x1="110" y1="32.1" x2="127.8" y2="40.8" stroke="rgba(0,242,255,0.3)" strokeWidth="0.5" strokeDasharray="3 3" />
                                {/* Istanbul → Dubai */}
                                <line x1="127.8" y1="40.8" x2="143.9" y2="54" stroke="rgba(0,242,255,0.3)" strokeWidth="0.5" strokeDasharray="3 3" />
                                {/* Dubai → Mumbai */}
                                <line x1="143.9" y1="54" x2="154.4" y2="59.1" stroke="rgba(0,242,255,0.3)" strokeWidth="0.5" strokeDasharray="3 3" />
                                {/* Mumbai → Tokyo */}
                                <line x1="154.4" y1="59.1" x2="195.4" y2="45.3" stroke="rgba(0,242,255,0.3)" strokeWidth="0.5" strokeDasharray="3 3" />
                            </svg>
                            {/* Location dots */}
                            {mapLocations.map((loc, i) => (
                                <div
                                    key={i}
                                    className="ab-map-city"
                                    style={{ top: loc.top, left: loc.left }}
                                    title={loc.city}
                                >
                                    <div className="ab-city-dot" />
                                    <div className="ab-city-pulse" />
                                    <span className="ab-city-label">{loc.city}</span>
                                </div>
                            ))}
                        </div>
                        <div className="ab-map-footer">
                            <span className="ab-map-count">6 regions covered</span>
                        </div>
                    </div>

                    {/* Info columns */}
                    <div className="ab-info-cols">
                        {infoColumns.map((col, i) => (
                            <div key={i} className="ab-info-item">
                                <div className="ab-info-icon">{col.icon}</div>
                                <h4 className="ab-info-title">{col.title}</h4>
                                <p className="ab-info-body">{col.body}</p>
                            </div>
                        ))}
                    </div>

                    {/* Team column */}
                    <div className="ab-team-col">
                        <p className="ab-section-label">Our Team</p>
                        <div className="ab-team-cards">
                            {team.map((member, i) => (
                                <div key={i} className="ab-team-card" style={{ "--accent": member.color }}>
                                    <div className="ab-team-avatar" style={{ background: member.color }}>
                                        {member.emoji}
                                    </div>
                                    <div className="ab-team-info">
                                        <span className="ab-team-name">{member.name}</span>
                                        <span className="ab-team-role">{member.role}</span>
                                    </div>
                                    <div className="ab-team-actions">
                                        <span className="ab-team-since">Since {member.since}</span>
                                        <div className="ab-team-status" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Footer bar ── */}
                <div className="ab-footer-bar">
                    <Link to="/contact" className="ab-join-link">
                        Join the Journey <ArrowRight size={14} />
                    </Link>
                    <div className="ab-footer-meta">
                        <span>ISO 9001 Certified</span>
                        <span className="ab-sep">·</span>
                        <span>IATA Accredited</span>
                        <span className="ab-sep">·</span>
                        <span>© 2026 Travelo Inc.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
