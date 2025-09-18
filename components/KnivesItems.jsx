
import Image from 'next/image';
import Link from 'next/link';
import { useProductsByCategorySlug } from '../lib/supabase-hooks';
import ProductCard from './ProductCard';

const KnivesItems = () => {
    const { data: products, isLoading, error } = useProductsByCategorySlug('knives', 5);

    if (isLoading) {
        return (
            <div className="p-6 lg:p-12">
                <div className="container mx-auto">
                    <h2 className="cabin-font text-4xl font-normal text-black text-center mb-12">Knives</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="card-border p-6 flex flex-col h-full animate-pulse">
                                <div className="aspect-square rounded-lg bg-gray-200 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 lg:p-12">
                <div className="container mx-auto">
                    <h2 className="cabin-font text-4xl font-normal text-black text-center mb-12">Knives</h2>
                    <div className="text-center text-red-500">Error loading products: {error.message}</div>
                </div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="p-6 lg:p-12">
                <div className="container mx-auto">
                    <h2 className="cabin-font text-4xl font-normal text-black text-center mb-12">Knives</h2>
                    <div className="text-center text-gray-500">No knife products available at the moment.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-12">
            <div className="container mx-auto">
                <h2 className="cabin-font text-4xl font-normal text-black text-center mb-12">Knives</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
                    {[...products].sort(() => 0.5 - Math.random()).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/product?category=knives">
                        <button className="see-button outfit-font text-white font-medium text-sm px-8 py-3 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            See more items
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default KnivesItems;
