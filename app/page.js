import Image from "next/image";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="min-h-screen p-12 flex items-center justify-center lg:justify-start relative overflow-hidden">
                {/* Background Image (Right Side) - Hidden on smaller screens */}
                <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full hidden lg:block">
                    <div className="relative w-full h-full">
                        <Image src="/heroSection-Img.svg" width={1920} height={1080}
                               alt="Elegant dining setup"
                                />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 w-full">
                    <div className="container mx-auto px-6 pt-32 lg:pt-24 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="space-y-4 text-center lg:text-left md:pt-12">
                                <h1 className="text-primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                                    Elegance in Every Edge — Premium Cutlery from the Heart of Wazirabad
                                </h1>
                                <p className="text-secondary text-lg lg:text-xl max-w-lg leading-relaxed">
                                    Explore fine craftsmanship — from chef knives to timeless swords and elegant dining tools.
                                </p>
                                <button className="bg-highlight text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity shadow-lg">
                                    Explore Collection
                                </button>
                                {/* Stats */}
                                <div className="flex flex-wrap gap-8 pt-8 justify-center lg:justify-start">
                                    <div className="text-center">
                                        <div className="text-primary font-bold text-2xl lg:text-3xl font-quattrocento">100k+</div>
                                        <div className="text-secondary text-sm lg:text-base">Total Customers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-primary font-bold text-2xl lg:text-3xl font-quattrocento">90k+</div>
                                        <div className="text-secondary text-sm lg:text-base">Happy Customers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-primary font-bold text-2xl lg:text-3xl font-quattrocento">70k+</div>
                                        <div className="text-secondary text-sm lg:text-base">Total Reviews</div>
                                    </div>
                                </div>
                                {/* Customer Reviews */}
                                <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
                                    <div className="flex -space-x-2">
                                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                                             alt="Customer" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                                        <img src="https://images.unsplash.com/photo-1494790108755-2616b90b3f5e?w=50&h=50&fit=crop&crop=face"
                                             alt="Customer" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                                             alt="Customer" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-primary font-bold text-xl font-quattrocento">70k+</div>
                                        <div className="text-secondary text-sm">Reviews</div>
                                    </div>
                                </div>
                            </div>
                            {/* Right side spacer for image */}
                            <div className="hidden lg:block"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Store Availability Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <h2 className="font-quattrocento text-primary text-center text-3xl lg:text-4xl font-bold mb-16">
                        Our Store Available on
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 items-center justify-items-center">
                        {/* Noon */}
                        <div className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20">
                            <Image src="/noon-logo.svg" width={256} height={256}
                                   alt="Noon" className="max-w-full max-h-full object-contain" />
                        </div>
                        {/* Amazon */}
                        <div className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20">
                            <Image src="/amazon-logo.svg"  width={256} height={256}
                                   alt="Amazon" className="max-w-full max-h-full object-contain" />
                        </div>
                        {/* Etsy */}
                        <div className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20">
                            <Image src="/etsy-logo.svg" width={256} height={256}
                                   alt="Etsy" className="max-w-full max-h-full object-contain" />
                        </div>
                        {/* Daraz */}
                        <div className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20">
                            <Image src="daraz-logo.svg" width={256} height={256}
                                   alt="Daraz" className="max-w-full max-h-full object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <h2 className="font-quattrocento text-primary text-center text-3xl lg:text-4xl font-bold mb-16">
                        Categories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
                        {/* Luxury Flatware & Dining Sets */}
                        <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                            <Image src="/dinner-set-img.jpg" width={256} height={256}
                                 alt="Luxury Flatware & Dining Sets"
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="font-quattrocento text-2xl lg:text-3xl font-bold text-white leading-tight">Luxury Flatware & Dining Sets</h3>
                            </div>
                        </div>
                        {/* Hand-Forged or Custom-Made Tools */}
                        <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                            <Image src="/tools-img.jpg" width={256} height={256}
                                 alt="Hand-Forged Tools"
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="font-quattrocento text-2xl lg:text-3xl font-bold text-white leading-tight">Hand-Forged or Custom-Made Tools</h3>
                            </div>
                        </div>
                        {/* Collectible & Decorative Swords */}
                        <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                            <Image src="/sword-img.jpg" width={256} height={256}
                                 alt="Collectible & Decorative Swords"
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="font-quattrocento text-2xl lg:text-3xl font-bold text-white leading-tight">Collectible & Decorative Swords</h3>
                            </div>
                        </div>
                        {/* Premium Kitchen Knives */}
                        <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                            <Image src="/knife-img.jpg" width={256} height={256}
                                 alt="Premium Kitchen Knives"
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="font-quattrocento text-2xl lg:text-3xl font-bold text-white leading-tight">Premium Kitchen Knives</h3>
                            </div>
                        </div>
                    </div>
                    {/* Explore Collection Button */}
                    <div className="text-center">
                        <button className="bg-highlight text-white px-10 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity shadow-lg">
                            Explore Collection
                        </button>
                    </div>
                </div>
            </section>


        </>
    );
}
