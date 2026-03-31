import React, { useState, useEffect } from "react";
import "./Destinations.css";

// Locally hosted high-fidelity 4K assets
import imgCappadocia from '../assets/destinations/cappadocia.jpg';
import imgUzungol from '../assets/destinations/uzungol.jpg';
import imgAlUla from '../assets/destinations/al-ula.jpg';
import imgShebara from '../assets/destinations/shebara.jpg';
import imgZermatt from '../assets/destinations/zermatt.jpg';
import imgLakeComo from '../assets/destinations/lake-como.jpg';
import imgMountFuji from '../assets/destinations/mount-fuji.jpg';
import imgShibuya from '../assets/destinations/shibuya.jpg';

// ==========================================
// CENTRALIZED DATA (Aligned with Home.jsx Map)
// ==========================================
const DESTINATIONS = [
    {
        id: "cappadocia",
        country: "TURKEY",
        place: "CAPPADOCIA",
        img: imgCappadocia,
        thumb: imgCappadocia,
        rating: "4.9",
        weather: "15°C",
        duration: "3-5 Days",
        description: "Known for its distinctive 'fairy chimneys,' tall, cone-shaped rock formations clustered in Monks Valley and elsewhere. A sunrise hot air balloon flight over this alien landscape is a once-in-a-lifetime experience.",
        reviews: [
            { name: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?img=1", rating: 5, date: "October 2025", text: "The hot air balloon ride at sunrise was the most magical morning of my life. Waking up in a cave hotel was unforgettable!" },
            { name: "Ahmed Khaled", avatar: "https://i.pravatar.cc/150?img=11", rating: 5, date: "September 2025", text: "Stunning historical landscape. Exploring the underground cities felt like stepping into another world." }
        ]
    },
    {
        id: "uzungol",
        country: "TURKEY",
        place: "UZUNGOL",
        img: imgUzungol,
        thumb: imgUzungol,
        rating: "4.7",
        weather: "12°C",
        duration: "2-3 Days",
        description: "A gorgeous lake situated to the south of the city of Trabzon. Over the years, it has become a major tourist attraction, noted for its stunning natural beauty, high mountains, and deep green forests.",
        reviews: [
            { name: "Fatima A.", avatar: "https://i.pravatar.cc/150?img=5", rating: 4, date: "August 2025", text: "The weather was incredibly crisp and refreshing compared to the city. Very peaceful nature walks." },
            { name: "John D.", avatar: "https://i.pravatar.cc/150?img=15", rating: 5, date: "July 2025", text: "Absolutely stunning lake views. The local tea houses around the water are magnificent." }
        ]
    },
    {
        id: "al-ula",
        country: "SAUDI",
        place: "AL-ULA",
        img: imgAlUla,
        thumb: imgAlUla,
        rating: "4.9",
        weather: "28°C",
        duration: "3-4 Days",
        description: "AlUla is a living museum holding 200,000 years of largely unexplored human history. The vast desert landscape features stunning sandstone mountains, ancient cultural heritage sites like Hegra, and the mirrored Maraya building.",
        reviews: [
            { name: "Omar F.", avatar: "https://i.pravatar.cc/150?img=12", rating: 5, date: "November 2025", text: "Hegra is breathtaking. A true hidden gem of ancient history that everyone must see." },
            { name: "Elena R.", avatar: "https://i.pravatar.cc/150?img=9", rating: 5, date: "August 2025", text: "The Maraya mirror building blending into the desert canyon is an architectural masterclass." }
        ]
    },
    {
        id: "shebara",
        country: "SAUDI",
        place: "SHEBARA",
        img: imgShebara,
        thumb: imgShebara,
        rating: "4.8",
        weather: "30°C",
        duration: "4-6 Days",
        description: "A luxury island resort destination offering incredible over-water steel orb villas. Shebara provides an exclusive, ultra-premium retreat over the pristine waters of the Red Sea with unparalleled marine life.",
        reviews: [
            { name: "David M.", avatar: "https://i.pravatar.cc/150?img=33", rating: 5, date: "December 2025", text: "The most luxurious resort stay I've ever experienced. The futuristic steel orbs are gorgeous." }
        ]
    },
    {
        id: "zermatt",
        country: "SWISS",
        place: "ZERMATT",
        img: imgZermatt,
        thumb: imgZermatt,
        rating: "5.0",
        weather: "-5°C",
        duration: "5-7 Days",
        description: "Zermatt, in southern Switzerland's Valais canton, is a mountain resort renowned for skiing, climbing and hiking. The town, at an elevation of around 1,600m, lies below the iconic, pyramid-shaped Matterhorn peak.",
        reviews: [
            { name: "Chloe T.", avatar: "https://i.pravatar.cc/150?img=43", rating: 5, date: "January 2026", text: "The skiing here is world-class. Waking up to the view of the Matterhorn is genuinely inspiring." },
            { name: "Marcus L.", avatar: "https://i.pravatar.cc/150?img=53", rating: 5, date: "February 2026", text: "A beautiful car-free village. The glacier palace is a cool experience for the family." }
        ]
    },
    {
        id: "lake-como",
        country: "ITALY",
        place: "LAKE COMO",
        img: imgLakeComo,
        thumb: imgLakeComo,
        rating: "4.7",
        weather: "22°C",
        duration: "3-5 Days",
        description: "Lake Como, in Northern Italy's Lombardy region, is an upscale resort area known for its dramatic scenery, set against the foothills of the Alps. The lake is shaped like an inverted Y, with three slender branches that meet at the resort town of Bellagio.",
        reviews: [
            { name: "Sophia W.", avatar: "https://i.pravatar.cc/150?img=20", rating: 5, date: "May 2025", text: "Renting a classic wooden boat to tour the villas is highly recommended. The food is incredible." },
            { name: "Leo R.", avatar: "https://i.pravatar.cc/150?img=60", rating: 4, date: "June 2025", text: "Gorgeous, but can get quite busy during the summer. Varenna is my favorite town." }
        ]
    },
    {
        id: "mount-fuji",
        country: "JAPAN",
        place: "MT. FUJI",
        img: imgMountFuji,
        thumb: imgMountFuji,
        rating: "4.9",
        weather: "8°C",
        duration: "2-4 Days",
        description: "Japan's Mt. Fuji is an active volcano about 100 kilometers southwest of Tokyo. Commonly called 'Fuji-san', it's the country's tallest peak, at 3,776 meters. A pilgrimage site for centuries, it's considered one of Japan's 3 sacred mountains.",
        reviews: [
            { name: "Kenji M.", avatar: "https://i.pravatar.cc/150?img=61", rating: 5, date: "April 2025", text: "Seeing Fuji perfectly clear during cherry blossom season is the ultimate Japanese experience." },
            { name: "Anna S.", avatar: "https://i.pravatar.cc/150?img=47", rating: 5, date: "May 2025", text: "The Chureito Pagoda view makes for an incredible photo spot. A must-visit." }
        ]
    },
    {
        id: "shibuya",
        country: "JAPAN",
        place: "SHIBUYA",
        img: imgShibuya,
        thumb: imgShibuya,
        rating: "4.8",
        weather: "18°C",
        duration: "3-5 Days",
        description: "Shibuya is a special ward in Tokyo, Japan. A major commercial and finance center, it houses the two busiest railway stations in the world and the iconic Shibuya Crossing, known globally as the busiest pedestrian intersection.",
        reviews: [
            { name: "Liam B.", avatar: "https://i.pravatar.cc/150?img=13", rating: 5, date: "September 2025", text: "The energy here at night is completely unmatched. Izakayas, bright lights, and endless shopping." }
        ]
    }
];


function Destinations() {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
    // null = Grid view. If object = Immersive Scrollable View.
    const [selectedDest, setSelectedDest] = useState(null);
    
    // Parallax Coordinates tracker
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Grid View variables
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 4;

    // ==========================================
    // PARALLAX EFFECT LOGIC
    // ==========================================
    useEffect(() => {
        if (!selectedDest) return;

        const handleMouseMove = (e) => {
            // Very subtle parallax so it doesn't cause motion sickness while scrolling
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            setMousePos({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [selectedDest]);

    // ==========================================
    // SEARCH & PAGINATION LOGIC
    // ==========================================
    const filteredDestinations = DESTINATIONS.filter(dest => 
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
        dest.place.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);

    const currentItems = filteredDestinations.slice(
        currentPage * ITEMS_PER_PAGE, 
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(0);
    }, [searchQuery]);

    // ==========================================
    // VIEW 2: IMMERSIVE SCROLLABLE VIEW (With Details & Reviews)
    // ==========================================
    if (selectedDest) {
        return (
            <div className="dest-immersive">
                
                {/* 
                  Fixed Background Layer. 
                  This stays planted while you scroll down, and still reacts to the mouse.
                */}
                <div 
                    className="dest-immersive-bg"
                    style={{
                        backgroundImage: `url(${selectedDest.img})`,
                        transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.05)`
                    }}
                ></div>
                <div className="dest-immersive-overlay"></div>

                {/* Back button fixed to the top left */}
                <button 
                    className="dest-back-btn"
                    onClick={() => setSelectedDest(null)}
                >
                    &larr; Back to Destinations
                </button>

                {/* SCROLLABLE CONTENT WRAPPER */}
                <div className="dest-scrollable-content">
                    
                    {/* Hero Section (100vh) */}
                    <div className="dest-hero-screen">
                        <div className="dest-hero-typo">
                            <p className="dest-immersive-country">{selectedDest.country}</p>
                            <h1 className="dest-immersive-place">{selectedDest.place}.</h1>
                        </div>
                        
                        {/* Scroll Down Indicator */}
                        <div className="dest-scroll-indicator">
                            <span>Scroll for Details</span>
                            <div className="scroll-arrow">↓</div>
                        </div>

                        {/* Navigation dots (aesthetic matching ref image) */}
                        <div className="dest-immersive-dots">
                            <span className="active"></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    {/* Rich Details & Reviews Section (Scrolls up to cover the text) */}
                    <div className="dest-details-section">
                        
                        {/* Left Column: Place Information */}
                        <div className="dest-info-column">
                            <h2 className="dest-section-title">Overview</h2>
                            <p className="dest-description">{selectedDest.description}</p>
                            
                            <div className="dest-stats-grid">
                                <div className="dest-stat-box">
                                    <span className="stat-label">Rating</span>
                                    <span className="stat-value highlight">★ {selectedDest.rating} / 5</span>
                                </div>
                                <div className="dest-stat-box">
                                    <span className="stat-label">Weather</span>
                                    <span className="stat-value">{selectedDest.weather}</span>
                                </div>
                                <div className="dest-stat-box">
                                    <span className="stat-label">Ideal Trip</span>
                                    <span className="stat-value">{selectedDest.duration}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: User Reviews */}
                        <div className="dest-reviews-column">
                            <h2 className="dest-section-title">Traveler Reveiws</h2>
                            <div className="dest-reviews-list">
                                {selectedDest.reviews.map((review, i) => (
                                    <div key={i} className="dest-review-card">
                                        <div className="review-header">
                                            <img src={review.avatar} alt={review.name} className="review-avatar" />
                                            <div className="review-meta">
                                                <h4>{review.name}</h4>
                                                <span className="review-date">{review.date}</span>
                                            </div>
                                            <div className="review-stars">
                                                {Array(review.rating).fill("★").join("")}
                                            </div>
                                        </div>
                                        <p className="review-text">"{review.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // ==========================================
    // VIEW 1: NEON GRID DASHBOARD
    // ==========================================
    return (
        <div className="dest-grid-view">
            <div className="dest-neon-container">
                <div className="dest-header">
                    <h2>Destinations</h2>
                    <div className="dest-search-bar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search (e.g. Fuji, Swiss)" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="dest-grid">
                    {currentItems.length > 0 ? (
                        currentItems.map((dest) => (
                            <div 
                                key={dest.id} 
                                className="dest-card"
                                onClick={() => setSelectedDest(dest)}
                            >
                                <img src={dest.thumb} alt={dest.place} />
                                <div className="dest-card-label">{dest.place}</div>
                                <div className="dest-card-glow"></div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "white", textAlign: "center", gridColumn: "1 / -1" }}>No destinations found.</p>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="dest-grid-pagination">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <span 
                                key={idx} 
                                className={idx === currentPage ? "active" : ""}
                                onClick={() => setCurrentPage(idx)}
                                style={{ cursor: "pointer" }}
                            ></span>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="dest-bg-text">TRAVELO</div>
        </div>
    );
}

export default Destinations;