'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCategoriesWithProductCounts } from "../../lib/hooks";
import ConditionalLayout from "../../components/ConditionalLayout";
import { useRouter, useSearchParams } from 'next/navigation';
import Newsletter from "@/components/Newsletter";

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
        <>
        <div className="min-h-screen relative overflow-hidden py-12 lg:py-20">
            <div className="container mx-auto">
                <div className="text-center mt-24 mb-24">
                    <h2 className="mb-8">Categories</h2>
                    {/*<div className="relative flex justify-center md:justify-end">*/}
                    {/*    <button ref={buttonRef} className="filter-button bg-[#F9F9F6] rounded-lg shadow-xl w-full md:w-auto" onClick={toggleMenu}>*/}
                    {/*        <div className="flex items-center gap-2">*/}
                    {/*            <Image src="/filter-icon.svg" alt={"Filter Icon"} width={16} height={16} />*/}
                    {/*            <span>Filter</span>*/}
                    {/*        </div>*/}
                    {/*        <svg className={`filter-arrow-icon ${isMenuOpen ? 'rotated' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
                    {/*        </svg>*/}
                    {/*    </button>*/}
                    {/*    <div ref={menuRef} className={`filter-dropdown-menu mobile-menu ${isMenuOpen ? '' : 'hidden'}`}>*/}
                    {/*        {categories === undefined && (*/}
                    {/*            <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>*/}
                    {/*        )}*/}
                    {/*        {Array.isArray(categories) && categories.map((c) => (*/}
                    {/*            <a key={c._id} href="#" className="filter-dropdown-item">{c.name}</a>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                        {categories === undefined && (
                            <div className="col-span-full text-center">Loading categories...</div>
                        )}
                        {Array.isArray(pageItems) && pageItems.map((cat) => (
                            <Link key={cat.id} href={`/product?categoryId=${encodeURIComponent(cat.id)}`}>
                                <div className="category-card h-72 md:h-96 flex items-center justify-center" style={{backgroundImage: `url('${cat.image_url || "/knife-img.jpg"}')`}}>
                                    <div className="category-overlay w-full h-full flex items-center justify-center">
                                        <h3 className="category-title px-4 capitalize">{cat.name}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>

            <Newsletter />
            </>
    );
};

export default CategoriesPage;
