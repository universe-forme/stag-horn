'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';

const RelatedProducts = ({ products }) => {
    const { addToCart } = useCart();

    if (!products || products.length === 0) {
        return null;
    }

    const handleAddToCart = (product, e) => {
        e.preventDefault(); // Prevent navigation to product page
        e.stopPropagation();
        addToCart(product, 1);
        toast.success(`${product.name} added to cart!`, {
            position: "top-right",
            autoClose: 3000,
        });
    };

    return (
        <section className="flex flex-col gap-8">
            <div className="flex items-center gap-6">
                <h2 className="font-outfit font-medium text-black text-xl md:text-[28px]">Related Products</h2>
                <div className="flex-1 h-px bg-sub-texts-mute-lable"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
                {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.sku}`} className="cursor-pointer">
                        <div className="card-border p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                            <div className="relative mb-4">
                                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                                    {(() => {
                                        const badges = [];
                                        if (product.is_best_selling) badges.push('Best Selling');
                                        if (product.is_featured) badges.push('Featured');
                                        if (product.is_trending || product.is_top_rated) badges.push('Trending');
                                        
                                        return badges.slice(0, 2).map((badge, index) => (
                                            <span key={index} className="best-sale-badge text-xs px-2 py-1">
                                                {badge}
                                            </span>
                                        ));
                                    })()}
                                </div>
                                <div className="aspect-square rounded-lg flex items-center justify-center overflow-hidden">
                                    <Image 
                                        src={product.main_image || '/product.jpg'} 
                                        alt={product.name} 
                                        width={250} 
                                        height={250} 
                                        className="w-full h-full object-contain" 
                                    />
                                </div>
                            </div>

                            <h3 className="outfit-font product-title mb-3 capitalize">{product.name}</h3>

                            <div className="flex items-center mb-3">
                                <div className="flex star-rating">
                                    {'★'.repeat(Math.floor(product.rating || 0))}
                                    {'☆'.repeat(5 - Math.floor(product.rating || 0))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                <span className="outfit-font sale-price">${product.price}</span>
                                {product.compare_price && (
                                    <span className="outfit-font normal-price">${product.compare_price}</span>
                                )}
                            </div>

                            <p className="outfit-font delivery-text mb-4 flex-grow">
                                {product.estimated_delivery || 'Estimate delivery in 2-3 working days'}
                            </p>

                            <div className="flex gap-2 mt-2">
                                <button 
                                    className="flex-1 bg-main-primary-buttons text-white py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors cursor-pointer"
                                    onClick={(e) => handleAddToCart(product, e)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RelatedProducts;
