import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Globe3D from "../components/Globe3D";

function Home() {
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState("TURKEY");
    const [hoveredPlace, setHoveredPlace] = useState(null);

    const countriesData = {
        TURKEY: [
            { id: 1, name: "CAPPADOCIA", img: "https://images.unsplash.com/photo-1695415683093-ae5f213ea898?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" },
            { id: 2, name: "UZUNGOL", img: "https://i.pinimg.com/1200x/59/6e/43/596e43839a722f57c883eaf14f2fc2c7.jpg" },
            { id: 3, name: "BOSPHORUS", img: "https://i.pinimg.com/1200x/c1/93/70/c19370e3f6e6b228f7267c55a8754494.jpg" },
        ],
        SAUDI: [
            { id: 4, name: "AL-ULA", img: "https://images.unsplash.com/photo-1681419671941-aa9bc9df0bfb?w=500" },
            { id: 5, name: "SHEBARA", img: "https://i.pinimg.com/736x/e4/cd/b3/e4cdb35c85ec751d717963c8299e75e0.jpg" },
            { id: 6, name: "AL-DISAH", img: "https://i.pinimg.com/736x/b0/47/cb/b047cba9ee4d98e445d09c0a6c50b1a5.jpg" }
        ],
        SWITZERLAND: [
            { id: 7, name: "ZERMATT", img: "https://i.pinimg.com/736x/4b/b8/63/4bb8630d85665e3996f8e4c6757bbd81.jpg" },
            { id: 8, name: "GRINDELWALD", img: "https://i.pinimg.com/736x/c7/d3/ea/c7d3ea7b2b6587048139ddcbee1d5f07.jpg" },
            { id: 9, name: "OESCHINENSEE", img: "https://i0.wp.com/microtripping.com/wp-content/uploads/2016/10/dsc_0578.jpg" }
        ],
        ITALY: [
            { id: 10, name: "LAKE COMO", img: "https://i.pinimg.com/1200x/db/b7/8e/dbb78eb5c26aa429f500c93aa2658c79.jpg" },
            { id: 11, name: "ROME COLOSSEUM", img: "https://tourismmedia.italia.it/is/image/mitur/20220127150143-colosseo-roma-lazio-shutterstock-756032350-1?wid=1600&hei=900&fit=constrain,1&fmt=webp" },
            { id: 12, name: "AMALFI COAST", img: "https://i.pinimg.com/736x/b1/75/27/b175272a1d3094a43e82efd3d299a226.jpg" }
        ],
        JAPAN: [
            { id: 13, name: "MOUNT FUJI", img: "https://i.pinimg.com/1200x/d2/2d/3f/d22d3fbdb5f38a449dbef983f7e72e69.jpg" },
            { id: 14, name: "SHIBUYA", img: "https://i.pinimg.com/736x/33/1b/43/331b437dd876a3f5b3e5aaec83f96264.jpg" },
            { id: 15, name: "KINAKU-JI", img: "https://kinkakujitemple.com/wp-content/uploads/2024/11/kinkakuji-temple-golden-pavilion-kyoto-japan-summer-view-1.jpg" }
        ]
    };

    return (
        <div className="home-page">
            <div className="home-countries">
                {Object.keys(countriesData).map((country, index) => (
                    <button
                        key={country}
                        onClick={() => {
                            setSelectedCountry(country);
                            setHoveredPlace(null);
                        }}
                        className={`home-country-btn ${selectedCountry === country ? "active" : ""}`}
                    >
                        <span className="home-index">0{index + 1}</span>
                        <span className="home-label">{country}</span>
                    </button>
                ))}
            </div>

            <div className="home-line"></div>

            {/* Centered Globe Container */}
            <div className="home-globe-center">
                <Globe3D width={650} height={650} />
            </div>

            <div className="home-places">
                {countriesData[selectedCountry].map((place, index) => (
                    <div
                        key={place.id}
                        className="home-place-item"
                        onMouseEnter={() => setHoveredPlace(place)}
                        onMouseLeave={() => setHoveredPlace(null)}
                        onClick={() => navigate('/destinations')}
                    >

                        <div className={`home-img-popup ${hoveredPlace?.id === place.id ? "visible" : ""}`}>
                            <div className="home-img-wrap">
                                <img src={place.img} alt={place.name} />
                            </div>
                        </div>

                        <div className={`home-dot ${hoveredPlace?.id === place.id ? "active" : ""}`}></div>

                        <div className={`home-name ${hoveredPlace?.id === place.id ? "active" : ""}`}>
                            <span className="home-place-label">{place.name}</span>
                            <span className="home-place-index">0{index + 1}</span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;