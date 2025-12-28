'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function Gallery3D() {
    const images = [1, 2, 3, 4, 5];

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
                {images.map((num) => (
                    <SwiperSlide key={num} style={{ width: '300px', height: '300px', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                        <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '3px solid #B08D57' }}>
                            <Image
                                src={`/aacharya/work-${num}.jpg`}
                                alt={`Ceremony ${num}`}
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
        .swiper-slidejs-active {
            filter: blur(0);
            opacity: 1;
        }
        .swiper-pagination-bullet {
            background: #7A1E1E !important;
        }
      `}</style>
        </div>
    );
}
