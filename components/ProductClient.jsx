'use client';
import Image from 'next/image';
import React from "react";
import Link from 'next/link';
import ConditionalLayout from "@/components/ConditionalLayout";
import { useActiveProducts, useProductsByCategory, useCategoriesWithProductCounts } from "@/lib/hooks";
import { useSearchParams, useRouter } from 'next/navigation';
import Newsletter from "@/components/Newsletter";
import RelatedProducts from "@/components/RelatedProducts";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";
import { LoadingState, ErrorState, NoDataState } from "@/components/common/StateComponents";

const ProductClient = () => {
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
    const filterType = searchParams.get('filter');
    const type = searchParams.get('type'); // Add this to check if coming from home page sections
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const pageSize = 15; // Changed to 15 products per page (3 rows of 5)

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [displayedItems, setDisplayedItems] = React.useState(pageSize);
    const buttonRef = React.useRef(null);
    const menuRef = React.useRef(null);

    const { data: allProducts, isLoading: isLoadingAll, error: errorAll } = useActiveProducts();
    const { data: productsByCategory, isLoading: isLoadingCategory, error: errorCategory } = useProductsByCategory(categoryId);
    const { data: categories } = useCategoriesWithProductCounts();

    const isLoading = categoryId ? isLoadingCategory : isLoadingAll;
    const error = categoryId ? errorCategory : errorAll;

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && buttonRef.current &&
                !menuRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset displayed items when filter or category changes
    React.useEffect(() => {
        setDisplayedItems(pageSize);
    }, [filterType, categoryId, type]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleFilterChange = (type) => {
        const params = new URLSearchParams(searchParams);
        if (type) {
            params.set('filter', type);
        } else {
            params.delete('filter');
        }
        params.set('page', '1'); // Reset to first page when filter changes
        router.push(`/product?${params.toString()}`);
        setIsMenuOpen(false);
    };

    const handleLoadMore = () => {
        setDisplayedItems(prev => prev + pageSize);
    };

    const getCategoryName = (id) => {
        if (!categories || !id) {
            return "All Products";
        }
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : "All Products";
    };

    const getFilterText = (type) => {
        switch (type) {
            case 'featured':
                return 'Featured';
            case 'best-selling':
                return 'Best Selling';
            case 'trending':
                return 'Trending';
            default:
                return 'Filter';
        }
    };

    const categoryName = getCategoryName(categoryId);

    // Filter the products based on the selected filter type or type parameter
    const filterProducts = (products) => {
        if (!Array.isArray(products)) return [];

        const filterBy = filterType || type; // Use either filter or type parameter

        switch (filterBy) {
            case 'featured':
                return products.filter(p => p.is_featured);
            case 'best-selling':
                return products.filter(p => p.is_best_selling);
            case 'trending':
                return products.filter(p => p.is_trending);
            default:
                return products;
        }
    };

    const dataset = categoryId ? productsByCategory : allProducts;
    const filteredDataset = filterProducts(dataset);
    const total = Array.isArray(filteredDataset) ? filteredDataset.length : 0;
    const pageItems = Array.isArray(filteredDataset) ? filteredDataset.slice(0, displayedItems) : [];
    const hasMoreItems = displayedItems < total;

    const { addToCart } = useCart();

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
        <>
            <div className="min-h-screen relative overflow-hidden">
                <div className="container mx-auto relative z-10 py-20 px-4">
                    <div className="text-center mt-24 mb-24">
                        <h1 className="mb-8 capitalize">{categoryName}</h1>

                        <div className="w-full flex justify-start">
                            <div className="relative">
                                <button ref={buttonRef} className="filter-button bg-[#F9F9F6]" onClick={toggleMenu}>
                                    <div className="flex items-center gap-2">
                                        <Image src="/filter-icon.svg" alt={"Filter Icon"} width={16} height={16} />
                                        <span>{getFilterText(filterType || type)}</span>
                                    </div>
                                    <svg className={`filter-arrow-icon ${isMenuOpen ? 'rotated' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <div ref={menuRef} className={`filter-dropdown-menu ${isMenuOpen ? '' : 'hidden'}`}>
                                    <div className="px-4 py-2 text-sm text-gray-500 cursor-default">Filter by</div>
                                    <a onClick={() => handleFilterChange('featured')} className={`filter-dropdown-item ${(filterType === 'featured' || type === 'featured') ? 'active' : ''}`}>Featured</a>
                                    <a onClick={() => handleFilterChange('best-selling')} className={`filter-dropdown-item ${(filterType === 'best-selling' || type === 'best-selling') ? 'active' : ''}`}>Best Selling</a>
                                    <a onClick={() => handleFilterChange('trending')} className={`filter-dropdown-item ${(filterType === 'trending' || type === 'trending') ? 'active' : ''}`}>Trending</a>
                                    <div className="border-t my-2"></div>
                                    <a onClick={() => handleFilterChange(null)} className="filter-dropdown-item text-red-500">Reset Filter</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <LoadingState />
                    ) : error ? (
                        <ErrorState />
                    ) : total === 0 ? (
                        <NoDataState />
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
                                {pageItems.map((p) => (
                                    <Link key={p._id} href={`/product/${encodeURIComponent(p.sku)}`} className="cursor-pointer">
                                        <div className="card-border p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                                            <div className="relative mb-4">
                                                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                                                    {(() => {
                                                        const badges = [];
                                                        if (p.is_best_selling) badges.push('Best Selling');
                                                        if (p.is_featured) badges.push('Featured');
                                                        if (p.is_trending) badges.push('Trending');

                                                        return badges.slice(0, 2).map((badge, index) => (
                                                            <span key={index} className="best-sale-badge text-xs px-2 py-1">
                                                                {badge}
                                                            </span>
                                                        ));
                                                    })()}
                                                </div>
                                                <div className="aspect-square rounded-lg flex items-center justify-center overflow-hidden">
                                                    <Image src={p.main_image || '/product.jpg'} width={250} height={250} alt={p.name} className="w-full h-full object-contain" />
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <p className="product-name-new mb-3 h-10 line-clamp-2 font-semibold text-lg">{p.name}</p>
                                                <span className="text-xl font-bold product-price-new mb-2">${p.price}</span>
                                                <p className="text-sm text-[#0E0E0E] mb-2">{p.estimatedDelivery || "Estimate delivery in 2-3 working days"}</p>
                                                <button className="cta-button-new w-full py-2 rounded-md font-medium mt-2"
                                                        onClick={(e) => handleAddToCart(p, e)}
                                                >
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {hasMoreItems && (
                                <div className="items-center justify-center flex mb-16">
                                    <button
                                        className="cta-button py-2 rounded-md font-medium"
                                        onClick={handleLoadMore}
                                    >
                                        Load more
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* Show RelatedProducts section when type parameter exists */}
                    {type && <RelatedProducts />}
                </div>
            </div>
            <Newsletter />
        </>
    );
}

export default ProductClient;
