'use client';
import Image from 'next/image';
import React from "react";
import ConditionalLayout from "../../components/ConditionalLayout";

const AboutPage = () => {
    return (
        <ConditionalLayout>
            <AboutContent />
        </ConditionalLayout>
    );
};

const AboutContent = () => {
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

            <div className="relative max-w-7xl mx-auto z-10 py-16 px-4">
                <div className="text-center mt-24 mb-12">
                    <h2 className="mb-8">About Us</h2>
                </div>
                <div className="text-center max-w-7xl px-6 mx-auto">
                    <h3 className="other-heading font-medium text-heading-lg mb-6">
                        Stag Horn Cutlery – Forged in Tradition, Sharpened for the Future
                    </h3>
                    <p className="font-body font-normal text-base lg:text-lg  leading-relaxed">
                        Stag Horn Cutlery – Forged in Tradition, Sharpened for the Future Nestled in the heart of Wazirabad,
                        the historic city known as the “City of Cutlery”, Stag Horn Cutlery has been crafting excellence for
                        over 5 years. Our journey began with a simple mission — to bring Pakistan’s rich cutlery heritage to
                        the global stage through uncompromising quality, timeless design, and passionate craftsmanship.
                        At Stag Horn Cutlery, every blade tells a story. From professional chef knives and elegant dining sets
                        to exquisite collector swords, we fuse traditional forging techniques with modern aesthetics.
                        Our artisans, trained in generations-old craftsmanship, forge each product with precision,
                        strength, and a commitment to beauty. What started in a small workshop in Wazirabad is now a name
                        recognized by chefs, collectors, and cutlery connoisseurs across borders. Whether you’re slicing in the kitchen,
                        gifting elegance, or adding to your collection, Stag Horn Cutlery delivers a cut above the rest.
                    </p>
                    <strong className="text-base lg:text-lg leading-relaxed">Because here, it’s not just metal — it’s mastery in your hands.</strong>
                </div>
                <div className="text-center py-16 max-w-7xl px-6 mx-auto">
                    <div className="relative">
                        <Image
                            src="/factory-img.jpg"
                            width={256}
                            height={34}
                            alt="About"
                            className="w-full h-98 object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="bg-[#D6AF66] w-28 h-28 rounded-full flex items-center justify-center">
                                <Image src="/play-icon.svg" width={56} height={56} alt="Play" className="w-8 h-8 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="py-16 max-w-7xl px-6 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
                        <div className="order-1 lg:order-1">
                            <h3 className="other-heading font-medium text-heading-lg mb-6">
                                Crafted by Hand. Forged by Fire.
                            </h3>
                            <p className="font-body font-normal text-base lg:text-lg leading-relaxed">
                                Our cutlery is the result of time-honored techniques, artisan attention, and select materials.
                                Each blade passes through 12+ stages — from forging, grinding, and polishing to precise finishing by hand.
                            </p>
                            <p className="font-normal text-base lg:text-lg mb-4 leading-relaxed">
                                We use only high-carbon steel, Damascus layers, and handle materials like rosewood, ebony,
                                and buffalo horn. Every product reflects our commitment to strength, balance, and beauty.
                            </p>
                            <h4 className="trust-title font-medium text-heading-lg mb-4">Trusted Across Borders</h4>
                            <p className="font-normal text-base lg:text-lg leading-relaxed">
                                Over 10,000 blades shipped globally. Customers in <strong>UAE</strong>, <strong>USA</strong>, <strong>UK</strong>, <strong>KSA</strong>.
                                Used by top chefs, collectors, and gifting brands worldwide.
                            </p>
                        </div>

                        <div className="order-2 lg:order-2 h-full">
                            <div className="relative h-full">
                                <Image
                                    src="/forging-work.jpg"
                                    width={256}
                                    height={256}
                                    alt="About"
                                    className="w-full h-full rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Masters of the Blade Section */}
                <div className="px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="mb-16">Our Masters of the Blade</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                            {/* Master 1 */}
                            <div className="text-center">
                                <div className="master-card mb-6">
                                    <div className="master-image">
                                        <div className="placeholder-icon"></div>
                                    </div>
                                </div>
                                <h3 className="master-name">Name</h3>
                                <p className="master-title">title</p>
                            </div>

                            {/* Master 2 */}
                            <div className="text-center">
                                <div className="master-card mb-6">
                                    <div className="master-image">
                                        <div className="placeholder-icon"></div>
                                    </div>
                                </div>
                                <h3 className="master-name">Name</h3>
                                <p className="master-title">title</p>
                            </div>
                        </div>

                        <div className="legacy-section">
                            <p className="legacy-text">
                                At Stag Horn Cutlery, we don&apos;t just make knives — we preserve a legacy. A legacy you can hold.
                            </p>
                            <a href="#" className="cta-button">Shop The Collection</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutPage;