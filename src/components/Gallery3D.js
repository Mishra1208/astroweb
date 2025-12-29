'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function Gallery3D() {
    const images = [
        '/aacharya/work-1.jpg',
        '/aacharya/work-2.jpg',
        '/aacharya/work-3.jpg',
        '/aacharya/work-4.jpg',
        '/aacharya/work-5.jpg',
        '/aacharya/new videos/86bf76be-9e13-4bc7-8a29-2981532489c2.jpg',
        '/aacharya/new videos/91826d99-2001-4228-af0b-5598a161a6e9.jpg',
        '/aacharya/new videos/IMG_5591.jpg'
    ];

    return (
        <div className="gallery-container">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index} style={{ width: '300px', height: '300px', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                        <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '3px solid #d4af37' }}>
                            <Image
                                src={src}
                                alt={`Ceremony ${index + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
        .gallery-container {
            width: 100%;
            padding-top: 50px;
            padding-bottom: 50px;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 300px;
            height: 300px;
            filter: blur(2px);
            opacity: 0.7;
            transition: all 0.3s;
        }
        .swiper-slide-active {
            filter: blur(0);
            opacity: 1;
            transform: scale(1.1); /* Slight zoom for active item */
            z-index: 2;
        }
        .swiper-pagination-bullet {
            background: #7A1E1E !important;
        }
      `}</style>
        </div>
    );
}
