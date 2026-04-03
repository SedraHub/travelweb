import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('http://localhost:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setResponseMsg(data.message || 'Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                setResponseMsg(data.message || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setResponseMsg('Server unreachable. Please try again later.');
        }
    };

    return (
        <div className="contact-page">
            {/* Animated Background Orbs */}
            <div className="contact-bg-orb orb-1"></div>
            <div className="contact-bg-orb orb-2"></div>
            
            <div className="contact-container">
                {/* Left Side: Contact Info & Animations */}
                <div className="contact-info-panel">
                    <h1 className="contact-title stagger-1">Get in Touch <span className="neon-dot">.</span></h1>
                    <p className="contact-subtitle stagger-2">We're here to help you plan your next great adventure. Reach out to our global team and let the journey begin.</p>
                    
                    <div className="contact-methods stagger-3">
                        <div className="contact-method-card">
                            <div className="method-icon-wrap"><Mail size={22}/></div>
                            <div className="method-text">
                                <h3>Email Us</h3>
                                <p>hello@travelo.com</p>
                            </div>
                        </div>
                        <div className="contact-method-card">
                            <div className="method-icon-wrap"><Phone size={22}/></div>
                            <div className="method-text">
                                <h3>Call Us</h3>
                                <p>+1 (800) 123-4567</p>
                            </div>
                        </div>
                        <div className="contact-method-card">
                            <div className="method-icon-wrap"><MapPin size={22}/></div>
                            <div className="method-text">
                                <h3>Headquarters</h3>
                                <p>128 Neo-City Ave, Future District</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Glowing Form */}
                <div className="contact-form-panel stagger-4">
                    <div className="form-glass-card">
                        <div className="form-header">
                            <MessageSquare className="form-header-icon" />
                            <h2>Send a Message</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            
                            {/* Material-style floating labels for vitality */}
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    id="name" 
                                    required 
                                    placeholder=" " 
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <label htmlFor="name">Full Name</label>
                                <div className="input-glow-line"></div>
                            </div>
                            
                            <div className="input-group">
                                <input 
                                    type="email" 
                                    id="email" 
                                    required 
                                    placeholder=" " 
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email">Email Address</label>
                                <div className="input-glow-line"></div>
                            </div>
                            
                            <div className="input-group">
                                <textarea 
                                    id="message" 
                                    required 
                                    placeholder=" " 
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                                <label htmlFor="message">Your Message</label>
                                <div className="input-glow-line"></div>
                            </div>
                            
                            {status === 'success' && <p className="status-msg success">{responseMsg}</p>}
                            {status === 'error' && <p className="status-msg error">{responseMsg}</p>}
                            
                            <button 
                                type="submit" 
                                className="neon-submit-btn" 
                                disabled={status === 'loading'}
                            >
                                <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                                <Send size={18} className="send-icon" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;