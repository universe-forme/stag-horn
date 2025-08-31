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
                    style={{objectFit: 'cover'}}
                    className="opacity-100"
                />
            </div>

            <div className="relative max-w-7xl mx-auto z-10 py-16 px-4">
                <div className="text-center mt-24 mb-12">
                    <h2 className="mb-8">Stainless Steel Dinner Spoon – Satin Finish</h2>
                </div>
                <div className="flex justify-center mb-8 lg:mb-12">
                    <div className="flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                        <Image src="/product.jpg" alt={"Stainless Steel Dinner Spoon - Satin Finish"} width={256} height={256} id="mainImage"
                             className="max-w-full h-auto object-contain"/>
                    </div>
                </div>

                <div className="text-center max-w-7xl px-6 mx-auto">
                    <h3 className="other-heading font-medium text-heading-lg mb-6">
                        Stag Horn Cutlery – Forged in Tradition, Sharpened for the Future
                    </h3>
                    <p className="font-body font-normal text-base lg:text-lg  leading-relaxed">
                        Stag Horn Cutlery – Forged in Tradition, Sharpened for the Future Nestled in the heart of
                        Wazirabad,
                        the historic city known as the “City of Cutlery”, Stag Horn Cutlery has been crafting excellence
                        for
                        over 5 years. Our journey began with a simple mission — to bring Pakistan’s rich cutlery
                        heritage to
                        the global stage through uncompromising quality, timeless design, and passionate craftsmanship.
                        At Stag Horn Cutlery, every blade tells a story. From professional chef knives and elegant
                        dining sets
                        to exquisite collector swords, we fuse traditional forging techniques with modern aesthetics.
                        Our artisans, trained in generations-old craftsmanship, forge each product with precision,
                        strength, and a commitment to beauty. What started in a small workshop in Wazirabad is now a
                        name
                        recognized by chefs, collectors, and cutlery connoisseurs across borders. Whether you’re slicing
                        in the kitchen,
                        gifting elegance, or adding to your collection, Stag Horn Cutlery delivers a cut above the rest.
                    </p>
                    <strong className="text-base lg:text-lg leading-relaxed">Because here, it’s not just metal — it’s
                        mastery in your hands.</strong>
                </div>
            </div>
        </div>
    );
}
export default ProductPage;