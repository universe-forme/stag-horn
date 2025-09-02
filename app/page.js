'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from 'react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import TestimonialScroller from "../components/TestimonialScroller";
import ContactForm from "../components/ContactForm";
import ConditionalLayout from "../components/ConditionalLayout";

export default function Home() {
    return (
        <ConditionalLayout>
            <HomeContent />
        </ConditionalLayout>
    );
}

function HomeContent() {
    const sliderRef = useRef(null);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

    // Refs for the new category slider
    const categorySliderRef = useRef(null);
    const categoryPrevBtnRef = useRef(null);
    const categoryNextBtnRef = useRef(null);

    const categories = useQuery(api.categories.getActiveCategories);
    const products = useQuery(api.products.getActiveProducts);


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

            function updateButtonStates() {
                const visibleCards = getVisibleCards();
                if (prevBtn) {
                    prevBtn.disabled = currentPosition === 0;
                    prevBtn.classList.toggle('slider-btn-disabled', currentPosition === 0);
                }
                if (nextBtn) {
                    nextBtn.disabled = currentPosition >= totalCards - visibleCards;
                    nextBtn.classList.toggle('slider-btn-disabled', currentPosition >= totalCards - visibleCards);
                }
            }

            function updateSlider() {
                if(slider) slider.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
                updateButtonStates();
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
                updateButtonStates();
            }
            updateButtonStates();

            window.addEventListener('resize', resizeHandler);

            return () => {
                window.removeEventListener('resize', resizeHandler);
            }
        }

        initSlider();

        // --- Category Slider Logic ---
        const catSlider = categorySliderRef.current;
        const catPrevBtn = categoryPrevBtnRef.current;
        const catNextBtn = categoryNextBtnRef.current;
        const categoryCard = document.querySelector('.category-card-item');

        if (!categoryCard || !catSlider) return;

        function initCategorySlider() {
            if (window.innerWidth <= 768) {
                if(catSlider) catSlider.style.transform = 'none';
                if(catPrevBtn) catPrevBtn.style.display = 'none';
                if(catNextBtn) catNextBtn.style.display = 'none';
                return;
            }

            let cardWidth = categoryCard.offsetWidth;

            let currentPosition = 0;
            const totalCards = document.querySelectorAll('.category-card-item').length;

            function getVisibleCards() {
                if (window.innerWidth >= 1024) return 4;
                if (window.innerWidth >= 768) return 2;
                return 1;
            }

            function updateCatButtonStates() {
                const visibleCards = getVisibleCards();
                if (catPrevBtn) {
                    catPrevBtn.disabled = currentPosition === 0;
                    catPrevBtn.classList.toggle('slider-btn-disabled', currentPosition === 0);
                }
                if (catNextBtn) {
                    catNextBtn.disabled = currentPosition >= totalCards - visibleCards;
                    catNextBtn.classList.toggle('slider-btn-disabled', currentPosition >= totalCards - visibleCards);
                }
            }

            function updateCatSlider() {
                if(catSlider) catSlider.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
                updateCatButtonStates();
            }

            if(catNextBtn) catNextBtn.style.display = 'block';
            if(catPrevBtn) catPrevBtn.style.display = 'block';

            if(catNextBtn) catNextBtn.onclick = () => {
                const visibleCards = getVisibleCards();
                if (currentPosition < totalCards - visibleCards) {
                    currentPosition += 1;
                    updateCatSlider();
                }
            };

            if(catPrevBtn) catPrevBtn.onclick = () => {
                if (currentPosition > 0) {
                    currentPosition -= 1;
                    updateCatSlider();
                }
            };

            const catResizeHandler = () => {
                cardWidth = categoryCard.offsetWidth;
                if (window.innerWidth <= 768) {
                    if(catSlider) catSlider.style.transform = 'none';
                    if(catPrevBtn) catPrevBtn.style.display = 'none';
                    if(catNextBtn) catNextBtn.style.display = 'none';
                } else {
                    updateCatSlider();
                    if(catNextBtn) catNextBtn.style.display = 'block';
                    if(catPrevBtn) catPrevBtn.style.display = 'block';
                }
                updateCatButtonStates();
            }

            updateCatButtonStates();

            window.addEventListener('resize', catResizeHandler);

            return () => {
                window.removeEventListener('resize', catResizeHandler);
            }
        }

        initCategorySlider();
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
                                <Link href="/categories">
                                    <button className="bg-highlight text-white px-10 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity shadow-lg">
                                        Explore Collection
                                    </button>
                                </Link>
                                {/* Stats */}
                                <div className="flex flex-wrap gap-8 pt-8 justify-center lg:justify-start">
                                    <div className="">
                                        <div className="text-primary font-bold text-2xl lg:text-3xl font-quattrocento customer-rating">100k+</div>
                                        <div className="text-secondary text-sm lg:text-base">Total Customers</div>
                                    </div>
                                    <div className="">
                                        <div className="text-primary font-bold text-2xl lg:text-3xl font-quattrocento customer-rating">90k+</div>
                                        <div className="text-secondary text-sm lg:text-base">Happy Customers</div>
                                    </div>
                                    <div className="">
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
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-center justify-items-center">
                        {/* Noon */}
                        <div className="flex items-center justify-center w-full h-24 md:h-28 bg-white rounded-2xl shadow-md p-6 md:p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Image src="/noon-logo.svg" width={256} height={256}
                                   alt="Noon" className="max-w-full max-h-full object-contain" />
                        </div>
                        {/* Amazon */}
                        <div className="flex items-center justify-center w-full h-24 md:h-28 bg-white rounded-2xl shadow-md p-6 md:p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Image src="/amazon-logo.svg"  width={256} height={256}
                                   alt="Amazon" className="max-w-full max-h-full object-contain" />
                        </div>
                        {/* Etsy */}
                        <div className="flex items-center justify-center w-full h-24 md:h-28 bg-white rounded-2xl shadow-md p-6 md:p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Image src="/etsy-logo.svg" width={256} height={256}
                                   alt="Etsy" className="max-w-full max-h-full object-contain" />
                        </div>
                        {/* Daraz */}
                        <div className="flex items-center justify-center w-full h-24 md:h-28 bg-white rounded-2xl shadow-md p-6 md:p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Image src="daraz-logo.svg" width={256} height={256}
                                   alt="Daraz" className="max-w-full max-h-full object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-12 lg:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-quattrocento text-primary text-center text-3xl lg:text-4xl font-bold mb-16">
                        Categories
                    </h2>
                    <div className="relative px-8">
                        <div className="overflow-hidden">
                            <div className="flex transition-transform duration-500 ease-in-out -mx-3" ref={categorySliderRef}>
                                {categories === undefined && (
                                    <div className="px-3 text-center w-full">Loading...</div>
                                )}
                                {categories && categories.length === 0 && (
                                    <div className="px-3 text-center w-full">No categories found.</div>
                                )}
                                {Array.isArray(categories) && categories.map((cat) => (
                                    <div key={cat._id} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-3 category-card-item">
                                        <Link href={`/product?categoryId=${cat._id}`}>
                                            <div className="category-card h-[350px]" style={{backgroundImage: `url('${cat.imageUrl || "/knife-img.jpg"}')`}}>
                                                <div className="category-overlay w-full h-full flex items-center justify-center p-6">
                                                    <h3 className="font-quattrocento text-2xl lg:text-3xl font-bold text-white leading-tight text-center">{cat.name}</h3>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button ref={categoryPrevBtnRef} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-[#D6AF66] rounded-md p-3 shadow-md hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button ref={categoryNextBtnRef} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-[#D6AF66] rounded-md p-3 shadow-md hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                    {/* Explore Collection Button */}
                    <div className="text-center mt-12">
                        <Link href="/categories">
                            <button className="bg-highlight text-white px-10 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity shadow-lg">
                                Explore Collection
                            </button>
                        </Link>
                    </div>
                </div>
            </section>


            {/* New Product Slider Section */}
            <section className="min-h-96 flex flex-col justify-center py-12 lg:py-12 new-product-slider">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">

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
                                {products === undefined && (
                                    <div className="p-4 text-center w-full">Loading...</div>
                                )}
                                {products && products.length === 0 && (
                                    <div className="p-4 text-center w-full">No products found.</div>
                                )}
                                {Array.isArray(products) && products.map((p) => (
                                    <div key={p._id} className="product-card-new">
                                        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                                            <div className="relative">
                                                <Link href={`/product/${encodeURIComponent(p.sku)}`}>
                                                    <img src={p.mainImage || "/spoon-product.jpg"} width={256} height={256} alt={p.name} className="w-full h-60 object-cover"/>
                                                </Link>
                                            </div>
                                            <div className="p-5">
                                                <Link href={`/product/${encodeURIComponent(p.sku)}`} className="block">
                                                    <p className="product-name-new mb-3 h-9 line-clamp-2">{p.name}</p>
                                                </Link>
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-xl font-bold product-price-new">${p.price}</span>
                                                </div>
                                                <p className="text-sm text-[#0E0E0E] mb-2">{p.estimatedDelivery || "Estimate delivery in 2-3 working days"}</p>
                                                <Link href={`/product/${encodeURIComponent(p.sku)}`}>
                                                    <button className="cta-button-new w-full py-2 rounded-md font-medium">Order Now</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                Wazir Cutlery – Forged in Tradition, Sharpened for the Future
                            </h3>
                            <p className="font-body font-normal text-base lg:text-lg  leading-relaxed">
                                Wazir Cutlery – Forged in Tradition, Sharpened for the Future
                                Nestled in the heart of Wazirabad, the historic city known as the “City of Cutlery”,
                                Wazir Cutlery has been crafting excellence for over 5 years. Our journey began with a simple mission — to
                                bring Pakistan’s rich cutlery heritage to the global stage through uncompromising quality,
                                timeless design, and passionate craftsmanship.
                            </p>
                            <p className="font-normal text-base lg:text-lg  leading-relaxed">
                                At Wazir Cutlery, every blade tells a story. From professional chef knives and elegant dining sets
                                to exquisite collector swords, we fuse traditional forging techniques with modern aesthetics.
                                Our artisans, trained in generations-old craftsmanship, forge each product with precision, strength,
                                and a commitment to beauty.
                            </p>
                            <p className="font-normal text-base lg:text-lg  leading-relaxed">
                                What started in a small workshop in Wazirabad is now a name recognized by chefs, collectors,
                                and cutlery connoisseurs across borders. Whether you’re slicing in the kitchen, gifting elegance,
                                or adding to your collection, Wazir Cutlery delivers a cut above the rest.
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

            <TestimonialScroller />

            <section className="py-8">
                <div className="container mx-auto px-4">
                    <ContactForm />
                </div>
            </section>
        </>
    );
}
