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
                    <div className="relative flex justify-center md:justify-end">
                        <button ref={buttonRef} className="filter-button bg-[#F9F9F6] rounded-lg shadow-xl w-full md:w-auto" onClick={toggleMenu}>
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/knife-img.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Knife</h3>
                            </div>
                        </div>

                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/spear.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Spear</h3>
                            </div>
                        </div>

                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/axe.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Axe</h3>
                            </div>
                        </div>

                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/sword-img.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Sword</h3>
                            </div>
                        </div>

                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/ball.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Ball</h3>
                            </div>
                        </div>

                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/spike.png')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Spike</h3>
                            </div>
                        </div>

                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/mace-ball.png')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Mace Ball</h3>
                            </div>
                        </div>

                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/dagger.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Dagger</h3>
                            </div>
                        </div>

                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/hammer.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Hammer</h3>
                            </div>
                        </div>

                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/razor.png')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Razor</h3>
                            </div>
                        </div>

                        <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: "url('/knuckle-brass.jpg')"}}>
                            <div className="category-overlay w-full h-full flex items-center justify-center">
                                <h3 className="category-title px-4">Knuckle Brass</h3>
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
