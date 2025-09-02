'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ProductDetails({ product }) {
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderRef = useRef(null);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

    const totalImages = product.images.length;

    const changeMainImage = (index) => {
        setMainImage(product.images[index]);
    };

    // This effect handles the visual sliding and button state updates
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const isMobile = window.innerWidth <= 768;
        const slideWidthPercentage = isMobile ? 100 : 50;
        const translateX = -(currentSlide * slideWidthPercentage);
        slider.style.transform = `translateX(${translateX}%)`;

        if (!isMobile) {
            const prevBtn = prevBtnRef.current;
            const nextBtn = nextBtnRef.current;
            if (!prevBtn || !nextBtn) return;
            
            const maxDesktopSlide = Math.max(0, totalImages - 2);
            prevBtn.disabled = currentSlide === 0;
            prevBtn.classList.toggle('slider-btn-disabled', currentSlide === 0);
            nextBtn.disabled = currentSlide >= maxDesktopSlide;
            nextBtn.classList.toggle('slider-btn-disabled', currentSlide >= maxDesktopSlide);
        }
    }, [currentSlide, totalImages]);

    // This effect handles setting up intervals and event listeners
    useEffect(() => {
        const prevBtn = prevBtnRef.current;
        const nextBtn = nextBtnRef.current;

        let autoSlideInterval = null;

        const handleNext = () => {
            setCurrentSlide(prev => {
                const maxDesktopSlide = Math.max(0, totalImages - 2);
                return Math.min(prev + 1, maxDesktopSlide);
            });
        };
        const handlePrev = () => {
            setCurrentSlide(prev => Math.max(prev - 1, 0));
        };

        const setupSliderForCurrentScreenSize = () => {
            clearInterval(autoSlideInterval);
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';

                autoSlideInterval = setInterval(() => {
                    setCurrentSlide(prev => (prev + 1) % totalImages);
                }, 1000); // 1 second interval
            } else {
                if (prevBtn) prevBtn.style.display = 'block';
                if (nextBtn) nextBtn.style.display = 'block';
                const maxDesktopSlide = Math.max(0, totalImages - 2);
                setCurrentSlide(prev => Math.min(prev, maxDesktopSlide));
            }
        };

        setupSliderForCurrentScreenSize();
        
        if (nextBtn) nextBtn.addEventListener('click', handleNext);
        if (prevBtn) prevBtn.addEventListener('click', handlePrev);
        window.addEventListener('resize', setupSliderForCurrentScreenSize);

        return () => {
            clearInterval(autoSlideInterval);
            if (nextBtn) nextBtn.removeEventListener('click', handleNext);
            if (prevBtn) prevBtn.removeEventListener('click', handlePrev);
            window.removeEventListener('resize', setupSliderForCurrentScreenSize);
        };
    }, [totalImages]);

    return (
        <div className="container mx-auto px-8 py-16 mt-24 max-w-6xl">
            <div className="text-center mb-12">
                <h1 className="font-quattrocento font-bold text-primary">
                    {product.name}
                </h1>
            </div>

            <div className="flex justify-center mb-12">
                <div className="max-w-2xl w-full">
                    <img id="mainImage" src={mainImage} alt={product.name} className="w-full rounded-2xl shadow-lg object-cover" style={{ aspectRatio: '4/3' }} />
                </div>
            </div>

            <div className="max-w-7xl mx-auto mb-8">
                <h3 className="mb-8 font-quattrocento text-2xl font-bold text-primary">Preview</h3>
                
                <div className="relative max-w-7xl mx-auto">
                    <div className="product-slider-wrapper">
                        <div className="flex transition-transform duration-500 ease-in-out preview-slider-container" ref={sliderRef}>
                            {product.previewImages.map((imgSrc, index) => (
                                <div className="preview-card px-2" key={index}>
                                    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden cursor-pointer" onClick={() => changeMainImage(index)}>
                                        <div className="relative">
                                            <img src={imgSrc} alt={`${product.name} preview ${index + 1}`} className="w-full object-cover" style={{ height: '240px' }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button ref={prevBtnRef} className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-[#D6AF66] rounded-md p-3 shadow-md hidden md:block transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button ref={nextBtnRef} className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-[#D6AF66] rounded-md p-3 shadow-md hidden md:block transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <p className="text-lg mb-2 text-primary">Price: 
                        <span className="price-color font-bold text-2xl"> {product.price} $</span>
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="font-quattrocento font-bold text-3xl mb-6 text-primary">Description</h2>
                    <div className="prose prose-lg max-w-none">
                        <p className="mb-4 leading-relaxed text-secondary">{product.description}</p>
                    </div>
                </div>

                <div className="text-center">
                    <button className="cta-button">Order Now</button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mt-24 mb-24">
                    <h2 className="mb-8">Related Products</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">

                    <div className="product-card-new">
                        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                            <div className="relative">
                                <img src="/spoon-product.jpg" width={256} height={256}
                                     alt="Stainless Steel Dinner Spoon" className="w-full h-60 object-cover"/>
                                <div className="absolute top-2 right-2 flex flex-col space-y-1">
                                    <span className="badge-new text-xs px-2 py-1 rounded">Top Rated</span>
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="product-name-new mb-3 h-9 line-clamp-2">Stainless Steel Dinner Spoon – Satin Finish</p>
                                <p className="mb-4 text-[#0E0E0E] text-sm h-15 line-clamp-3">Sleek stainless spoon, durable, elegant, dishwasher safe.</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-bold product-price-new">$5.99</span>
                                </div>
                                <p className="text-sm text-[#0E0E0E] mb-2">Estimate delivery in 2-3 working days</p>
                                <button className="cta-button-new w-full py-2 rounded-md font-medium">Order Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="product-card-new">
                        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                            <div className="relative">
                                <img src="/spoon-product.jpg"  width={256} height={256}
                                     alt="Stainless Steel Dinner Fork" className="w-full h-60 object-cover"/>
                                <div className="absolute top-2 right-2 flex flex-col space-y-1">
                                    <span className="badge-new text-xs px-2 py-1 rounded">Best Selling</span>
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="product-name-new mb-3 h-9 line-clamp-2">Stainless Steel Dinner Fork – Satin Finish</p>
                                <p className="mb-4 text-[#0E0E0E] text-sm h-15 line-clamp-3">Elegant design, perfect balance, rust-resistant.</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-bold product-price-new">$5.99</span>
                                </div>
                                <p className="text-sm text-[#0E0E0E] mb-2">Estimate delivery in 2-3 working days</p>
                                <button className="cta-button-new w-full py-2 rounded-md font-medium">Order Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="product-card-new">
                        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                            <div className="relative">
                                <img src="/spoon-product.jpg" width={256} height={256}
                                     alt="Stainless Steel Dinner Spoon" className="w-full h-60 object-cover"/>
                            </div>
                            <div className="p-5">
                                <p className="product-name-new mb-3 h-9 line-clamp-2">Stainless Steel Dinner Spoon – Satin Finish</p>
                                <p className="mb-4 text-[#0E0E0E] text-sm h-15 line-clamp-3">Sleek stainless spoon, durable, elegant, dishwasher safe.</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-bold product-price-new">$5.99</span>
                                </div>
                                <p className="text-sm text-[#0E0E0E] mb-2">Estimate delivery in 2-3 working days</p>
                                <button className="cta-button-new w-full py-2 rounded-md font-medium">Order Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="product-card-new">
                        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                            <div className="relative">
                                <img src="/spoon-product.jpg"  width={256} height={256}
                                     alt="Stainless Steel Dinner Fork" className="w-full h-60 object-cover"/>
                            </div>
                            <div className="p-5">
                                <p className="product-name-new mb-3 h-9 line-clamp-2">Stainless Steel Dinner Fork – Satin Finish</p>
                                <p className="mb-4 text-[#0E0E0E] text-sm h-15 line-clamp-3">Elegant design, perfect balance, rust-resistant.</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-bold product-price-new">$5.99</span>
                                </div>
                                <p className="text-sm text-[#0E0E0E] mb-2">Estimate delivery in 2-3 working days</p>
                                <button className="cta-button-new w-full py-2 rounded-md font-medium">Order Now</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}