'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const CategoriesPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="diagonal-bg min-h-screen relative overflow-hidden">
            {/* Background Overlay Image */}
            <div className="absolute top-0 left-0 w-1/3 h-2/3 hidden lg:block z-0 pointer-events-none">
                <Image
                    src="/Rectangle.png"
                    alt="Background Overlay"
                    fill
                    style={{ objectFit: 'contain' }}
                    className="opacity-100"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 py-16 px-4">
                <div className="text-center mt-24 mb-12">
                    <h2 className="mb-8">Categories</h2>
                    <div className="flex justify-end relative">
                        <button ref={buttonRef} className="filter-button bg-[#F9F9F6] rounded-lg shadow-xl" onClick={toggleMenu}>
                            <div className="flex items-center gap-2">
                                <Image src="/filter-icon.svg" alt={"Filter Icon"} width={16} height={16} />
                                <span>Filter</span>
                            </div>
                            <svg className={`filter-arrow-icon ${isMenuOpen ? 'rotated' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <div ref={menuRef} className={`filter-dropdown-menu mobile-menu ${isMenuOpen ? '' : 'hidden'}`}>
                            <a href="#" className="filter-dropdown-item">Category 1</a>
                            <a href="#" className="filter-dropdown-item">Category 2</a>
                            <a href="#" className="filter-dropdown-item">Category 3</a>
                            <a href="#" className="filter-dropdown-item">Category 4</a>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/dinner-set-img.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Luxury Flatware & Dining Sets</h3>
                            </div>
                        </div>

                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/tools-img.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Hand-Forged or Custom-Made Tools</h3>
                            </div>
                        </div>

                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/sword-img.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Collectible & Decorative Swords</h3>
                            </div>
                        </div>

                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/knife-img.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Premium Kitchen Knives</h3>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/chef-knife.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Chef Knives</h3>
                            </div>
                        </div>

                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/butcher-tool.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Butcher Tools</h3>
                            </div>
                        </div>

                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/flatware-set.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Luxury Flatware Sets</h3>
                            </div>
                        </div>

                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/katakana.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Swords & Katakana</h3>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/survival-knives.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Camping & Survival Knives</h3>
                            </div>
                        </div>

                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/custom-knives.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Hand-Forged Custom Knives</h3>
                            </div>
                        </div>

                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/flatware.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Flatware</h3>
                            </div>
                        </div>

                        <div className="category-card h-96 flex items-center justify-center" style={{backgroundImage: "url('/serving-cutlery.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Serving Cutlery</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-12 space-x-2">
                    <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-400 hover:border-yellow-600 hover:text-yellow-600 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:border-yellow-600 hover:text-yellow-600 transition-colors">1</button>
                    <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:border-yellow-600 hover:text-yellow-600 transition-colors">2</button>
                    <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:border-yellow-600 hover:text-yellow-600 transition-colors">3</button>
                    <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                    <button className="w-10 h-10 rounded-lg bg-yellow-600 text-white flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;
