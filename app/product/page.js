'use client';
import Image from 'next/image';
import React from "react";
import ConditionalLayout from "../../components/ConditionalLayout";

const ProductPage = () => {
    return (
        <ConditionalLayout>
            <ProductContent />
        </ConditionalLayout>
    );
};

const ProductContent = () => {
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
        // <div className="diagonal-bg min-h-screen relative overflow-hidden">
        //     {/* Background Overlay Image */}
        //     <div className="absolute top-0 left-0 w-1/3 h-2/3 hidden lg:block z-0 pointer-events-none">
        //         <Image
        //             src="/Rectangle.png"
        //             alt="Background Overlay"
        //             fill
        //             style={{objectFit: 'cover'}}
        //             className="opacity-100"
        //         />
        //     </div>
        //
        //     <div className="relative max-w-7xl mx-auto z-10 py-16 px-4">
        //         <div className="text-center mt-24 mb-12">
        //             <h2 className="mb-8">Stainless Steel Dinner Spoon – Satin Finish</h2>
        //         </div>
        //         <div className="flex justify-center mb-8 lg:mb-12">
        //             <div className="flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
        //                 <Image src="/product.jpg" alt={"Stainless Steel Dinner Spoon - Satin Finish"} width={256} height={256} id="mainImage"
        //                      className="max-w-full h-auto object-contain"/>
        //             </div>
        //         </div>
        //
        //         <div className="text-center max-w-7xl px-6 mx-auto">
        //             <h3 className="other-heading font-medium text-heading-lg mb-6">
        //                 Stag Horn Cutlery – Forged in Tradition, Sharpened for the Future
        //             </h3>
        //             <p className="font-body font-normal text-base lg:text-lg  leading-relaxed">
        //                 Stag Horn Cutlery – Forged in Tradition, Sharpened for the Future Nestled in the heart of
        //                 Wazirabad,
        //                 the historic city known as the “City of Cutlery”, Stag Horn Cutlery has been crafting excellence
        //                 for
        //                 over 5 years. Our journey began with a simple mission — to bring Pakistan’s rich cutlery
        //                 heritage to
        //                 the global stage through uncompromising quality, timeless design, and passionate craftsmanship.
        //                 At Stag Horn Cutlery, every blade tells a story. From professional chef knives and elegant
        //                 dining sets
        //                 to exquisite collector swords, we fuse traditional forging techniques with modern aesthetics.
        //                 Our artisans, trained in generations-old craftsmanship, forge each product with precision,
        //                 strength, and a commitment to beauty. What started in a small workshop in Wazirabad is now a
        //                 name
        //                 recognized by chefs, collectors, and cutlery connoisseurs across borders. Whether you’re slicing
        //                 in the kitchen,
        //                 gifting elegance, or adding to your collection, Stag Horn Cutlery delivers a cut above the rest.
        //             </p>
        //             <strong className="text-base lg:text-lg leading-relaxed">Because here, it’s not just metal — it’s
        //                 mastery in your hands.</strong>
        //         </div>
        //     </div>
        // </div>
    );
}
export default ProductPage;