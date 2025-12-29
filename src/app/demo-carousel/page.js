"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Heart, MessageCircle, Share2, Battery, Wifi, Signal, Play, Music, Disc } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const videos = [1, 2, 3, 4, 5];

export default function DemoCarousel() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at center, #1a0b00 0%, #000000 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'serif',
            overflow: 'hidden'
        }}>
            <h1 style={{
                fontSize: '3rem',
                color: '#d4af37',
                marginBottom: '1rem',
                textShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
            }}>Divine Shorts V7</h1>
            <p style={{ color: '#888', marginBottom: '2rem' }}>Floating Hearts • Spinning Vinyl • Bezel Shimmer</p>

            <div style={{ width: '100%', maxWidth: '1400px', padding: '0 20px' }}>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={2}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 300,
                        modifier: 1,
                        slideShadows: false,
                        scale: 0.85,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="mySwiper"
                    style={{ paddingBottom: '80px', paddingTop: '40px' }}
                >
                    {videos.map((v) => (
                        <SwiperSlide key={v} className="custom-slide" style={{
                            width: '360px',
                            height: '640px',
                            borderRadius: '40px',
                            background: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            // Base Bezel
                            border: '12px solid #1a1a1a',
                        }}>
                            {/* Bezel Shimmer Overlay */}
                            <div className="bezel-shimmer" style={{
                                position: 'absolute', inset: '-12px',
                                borderRadius: '40px',
                                border: '12px solid transparent',
                                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                maskComposite: 'exclude',
                                background: 'linear-gradient(45deg, #d4af37, #fced21, #d4af37, #996515, #d4af37)',
                                backgroundSize: '400% 400%',
                                animation: 'goldShimmer 3s ease infinite',
                                pointerEvents: 'none',
                                zIndex: 50
                            }}></div>

                            {/* Screen Content */}
                            <div className="screen-content" style={{
                                width: '100%', height: '100%',
                                background: '#0a0a0a',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                position: 'relative',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {/* Top Status Bar */}
                                <div style={{
                                    position: 'absolute', top: 15, left: 20, right: 20,
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    zIndex: 30, fontSize: '0.8rem', fontWeight: 'bold'
                                }}>
                                    <span>11:11</span>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <Signal size={14} />
                                        <Wifi size={14} />
                                        <Battery size={14} />
                                    </div>
                                </div>

                                {/* Main Content Play Button */}
                                <div className="content" style={{ textAlign: 'center', zIndex: 2 }}>
                                    <div style={{
                                        width: '60px', height: '60px',
                                        background: 'rgba(255,255,255,0.2)',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 10px',
                                        backdropFilter: 'blur(5px)'
                                    }}>
                                        <Play fill="white" size={30} style={{ marginLeft: '5px' }} />
                                    </div>
                                    <h2 style={{ color: '#d4af37', fontFamily: 'serif', fontSize: '1.5rem', marginBottom: '5px' }}>Video {v}</h2>
                                </div>

                                {/* Right Side Actions */}
                                <div style={{
                                    position: 'absolute', bottom: 100, right: 10,
                                    display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center',
                                    zIndex: 30
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Heart size={28} />
                                        <span style={{ fontSize: '0.7rem', display: 'block' }}>2.5K</span>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <MessageCircle size={28} />
                                        <span style={{ fontSize: '0.7rem', display: 'block' }}>400</span>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Share2 size={28} />
                                        <span style={{ fontSize: '0.7rem', display: 'block' }}>Share</span>
                                    </div>
                                    {/* Spinning Vinyl */}
                                    <div style={{
                                        width: '40px', height: '40px',
                                        background: '#222', borderRadius: '50%', border: '2px solid #333',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginTop: '10px',
                                        animation: 'spin 4s linear infinite'
                                    }}>
                                        <Disc size={20} color="#d4af37" />
                                    </div>
                                </div>

                                {/* Floating Hearts Animation (Only on Active) */}
                                <div className="floating-hearts">
                                    <span>❤️</span>
                                    <span>❤️</span>
                                    <span>✨</span>
                                </div>

                                {/* Bottom Info & Progress */}
                                <div style={{
                                    position: 'absolute', bottom: 20, left: 15, right: 15,
                                    zIndex: 30
                                }}>
                                    {/* Audio Info */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px', opacity: 0.8 }}>
                                        <Music size={12} />
                                        <span style={{ fontSize: '0.7rem' }}>Original Audio - Astro Priest</span>
                                    </div>

                                    {/* Channel Info */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                        <div style={{
                                            width: '35px', height: '35px', borderRadius: '50%', background: '#d4af37',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: '2px solid white'
                                        }}>
                                            <span style={{ fontSize: '1.2rem' }}>🕉️</span>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>@AstroPriest</div>
                                            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Subscribe</div>
                                        </div>
                                    </div>

                                    {/* Progress Bar (Static Fake) */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.3)', position: 'relative', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{ width: '45%', height: '100%', background: '#d4af37' }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Edge Fades & Notch */}
                                <div className="fade-overlay" style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 15%, transparent 85%, rgba(0,0,0,1) 100%)',
                                    pointerEvents: 'none',
                                    zIndex: 20
                                }}></div>

                                <div style={{
                                    position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', borderRadius: '20px',
                                    width: '100px', height: '25px', background: 'black', zIndex: 40
                                }}></div>

                                {/* Home Indicator */}
                                <div style={{
                                    position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)', borderRadius: '10px',
                                    width: '120px', height: '4px', background: 'white', opacity: 0.5, zIndex: 40
                                }}></div>
                            </div>

                            {/* Reflection */}
                            <div style={{
                                position: 'absolute', bottom: '-660px', width: '100%', height: '100%',
                                background: 'inherit', borderRadius: '40px', opacity: 0.3, transform: 'scaleY(-1)',
                                maskImage: 'linear-gradient(to top, transparent, white 20%)',
                                WebkitMaskImage: 'linear-gradient(to top, transparent, white 20%)',
                                pointerEvents: 'none',
                            }}></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                /* Animations */
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes goldShimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                
                @keyframes floatUp {
                    0% { transform: translateY(0) scale(0.5); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateY(-100px) scale(1); opacity: 0; }
                }

                .floating-hearts {
                    position: absolute; bottom: 150px; right: 20px;
                    display: flex; flex-direction: column; 
                    z-index: 35; pointer-events: none;
                }
                .floating-hearts span {
                    font-size: 1.5rem;
                    opacity: 0;
                }
                .swiper-slide-active .floating-hearts span:nth-child(1) { animation: floatUp 2s ease-out infinite; }
                .swiper-slide-active .floating-hearts span:nth-child(2) { animation: floatUp 2.5s ease-out infinite 0.5s; font-size: 1rem; right: 10px; position: relative; }
                .swiper-slide-active .floating-hearts span:nth-child(3) { animation: floatUp 3s ease-out infinite 1s; font-size: 0.8rem; left: 5px; position: relative; }

                /* Swiper Styles */
                .swiper-slide {
                    transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
                    opacity: 0.3; 
                    transform: scale(0.9);
                    filter: grayscale(100%) brightness(50%);
                }
                .swiper-slide-active {
                    opacity: 1 !important; 
                    transform: scale(1.05) !important;
                    z-index: 10;
                    filter: grayscale(0%) brightness(100%) !important;
                    box-shadow: 0 0 60px rgba(212, 175, 55, 0.3); 
                }
                .swiper-pagination-bullet { background: #666; }
                .swiper-pagination-bullet-active { background: #d4af37; }
                .swiper-button-next, .swiper-button-prev { color: #d4af37; }
            `}</style>
        </div>
    );
}
