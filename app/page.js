'use client';
import Image from "next/image";
import { useEffect, useRef } from 'react';

export default function Home() {

    const sliderRef = useRef(null);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        const prevBtn = prevBtnRef.current;
        const nextBtn = nextBtnRef.current;
        const productCard = document.querySelector('.product-card-new');

        if (!productCard) return;

        function initSlider() {
            if (window.innerWidth <= 768) {
                if(slider) slider.style.transform = 'none';
                if(prevBtn) prevBtn.style.display = 'none';
                if(nextBtn) nextBtn.style.display = 'none';
                return;
            }

            const cardStyle = getComputedStyle(productCard);
            let cardWidth = productCard.offsetWidth +
                parseInt(cardStyle.marginLeft) +
                parseInt(cardStyle.marginRight);

            let currentPosition = 0;
            const totalCards = document.querySelectorAll('.product-card-new').length;

            function getVisibleCards() {
                if (window.innerWidth >= 1024) return 4;
                if (window.innerWidth >= 768) return 2;
                return 1;
            }

            function updateSlider() {
                if(slider) slider.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
            }

            if(nextBtn) nextBtn.style.display = 'block';
            if(prevBtn) prevBtn.style.display = 'block';

            if(nextBtn) nextBtn.onclick = () => {
                const visibleCards = getVisibleCards();
                if (currentPosition < totalCards - visibleCards) {
                    currentPosition += 1;
                    updateSlider();
                }
            };

            if(prevBtn) prevBtn.onclick = () => {
                if (currentPosition > 0) {
                    currentPosition -= 1;
                    updateSlider();
                }
            };

            const resizeHandler = () => {
                if (window.innerWidth <= 768) {
                    if(slider) slider.style.transform = 'none';
                    if(prevBtn) prevBtn.style.display = 'none';
                    if(nextBtn) nextBtn.style.display = 'none';
                } else {
                    cardWidth = productCard.offsetWidth +
                        parseInt(cardStyle.marginLeft) +
                        parseInt(cardStyle.marginRight);
                    updateSlider();
                    if(nextBtn) nextBtn.style.display = 'block';
                    if(prevBtn) prevBtn.style.display = 'block';
                }
            }

            window.addEventListener('resize', resizeHandler);

            return () => {
                window.removeEventListener('resize', resizeHandler);
            }
        }

        initSlider();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="min-h-screen p-12 flex items-center justify-center lg:justify-start relative overflow-hidden">
                {/* Background Image (Right Side) - Hidden on smaller screens */}
                <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full hidden lg:block">
                    <div className="relative w-full h-full">
                        <Image src="/heroSection-Img.svg" width={1920} height={1080}
                               alt="Elegant dining setup"
                                />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 w-full">
                    <div className="container mx-auto px-6 pt-32 lg:pt-24 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="space-y-4 text-center lg:text-left md:pt-12">
                                <h1 className="text-primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                                    Elegance in Every Edge — Premium Cutlery from the Heart of Wazirabad
                                </h1>
                                <p className="text-secondary text-lg lg:text-xl max-w-lg leading-relaxed">
                                    Explore fine craftsmanship — from chef knives to timeless swords and elegant dining tools.
                                </p>
                                <button className="bg-highlight text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity shadow-lg">
                                    Explore Collection
                                </button>
                                {/* Stats */}
                                <div className="flex flex-wrap gap-8 pt-8 justify-center lg:justify-start">
                                    <div className="text-center">
                                        <div className="text-primary font-bold text-2xl lg:text-3xl font-quattrocento customer-rating">100k+</div>
                                        <div className="text-secondary text-sm lg:text-base">Total Customers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-primary font-bold text-2xl lg:text-3xl font-quattrocento customer-rating">90k+</div>
                                        <div className="text-secondary text-sm lg:text-base">Happy Customers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-primary font-bold text-2xl lg:text-3xl font-quattrocento customer-rating">70k+</div>
                                        <div className="text-secondary text-sm lg:text-base">Total Reviews</div>
                                    </div>
                                </div>
                                {/* Customer Reviews */}
                                <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
                                    <div className="flex -space-x-2">
                                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                                             alt="Customer" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                                        <img src="https://images.unsplash.com/photo-1494790108755-2616b90b3f5e?w=50&h=50&fit=crop&crop=face"
                                             alt="Customer" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                                             alt="Customer" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-primary font-bold text-xl font-quattrocento">70k+</div>
                                        <div className="text-secondary text-sm">Reviews</div>
                                    </div>
                                </div>
                            </div>
                            {/* Right side spacer for image */}
                            <div className="hidden lg:block"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Store Availability Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-quattrocento text-primary text-center text-3xl lg:text-4xl font-bold mb-16">
                        Our Store Available on
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center">
                        {/* Noon */}
                        <div className="flex items-center justify-center w-full sm:w-64 h-28 bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Image src="/noon-logo.svg" width={256} height={256}
                                   alt="Noon" className="max-w-full max-h-full object-contain" />
                        </div>
                        {/* Amazon */}
                        <div className="flex items-center justify-center w-full sm:w-64 h-28 bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Image src="/amazon-logo.svg"  width={256} height={256}
                                   alt="Amazon" className="max-w-full max-h-full object-contain" />
                        </div>
                        {/* Etsy */}
                        <div className="flex items-center justify-center w-full sm:w-64 h-28 bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Image src="/etsy-logo.svg" width={256} height={256}
                                   alt="Etsy" className="max-w-full max-h-full object-contain" />
                        </div>
                        {/* Daraz */}
                        <div className="flex items-center justify-center w-full sm:w-64 h-28 bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Image src="daraz-logo.svg" width={256} height={256}
                                   alt="Daraz" className="max-w-full max-h-full object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-quattrocento text-primary text-center text-3xl lg:text-4xl font-bold mb-16">
                        Categories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
                        {/* Luxury Flatware & Dining Sets */}
                        <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                            <Image src="/dinner-set-img.jpg" width={256} height={256}
                                 alt="Luxury Flatware & Dining Sets"
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="font-quattrocento text-2xl lg:text-3xl font-bold text-white leading-tight">Luxury Flatware & Dining Sets</h3>
                            </div>
                        </div>
                        {/* Hand-Forged or Custom-Made Tools */}
                        <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                            <Image src="/tools-img.jpg" width={256} height={256}
                                 alt="Hand-Forged Tools"
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="font-quattrocento text-2xl lg:text-3xl font-bold text-white leading-tight">Hand-Forged or Custom-Made Tools</h3>
                            </div>
                        </div>
                        {/* Collectible & Decorative Swords */}
                        <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                            <Image src="/sword-img.jpg" width={256} height={256}
                                 alt="Collectible & Decorative Swords"
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="font-quattrocento text-2xl lg:text-3xl font-bold text-white leading-tight">Collectible & Decorative Swords</h3>
                            </div>
                        </div>
                        {/* Premium Kitchen Knives */}
                        <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                            <Image src="/knife-img.jpg" width={256} height={256}
                                 alt="Premium Kitchen Knives"
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="font-quattrocento text-2xl lg:text-3xl font-bold text-white leading-tight">Premium Kitchen Knives</h3>
                            </div>
                        </div>
                    </div>
                    {/* Explore Collection Button */}
                    <div className="text-center">
                        <button className="bg-highlight text-white px-10 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity shadow-lg">
                            Explore Collection
                        </button>
                    </div>
                </div>
            </section>


            {/* New Product Slider Section */}
            <section className="min-h-96 flex flex-col justify-center py-16 new-product-slider">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

                    <h2 className="text-center mb-12 font-quattrocento text-4xl md:text-5xl font-bold text-primary">Products</h2>
                    <div className="max-w-7xl mx-auto max-h-[650px] hidden md:block">
                        <div className="relative mb-8 rounded-2xl">
                            <Image src="/product-section-bg.jpg" width={256} height={256}
                                alt="Product Background Image"
                                className="w-full h-[650px] object-cover rounded-2xl shadow-lg" />
                        </div>
                    </div>


                    <div className="product-slider-top relative">
                        <div className="product-slider-wrapper">
                            <div className="flex transition-transform duration-500 ease-in-out product-slider-container p-4" ref={sliderRef}>
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
                                            <p className="product-name-new mb-3">Stainless Steel Dinner Spoon – Satin Finish</p>
                                            <p className="mb-4 text-[#0E0E0E] text-sm">Sleek stainless spoon, durable, elegant,
                                                dishwasher
                                                safe.</p>
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
                                            <p className="product-name-new mb-3">Stainless Steel Dinner Fork – Satin Finish</p>
                                            <p className="mb-4 text-[#0E0E0E] text-sm">Elegant design, perfect balance,
                                                rust-resistant.</p>
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
                                                 alt="Stainless Steel Dinner Knife" className="w-full h-60 object-cover"/>
                                        </div>
                                        <div className="p-5">
                                            <p className="product-name-new mb-3">Stainless Steel Dinner Knife – Satin Finish</p>
                                            <p className="mb-4 text-[#0E0E0E] text-sm">Sharp edge, comfortable grip, long-lasting.
                                            </p>
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
                                                 alt="Stainless Steel Soup Spoon" className="w-full h-60 object-cover"/>
                                        </div>
                                        <div className="p-5">
                                            <p className="product-name-new mb-3">Stainless Steel Soup Spoon – Satin Finish</p>
                                            <p className="mb-4 text-[#0E0E0E] text-sm">Deep bowl, perfect for soups, elegant design.
                                            </p>
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

                        <button ref={prevBtnRef}
                            className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-[#D6AF66] rounded-md p-3 shadow-md hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button ref={nextBtnRef}
                            className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-[#D6AF66]  rounded-md p-3 shadow-md hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>


            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium  text-center mb-16">
                        About Us
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
                        <div className="order-2 lg:order-1">
                            <h3 className="other-heading font-medium text-heading-lg  mb-6">
                                Stag Horn Cutlery – Forged in Tradition, Sharpened for the Future
                            </h3>
                            <p className="font-body font-normal text-base lg:text-lg  leading-relaxed">
                                Stag Horn Cutlery – Forged in Tradition, Sharpened for the Future
                                Nestled in the heart of Wazirabad, the historic city known as the “City of Cutlery”,
                                Stag Horn Cutlery has been crafting excellence for over 5 years. Our journey began with a simple mission — to
                                bring Pakistan’s rich cutlery heritage to the global stage through uncompromising quality,
                                timeless design, and passionate craftsmanship.
                            </p>
                            <p className="font-normal text-base lg:text-lg  leading-relaxed">
                                At Stag Horn Cutlery, every blade tells a story. From professional chef knives and elegant dining sets
                                to exquisite collector swords, we fuse traditional forging techniques with modern aesthetics.
                                Our artisans, trained in generations-old craftsmanship, forge each product with precision, strength,
                                and a commitment to beauty.
                            </p>
                            <p className="font-normal text-base lg:text-lg  leading-relaxed">
                                What started in a small workshop in Wazirabad is now a name recognized by chefs, collectors,
                                and cutlery connoisseurs across borders. Whether you’re slicing in the kitchen, gifting elegance,
                                or adding to your collection, Stag Horn Cutlery delivers a cut above the rest.
                            </p>
                            <strong className="text-base lg:text-lg  leading-relaxed">Because here, it’s not just metal — it’s mastery in your hands.</strong>
                        </div>

                        <div className="order-1 lg:order-2 h-full">
                            <div className="relative h-full">
                                <Image
                                    src="/about-section-img.jpg"
                                    width={256}
                                    height={256}
                                    alt="About"
                                    className="w-full h-full rounded-2xl"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="bg-[#D6AF66] w-28 h-28 rounded-full flex items-center justify-center">
                                        <Image src="/play-icon.svg" width={56} height={56} alt="Play" className="w-8 h-8 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="mb-16 text-center">Testimonials</h2>

                    <div className="masonry-grid">
                        <div className="testimonial-item">
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    Top-notch quality. My cooking feels professional now!
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <Image src="/testimonial-profile-img.jpg"
                                     width={96} height={96} alt="Emma Collins" className="profile-image" />
                                <div>
                                    <div className="customer-name">Emma Collins</div>
                                    <div className="customer-date">01 - 08 - 2025</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item">
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    I ordered a custom-forged sword and was blown away by the detail. It is not just a weapon — it is art. Stag Horn has revived old-world quality in a modern world.
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <Image src="/testimonial-profile-img.jpg"
                                     width={96} height={96} alt="Mariam Zafar" className="profile-image" />
                                <div>
                                    <div className="customer-name">Mariam Zafar</div>
                                    <div className="customer-date">01 - 08 - 2025</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item">
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    I bought a 3-piece knife set from Stag Horn, and I now actually enjoy cooking. The grip, the sharpness, the design — love everything!
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <Image src="/testimonial-profile-img.jpg"
                                     width={96} height={96} alt="Naveed Ahmed" className="profile-image" />
                                <div>
                                    <div className="customer-name">Naveed Ahmed</div>
                                    <div className="customer-date">01 - 08 - 2025</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item">
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    I bought a 3-piece knife set from Stag Horn, and I now actually enjoy cooking. The grip, the sharpness, the design — love everything!
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <Image src="/testimonial-profile-img.jpg"
                                     width={96} height={96} alt="Sarah Lee" className="profile-image" />
                                <div>
                                    <div className="customer-name">Sarah Lee</div>
                                    <div className="customer-date">01 - 08 - 2025</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item">
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    We have been sourcing from Stag Horn Cutlery Work for over two years. Their consistency, packaging, and client service are exceptional. Every piece feels like a premium product — because it is.
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <Image src="/testimonial-profile-img.jpg" width={96} height={96} alt="Jimmy" className="profile-image" />
                                <div>
                                    <div className="customer-name">Jimmy</div>
                                    <div className="customer-date">01 - 08 - 2025</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item">
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    Blades that do not just cut — they glide. Excellent craftsmanship. Proud to support a Pakistani brand making waves globally.
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <Image src="/testimonial-profile-img.jpg" width={96} height={96} alt="John Doe" className="profile-image" />
                                <div>
                                    <div className="customer-name">John Doe</div>
                                    <div className="customer-date">01 - 08 - 2025</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item">
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    The custom sword I ordered was beyond my expectations. Intricate hand-etching, perfectly balanced, and incredibly well packaged. This is world-class metalwork.
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <Image src="/testimonial-profile-img.jpg" width={96} height={96} alt="Customer" className="profile-image" />
                                <div>
                                    <div className="customer-name">Alex Turner</div>
                                    <div className="customer-date">01 - 08 - 2025</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item">
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    We have been sourcing from Stag Horn Cutlery Work for over two years. Their consistency, packaging, and client service are exceptional. Every piece feels like a premium product — because it is.
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <Image src="/testimonial-profile-img.jpg" width={96} height={96} alt="Customer" className="profile-image" />
                                <div>
                                    <div className="customer-name">Mike Johnson</div>
                                    <div className="customer-date">01 - 08 - 2025</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="form-container">
                        <h2 className="form-title">Order Now</h2>

                        <form>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input type="text" id="fullName" name="fullName" className="form-input" placeholder="Full Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" id="email" name="email" className="form-input" placeholder="Email" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input type="tel" id="phoneNumber" name="phoneNumber" className="form-input" placeholder="+92  Phone Number" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="whatsappNumber" className="form-label">Whatsapp Number</label>
                                    <input type="tel" id="whatsappNumber" name="whatsappNumber" className="form-input" placeholder="+92  Phone Number" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="companyName" className="form-label">Company Name (Optional)</label>
                                    <input type="text" id="companyName" name="companyName" className="form-input" placeholder="Company Name (Optional)" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="companyEmail" className="form-label">Company Email (Optional)</label>
                                    <input type="email" id="companyEmail" name="companyEmail" className="form-input" placeholder="Company Email (Optional)" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" id="country" name="country" className="form-input" placeholder="Country" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" id="location" name="location" className="form-input" placeholder="Location" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" id="city" name="city" className="form-input" placeholder="City" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productQuantity" className="form-label">Product Quantity</label>
                                    <input type="number" id="productQuantity" name="productQuantity" className="form-input" placeholder="Product Quantity" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="shipmentAddress" className="form-label">Shipment Address</label>
                                    <input type="text" id="shipmentAddress" name="shipmentAddress" className="form-input" placeholder="Enter full shipment address..." />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="emergencyContact" className="form-label">Emergency Contact Number</label>
                                    <input type="tel" id="emergencyContact" name="emergencyContact" className="form-input" placeholder="Enter emergency contact number" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea id="message" name="message" className="form-textarea" placeholder="Write Message..."></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="submit-button">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
