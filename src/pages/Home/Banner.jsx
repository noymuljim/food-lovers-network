//import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Banner = () => {
    return (
        <div>


            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >



                <SwiperSlide>
                    <div
                        className="hero min-h-screen"
                        style={{
                            backgroundImage:
                                "url(https://i.ibb.co.com/mrbf4h9V/banner2.png)",
                        }}
                    >
                        <div className="hero-overlay"></div>

                        {/* Left-aligned container */}
                        <div className="w-full  flex items-center md:pl-30">
                            <div className="w-full md:w-1/2 text-center px-3 md:text-left md:pl-16 text-white">
                                <h1 className="mb-5 text-5xl font-bold">
                                    Let’s Make Local Food Better Together.
                                </h1>
                                <p className="mb-5">
                                    Add your honest review and support local eateries in serving cleaner, tastier, and more trustworthy food.
                                </p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                        
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="hero min-h-screen"
                        style={{
                            backgroundImage:
                                "url(https://i.ibb.co.com/Ngfcrfgf/banner.png)",
                        }}
                    >
                        <div className="hero-overlay"></div>

                        {/* Left-aligned container */}
                        <div className="w-full  flex items-center md:pl-30">
                            <div className="w-full md:w-1/2 text-center px-3 md:text-left md:pl-16 text-white">
                                <h1 className="mb-5 text-5xl font-bold">
                                    Your Taste. Your Voice. <br />Your Community.
                                </h1>
                                <p className="mb-5">
                                    Share your local food reviews and help improve the quality,
                                    safety, and taste of meals for everyone.
                                </p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>

                </SwiperSlide>





            </Swiper>
        </div>
    );
};

export default Banner;