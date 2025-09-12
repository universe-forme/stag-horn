'use client';
import Image from 'next/image';
import React from "react";
import ConditionalLayout from "../../components/ConditionalLayout";
import ContactForm from "../../components/ContactForm";

const AboutPage = () => {
    return (
        <ConditionalLayout>
            <AboutContent />
        </ConditionalLayout>
    );
};

const AboutContent = () => {
    return (
        <div className="bg-white overflow-x-hidden">
            {/* About Us Section */}
            <section className="flex flex-col items-center justify-center gap-8 lg:gap-16 px-4 py-8 lg:py-16 animate-fade-in">
                <header className="text-center">
                    <h1 className="font-outfit font-medium text-4xl lg:text-6xl text-black leading-tight">
                        About Us
                    </h1>
                </header>

                <div className="flex flex-col items-center justify-center gap-4 max-w-6xl mx-auto">
                    <h2 className="font-cabin font-medium text-2xl lg:text-4xl xl:text-5xl text-black text-center leading-tight px-4">
                        Wazir Cutlery – Forged in Tradition, Sharpened for the Future
                    </h2>

                    <div className="text-center font-outfit text-black max-w-5xl px-4">
                        <p className="text-lg lg:text-xl mb-4 leading-relaxed">
                            Nestled in the heart of Wazirabad, the historic city known as the &quot;City of Cutlery&quot;, Wazir Cutlery has been crafting excellence for over 5 years. Our journey began with a simple mission — to bring Pakistan&apos;s rich cutlery heritage to the global stage through uncompromising quality, timeless design, and passionate craftsmanship.
                        </p>

                        <p className="text-lg lg:text-xl mb-4 leading-relaxed">
                            At Wazir Cutlery, every blade tells a story. From professional chef knives, and elegant dining sets to exquisite collector swords, we fuse traditional forging techniques with modern aesthetics. Our artisans, trained in generations-old craftsmanship, forge each product with precision, strength, and a commitment to beauty.
                        </p>

                        <p className="text-lg lg:text-xl mb-6 leading-relaxed">
                            What started in a small workshop in Wazirabad is now a name recognized by chefs, collectors, and cutlery connoisseurs across borders. Whether you&apos;re slicing in the kitchen, gifting elegance, or adding to your collection, Wazir Cutlery delivers a cut above the rest.
                        </p>

                        <p className="font-semibold text-lg lg:text-xl">
                            Because here, it&apos;s not just metal — it&apos;s mastery in your hands.
                        </p>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center gap-8 lg:gap-12 px-4 py-8 lg:py-16 max-w-7xl mx-auto animate-fade-up">
                {/* Centered Header */}
                <header className="flex flex-col items-center justify-center gap-4 text-center max-w-4xl">
                    <h3 className="font-outfit font-normal text-orange-600 text-lg lg:text-xl">
                        Wazir Cutlery
                    </h3>

                    <p className="font-outfit font-normal text-2xl lg:text-3xl xl:text-4xl leading-tight">
                        <span className="text-black">Looking for Powerful </span>
                        <span className="font-semibold text-orange-600">Blades and Unmatched Craftsmanship?</span>
                        <span className="text-black"> It&apos;s Time to Choose Wazir Cutlery.</span>
                    </p>
                </header>

                {/* Cards Layout */}
                <div className="w-full max-w-6xl">
                    {/* Mission and Vision Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <article className="flex flex-col items-center gap-6 p-6 lg:p-8 bg-white rounded-3xl border border-gray-200 shadow-custom hover-lift">
                            <h4 className="font-outfit font-semibold text-orange-600 text-2xl lg:text-3xl text-center">
                                Our Mission
                            </h4>
                            <p className="font-outfit font-normal text-black text-lg text-center leading-relaxed">
                                To craft blades and tools that combine strength, precision, and artistry, empowering warriors, collectors, and adventurers with unmatched quality and timeless designs.
                            </p>
                        </article>

                        <article className="flex flex-col items-center gap-6 p-6 lg:p-8 bg-white rounded-3xl border border-gray-200 shadow-custom hover-lift">
                            <h4 className="font-outfit font-semibold text-orange-600 text-2xl lg:text-3xl text-center">
                                Our Vision
                            </h4>
                            <p className="font-outfit font-normal text-black text-lg text-center leading-relaxed">
                                To become the world&apos;s most trusted name in premium cutlery and battle gear, where tradition meets innovation, and every blade tells a story of power and legacy.
                            </p>
                        </article>
                    </div>

                    {/* Purpose Card Centered */}
                    <div className="flex justify-center">
                        <article className="flex flex-col items-center gap-6 p-6 lg:p-8 bg-white rounded-3xl border border-gray-200 shadow-custom hover-lift max-w-2xl w-full">
                            <h4 className="font-outfit font-semibold text-orange-600 text-2xl lg:text-3xl text-center">
                                Our Purpose
                            </h4>
                            <p className="font-outfit font-normal text-black text-lg text-center leading-relaxed">
                                To preserve the ancient craft of blade-making, while delivering modern, durable, and inspiring weapons that serve as both functional tools and symbols of honor.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Detail Section */}
            <section className="flex flex-col lg:flex-row gap-6 px-4 py-8 lg:py-16 max-w-7xl mx-auto animate-fade-up">
                <div className="flex flex-col gap-6 w-full lg:w-1/2">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-cabin font-medium text-3xl lg:text-4xl text-gray-800 leading-tight">
                            Crafted by Hand. Forged by Fire.
                        </h2>
                        <p className="font-outfit font-normal text-black text-lg leading-relaxed">
                            Our cutlery is the result of time-honored techniques, artisan attention, and select materials. Each blade passes through 12+ stages — from forging, grinding, and polishing to precise finishing by hand.
                            <br /><br />
                            We use only high-carbon steel, Damascus layers, and handle materials like rosewood, ebony, and buffalo horn. Every product reflects our commitment to strength, balance, and beauty.
                        </p>

                        <h3 className="font-medium text-gray-800 text-2xl mt-4">
                            Trusted Across Borders
                        </h3>

                        <p className="font-outfit font-normal text-gray-700 text-lg leading-relaxed">
                            Over 10,000 blades shipped globally. Customers in {" "}
                            <span className="font-bold">UAE</span>, {" "}
                            <span className="font-bold">USA</span>, {" "}
                            <span className="font-bold">UK</span>, {" "}
                            <span className="font-bold">KSA</span>. {" "}
                            Used by top chefs, collectors, and gifting brands worldwide.
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 h-64 lg:h-96 relative rounded-3xl overflow-hidden">
                    <Image
                        src="/forging-work.jpg"
                        alt="Craftsmanship in Action"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-3xl"
                        priority
                    />
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="flex flex-col lg:flex-row items-start justify-center gap-6 px-4 py-8 lg:py-16 max-w-7xl mx-auto animate-fade-up">
                <div className="flex flex-col gap-6 w-full lg:w-2/5">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-cabin font-medium text-2xl lg:text-3xl text-gray-800 leading-normal">
                            What Our Warriors & Collectors Say About Us
                        </h2>
                        <p className="font-outfit font-normal text-gray-600 text-lg leading-relaxed">
                            Trusted by warriors, collectors, and adventurers worldwide — hear their real experiences with our blades, tools, and timeless craftsmanship.
                        </p>
                    </div>

                    <button className="inline-flex h-12 lg:h-14 items-center justify-center gap-2 px-6 lg:px-8 py-3 bg-orange-600 text-white rounded-xl font-outfit text-lg btn-primary self-start hover:bg-orange-500 transition-all duration-300">
                        Join Now
                    </button>
                </div>

                <div className="w-full lg:w-3/5 space-y-4">
                    {/* Testimonial Cards */}
                    <article className="flex items-start gap-4 lg:gap-6 p-4 lg:p-6 bg-white rounded-lg border border-gray-200 hover-lift">
                        <div className="w-3 bg-gray-200 rounded-lg flex-shrink-0 self-stretch"></div>
                        <div className="w-16 h-16 lg:w-20 lg:h-20 relative flex-shrink-0">
                            <Image
                                src="/ali.svg"
                                alt="Ali"
                                fill
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-grow relative">
                            <div className="absolute right-0 -top-1">
                                <Image
                                    src="/quotes.svg"
                                    alt="5 star rating"
                                    width={90}
                                    height={16}
                                    className="h-4 w-auto"
                                    priority
                                />
                            </div>
                            <h3 className="font-outfit font-bold text-gray-800 text-xl lg:text-2xl mt-4">
                                Ali
                            </h3>
                            <blockquote className="font-outfit font-normal text-gray-600 text-sm lg:text-base">
                                &quot;Wazir cutlery&apos;s blades combine strength, precision, and beautiful craftsmanship. Every piece tells a story of quality and tradition.&quot;
                            </blockquote>
                        </div>
                    </article>

                    <article className="flex items-start gap-4 lg:gap-6 p-4 lg:p-6 bg-white rounded-lg border border-gray-200 hover-lift ml-8 lg:ml-12">
                        <div className="w-3 bg-orange-600 rounded-lg flex-shrink-0 self-stretch"></div>
                        <div className="w-16 h-16 lg:w-20 lg:h-20 relative flex-shrink-0">
                            <Image
                                src="/m-rafy.svg"
                                alt="M Rafy"
                                fill
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-grow relative">
                            <div className="absolute right-0 -top-1">
                                <Image
                                    src="/quotes.svg"
                                    alt="5 star rating"
                                    width={90}
                                    height={16}
                                    className="h-4 w-auto"
                                    priority
                                />
                            </div>
                            <h3 className="font-outfit font-bold text-gray-800 text-xl lg:text-2xl mt-4">
                                M Rafy
                            </h3>
                            <blockquote className="font-outfit font-normal text-gray-600 text-sm lg:text-base">
                                &quot;Outstanding quality and exceptional service. These blades are not just tools, they&apos;re works of art that perform flawlessly.&quot;
                            </blockquote>
                        </div>
                    </article>

                    <article className="flex items-start gap-4 lg:gap-6 p-4 lg:p-6 bg-white rounded-lg border border-gray-200 hover-lift">
                        <div className="w-3 bg-gray-200 rounded-lg flex-shrink-0 self-stretch"></div>
                        <div className="w-16 h-16 lg:w-20 lg:h-20 relative flex-shrink-0">
                            <Image
                                src="/zain.svg"
                                alt="Zain"
                                fill
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-grow relative">
                            <div className="absolute right-0 -top-1">
                                <Image
                                    src="/quotes.svg"
                                    alt="5 star rating"
                                    width={90}
                                    height={16}
                                    className="h-4 w-auto"
                                    priority
                                />
                            </div>
                            <h3 className="font-outfit font-bold text-gray-800 text-xl lg:text-2xl mt-4">
                                Zain
                            </h3>
                            <blockquote className="font-outfit font-normal text-gray-600 text-sm lg:text-base">
                                &quot;The craftsmanship is incredible. Each blade feels perfectly balanced and the attention to detail is remarkable. Highly recommended!&quot;
                            </blockquote>
                        </div>
                    </article>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <ContactForm />
                </div>
            </section>

            <style jsx global>{`
                .hover-lift {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }
                
                .btn-primary:hover {
                    background-color: rgba(242, 127, 12, 0.9);
                    transform: translateY(-2px);
                    transition: all 0.3s ease;
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease forwards;
                }
                
                .animate-fade-up {
                    animation: fade-up 1s ease forwards;
                }
                
                @keyframes fade-in {
                    0% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: none;
                    }
                }
                
                @keyframes fade-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: none;
                    }
                }
                
                .shadow-custom {
                    box-shadow: 0px 0px 34px rgba(0, 0, 0, 0.06);
                }
            `}</style>
        </div>
    );
};

export default AboutPage;

//hello
