"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Heart, Share2, Music, Play, Pause, Volume2, VolumeX, Signal, Wifi, Battery, MessageCircle, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const videoData = [
    { id: 1, src: "/aacharya/new videos/20fac5a3-7eb4-4139-82a0-354cd5a71d38.mov" },
    { id: 2, src: "/aacharya/new videos/39c7a612-a4bb-490d-90ef-a15ceb511e15.MP4" },
    { id: 3, src: "/aacharya/new videos/4c05d25a-db44-43eb-9046-df79a015d594.MOV" },
    { id: 4, src: "/aacharya/new videos/9f8a56be-579c-49dd-86e4-b23af4bbca73.mov" },
    { id: 5, src: "/aacharya/new videos/c5a6a22d-7c16-4e8a-a174-52000d5ba14c.mov" },
];

export default function VideoShorts() {
    const [isMounted, setIsMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(2);
    const [isMuted, setIsMuted] = useState(true);
    const [playingStates, setPlayingStates] = useState(videoData.map((_, i) => i === 2));
    const videoRefs = useRef([]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        videoRefs.current.forEach((video, i) => {
            if (video) {
                video.currentTime = 0.1;
                if (i === 2) {
                    video.play().catch(() => { });
                }
            }
        });
    }, [isMounted]);

    const handleSlideChange = (swiper) => {
        const newIndex = swiper.realIndex;
        setActiveIndex(newIndex);

        const newPlaying = videoData.map((_, i) => i === newIndex);
        setPlayingStates(newPlaying);

        videoRefs.current.forEach((video, i) => {
            if (video) {
                if (i === newIndex) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                    video.currentTime = 0.1;
                }
            }
        });
    };

    const togglePlay = (index, e) => {
        if (index !== activeIndex) return; // Only allow interaction on center
        if (e) e.stopPropagation();
        const nextPlaying = [...playingStates];
        nextPlaying[index] = !nextPlaying[index];
        setPlayingStates(nextPlaying);

        const video = videoRefs.current[index];
        if (video) {
            if (nextPlaying[index]) video.play().catch(() => { });
            else video.pause();
        }
    };

    const toggleMute = (e) => {
        // Prevent double firing if both touch and click happen
        if (e && e.cancelable) e.preventDefault();
        if (e) e.stopPropagation();

        const newMuted = !isMuted;
        setIsMuted(newMuted);

        // Standard iOS Fix: Directly manipulate the DOM element for audio
        const video = videoRefs.current[activeIndex];
        if (video) {
            video.muted = newMuted;
            // Force play if unmuting, just in case
            if (!newMuted) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => { });
                }
            }
        }
    };

    if (!isMounted) return <div style={{ minHeight: '600px' }} />;

    return (
        <div className="video-shorts-container" style={{ width: '100%', padding: '100px 0', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={2}
                    onSlideChange={handleSlideChange}
                    coverflowEffect={{
                        rotate: 0, stretch: 0, depth: 300, modifier: 1, slideShadows: false, scale: 0.85,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination]}
                    className="videoShortsSwiper"
                    style={{ padding: '80px 0', overflow: 'visible' }}
                    breakpoints={{
                        320: { slidesPerView: 1.3, spaceBetween: 20 },
                        640: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 'auto', spaceBetween: 50 }
                    }}
                >
                    {videoData.map((v, index) => (
                        <SwiperSlide key={v.id} className="video-slide" onClick={(e) => togglePlay(index, e)}>
                            <div className={`phone-frame ${index === activeIndex ? 'active' : ''}`}>
                                <video
                                    ref={el => videoRefs.current[index] = el}
                                    src={v.src}
                                    className="shorts-video"
                                    playsInline
                                    muted={index === activeIndex ? isMuted : true}
                                    loop
                                    preload="auto"
                                ></video>

                                <AnimatePresence>
                                    {!playingStates[index] && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                            className="play-overlay"
                                            style={{ pointerEvents: 'none' }}
                                        >
                                            <Play size={60} fill="currentColor" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {index === activeIndex && (
                                    <div
                                        onTouchEnd={toggleMute}
                                        onClick={toggleMute}
                                        className="control-btn mute-btn"
                                        style={{ pointerEvents: 'auto', width: '50px', height: '50px' }}
                                    >
                                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                    </div>
                                )}

                                <div className="ui-overlay">
                                    <div className="status-bar">
                                        <span>11:11</span>
                                        <div className="status-icons"><Signal size={12} /><Wifi size={12} /><Battery size={12} /></div>
                                    </div>
                                    <div className="notch"></div>
                                    <div className="side-actions">
                                        <div className="action-item"><Heart size={26} /><span>2.5K</span></div>
                                        <div className="action-item"><MessageCircle size={26} /><span>400</span></div>
                                        <div className="action-item"><Share2 size={26} /><span>Share</span></div>
                                        <div className="spin-disc"><Disc size={18} color="#d4af37" /></div>
                                    </div>
                                    <div className="bottom-info">
                                        <div className="music-tag"><Music size={10} /><span>Original Audio - Astro Priest</span></div>
                                        <div className="user-profile">
                                            <div className="avatar">🕉️</div>
                                            <div className="user-details">
                                                <div className="username">@AstroPriest</div>
                                                <div className="sub-text">Subscribe</div>
                                            </div>
                                        </div>
                                        <div className="home-bar"></div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                
                .video-shorts-container { overflow: visible !important; }
                
                .video-shorts-container .video-slide {
                    width: 320px; height: 580px; border-radius: 48px;
                    background: #0a0a0a; position: relative; cursor: pointer;
                    overflow: visible !important;
                }
                
                .video-shorts-container .phone-frame {
                    width: 100%; height: 100%; border-radius: 48px; border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 20px 60px rgba(80, 40, 10, 0.15); transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
                    transform: scale(1); position: relative; overflow: hidden; background: #000;
                }
                
                .video-shorts-container .phone-frame.active { 
                    transform: scale(1.05); 
                    box-shadow: 0 50px 100px -30px rgba(80, 40, 10, 0.35); 
                }

                .videoShortsSwiper { overflow: visible !important; }
                .videoShortsSwiper .swiper-slide:not(.swiper-slide-active) { opacity: 0.6; }
                .video-shorts-container .shorts-video { width: 100%; height: 100%; object-fit: cover; }
                .video-shorts-container .play-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 100; color: white; pointer-events: none; }
                .video-shorts-container .control-btn {
                    position: absolute; top: 60px; right: 20px; width: 36px; height: 36px; border-radius: 50%;
                    background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;
                    z-index: 100; color: white; border: 1px solid rgba(255,255,255,0.2); cursor: pointer;
                }
                .video-shorts-container .ui-overlay { position: absolute; inset: 0; pointer-events: none; z-index: 30; }
                .video-shorts-container .status-bar { position: absolute; top: 25px; left: 30px; right: 30px; display: flex; justify-content: space-between; color: white; font-size: 0.8rem; font-weight: bold; }
                .video-shorts-container .status-icons { display: flex; gap: 4px; }
                .video-shorts-container .notch { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 90px; height: 20px; background: black; border-radius: 15px; }
                .video-shorts-container .side-actions { position: absolute; bottom: 100px; right: 10px; display: flex; flex-direction: column; gap: 20px; align-items: center; color: white; }
                .video-shorts-container .action-item { text-align: center; }
                .video-shorts-container .action-item span { font-size: 0.6rem; display: block; }
                .video-shorts-container .spin-disc { width: 36px; height: 36px; background: #222; border-radius: 50%; border: 1px solid #444; display: flex; align-items: center; justify-content: center; animation: spin 4s linear infinite; }
                .video-shorts-container .bottom-info { position: absolute; bottom: 20px; left: 15px; right: 15px; color: white; }
                .video-shorts-container .music-tag { display: flex; align-items: center; gap: 5px; margin-bottom: 8px; opacity: 0.8; }
                .video-shorts-container .music-tag span { font-size: 0.65rem; }
                .video-shorts-container .user-profile { display: flex; align-items: center; gap: 10px; }
                .video-shorts-container .avatar { width: 32px; height: 32px; border-radius: 50%; background: #d4af37; display: flex; align-items: center; justify-content: center; border: 1px solid white; }
                .videoShortsSwiper .swiper-pagination-bullet { background: #666; width: 8px; height: 8px; transition: all 0.3s; }
                .videoShortsSwiper .swiper-pagination-bullet-active { background: #d4af37; width: 24px; border-radius: 4px; }
                
                /* CRITICAL INTERACTION FIXES */
                .videoShortsSwiper .swiper-slide {
                    z-index: 0 !important;
                    transition: z-index 0.3s, transform 0.3s !important;
                }
                .videoShortsSwiper .swiper-slide-active {
                    z-index: 50 !important; /* Ensure active slide is ALWAYS on top */
                    pointer-events: auto !important;
                }
                .videoShortsSwiper .swiper-slide:not(.swiper-slide-active) {
                    opacity: 0.6;
                    /* pointer-events: none;  <-- Optional: Disables touch on side slides if needed, but z-index usually fixes it */
                }
                .videoShortsSwiper .swiper-wrapper {
                     z-index: 1;
                }
            `}</style>
        </div>
    );
}
