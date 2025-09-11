'use client';
import Image from 'next/image';
import React from "react";
import Link from 'next/link';
import ConditionalLayout from "../../components/ConditionalLayout";
import { useActiveProducts, useProductsByCategory } from "../../lib/hooks";
import { useSearchParams, useRouter } from 'next/navigation';

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
    const dataset = categoryId ? productsByCategory : allProducts;
    const total = Array.isArray(dataset) ? dataset.length : 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageItems = Array.isArray(dataset) ? dataset.slice(start, end) : [];

    const goToPage = (p) => {
        const next = Math.min(Math.max(1, p), totalPages);
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(next));
        router.push(`/product?${params.toString()}`);
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

            <div className="max-w-7xl mx-auto relative z-10 py-20 px-4">
                <div className="text-center mt-24 mb-24">
                    <h1 className="mb-8">Luxury Flatware & Dining Sets</h1>
                </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                        {dataset === undefined && (
                            <div className="col-span-full text-center">Loading...</div>
                        )}
                        {Array.isArray(pageItems) && pageItems.map((p) => (
                            <div key={p._id} className="product-card-new">
                                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                                    <div className="relative">
                                        <Link href={`/product/${encodeURIComponent(p.sku)}`}>
                                            <Image src={p.mainImage || "/spoon-product.jpg"} width={256} height={256} alt={p.name} className="w-full h-60 object-cover"/>
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

                <div className="flex justify-center mt-12 space-x-2">
                    <button onClick={() => goToPage(page - 1)} disabled={page <= 1} className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-400 hover:border-yellow-600 hover:text-yellow-600 transition-colors disabled:opacity-50">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    {[...Array(Math.max(1, Math.min(totalPages, 3))).keys()].map((i) => {
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
}
export default ProductPage;