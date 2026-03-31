import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled]         = useState(false);
    const [mobileMenuOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
        { to: '/',            label: 'Home'         },
        { to: '/destinations', label: 'Destinations' },
        { to: '/about',       label: 'About Us'     },
        { to: '/contact',     label: 'Contact'      },
    ];

    return (
        <nav className={`glass-nav${scrolled ? ' scrolled' : ''}`}>
            <Link to="/" className="nav-logo">
                TRAVELO<span>.</span>
            </Link>

            <ul className={`nav-links${mobileMenuOpen ? ' active' : ''}`}>
                {links.map(({ to, label }) => (
                    <li key={to}>
                        <Link
                            to={to}
                            className={location.pathname === to ? 'active-link' : ''}
                            onClick={() => setMobileOpen(false)}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="nav-auth">
                <Link to="/contact" className="neon-btn">Join Now</Link>
                <button
                    className={`hamburger${mobileMenuOpen ? ' open' : ''}`}
                    onClick={() => setMobileOpen(v => !v)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;