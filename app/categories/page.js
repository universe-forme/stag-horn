'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCategoriesWithProductCounts } from "../../lib/hooks";
import ConditionalLayout from "../../components/ConditionalLayout";
import { useRouter, useSearchParams } from 'next/navigation';

const CategoriesPage = () => {
    return (
        <ConditionalLayout>
            <CategoriesContent />
        </ConditionalLayout>
    );
};

const CategoriesContent = () => {
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

    const { data: categories } = useCategoriesWithProductCounts();
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const pageSize = 12;
    const total = Array.isArray(categories) ? categories.length : 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageItems = Array.isArray(categories) ? categories.slice(start, end) : [];

    const goToPage = (p) => {
        const next = Math.min(Math.max(1, p), totalPages);
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(next));
        router.push(`/categories?${params.toString()}`);
    };

    return (
        <div className="diagonal-bg min-h-screen relative overflow-hidden">
            {/* Background Overlay Image */}
            <div className="absolute top-0 left-0 w-1/3 h-2/3 hidden lg:block z-0 pointer-events-none">
                <Image
                    src="/Rectangle.png"
                    alt="Background Overlay"
                    fill
                    style={{ objectFit: 'cover' }}
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
                            {categories === undefined && (
                                <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                            )}
                            {Array.isArray(categories) && categories.map((c) => (
                                <a key={c._id} href="#" className="filter-dropdown-item">{c.name}</a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                        {categories === undefined && (
                            <div className="col-span-full text-center">Loading categories...</div>
                        )}
                        {Array.isArray(pageItems) && pageItems.map((cat) => (
                            <Link key={cat.id} href={`/product?categoryId=${encodeURIComponent(cat.id)}`}>
                                <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: `url('${cat.image_url || "/knife-img.jpg"}')`}}>
                                    <div className="category-overlay w-full h-full flex items-center justify-center">
                                        <h3 className="category-title px-4">{cat.name}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-12 space-x-2">
                    <button onClick={() => goToPage(page - 1)} disabled={page <= 1} className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-400 hover:border-yellow-600 hover:text-yellow-600 transition-colors disabled:opacity-50">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    {[...Array(Math.min(totalPages, 3)).keys()].map((i) => {
                        const num = i + 1;
                        const isActive = num === page;
                        return (
                            <button key={num} onClick={() => goToPage(num)} className={`w-10 h-10 flex items-center justify-center ${isActive ? 'text-yellow-600' : 'text-gray-600'} hover:border-yellow-600 hover:text-yellow-600 transition-colors`}>
                                {num}
                            </button>
                        );
                    })}
                    {totalPages > 3 && <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>}
                    <button onClick={() => goToPage(page + 1)} disabled={page >= totalPages} className="w-10 h-10 rounded-lg bg-yellow-600 text-white flex items-center justify-center disabled:opacity-50">
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
