'use client';
import Image from 'next/image';
import React from "react";
import Link from 'next/link';
import ConditionalLayout from "../../components/ConditionalLayout";
import { useActiveProducts, useProductsByCategory, useCategoriesWithProductCounts } from "../../lib/hooks";
import { useSearchParams, useRouter } from 'next/navigation';
import Newsletter from "@/components/Newsletter";

const ProductPage = () => {
    return (
        <ConditionalLayout>
            <ProductContent />
        </ConditionalLayout>
    );
};

const ProductContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryId = searchParams.get('categoryId');
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const pageSize = 12;

    const { data: allProducts } = useActiveProducts();
    const { data: productsByCategory } = useProductsByCategory(categoryId);
    const { data: categories } = useCategoriesWithProductCounts();

    const getCategoryName = (id) => {
        if (!categories || !id) {
            return "All Products";
        }
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : "All Products";
    };

    const categoryName = getCategoryName(categoryId);

    const dataset = categoryId ? productsByCategory : allProducts;
    const total = Array.isArray(dataset) ? dataset.length : 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageItems = Array.isArray(dataset) ? dataset.slice(start, end) : [];


    return (
        <>
        <div className="min-h-screen relative overflow-hidden">
            <div className="container mx-auto relative z-10 py-20 px-4">
                <div className="text-center mt-24 mb-24">
                    <h1 className="mb-8 capitalize">{categoryName}</h1>

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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
                    {dataset === undefined && (
                        <div className="col-span-full text-center">Loading...</div>
                    )}
                    {Array.isArray(pageItems) && pageItems.map((p) => (
                        <Link key={p._id} href={`/product/${encodeURIComponent(p.sku)}`} className="cursor-pointer">
                            <div className="card-border p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                                <div className="relative mb-4">
                                    {/* Example badge, adjust logic as needed */}
                                    {p.is_best_selling && (
                                        <span className="best-sale-badge absolute top-2 right-2 z-10">Best Sale</span>
                                    )}
                                    <div className="aspect-square rounded-lg flex items-center justify-center overflow-hidden">
                                        <Image src={p.main_image || '/product.jpg'} width={250} height={250} alt={p.name} className="w-full h-full object-contain" />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <p className="product-name-new mb-3 h-10 line-clamp-2 font-semibold text-lg">{p.name}</p>
                                    <span className="text-xl font-bold product-price-new mb-2">${p.price}</span>
                                    <p className="text-sm text-[#0E0E0E] mb-2">{p.estimatedDelivery || "Estimate delivery in 2-3 working days"}</p>
                                    <button className="cta-button-new w-full py-2 rounded-md font-medium mt-2">Add To Cart</button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="items-center justify-center flex">
                    <button className="cta-button py-2 rounded-md font-medium">Load more</button>
                </div>
            </div>
        </div>
        <Newsletter />
        </>
    );
}
export default ProductPage;