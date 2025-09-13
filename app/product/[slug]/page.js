'use client';
import { useParams } from "next/navigation";
import { useProductBySku, useActiveProducts, useProductsByCategory, useCategoriesWithProductCounts } from "../../../lib/hooks";
import ProductDetails from "../../../components/ProductDetails";
import ConditionalLayout from "../../../components/ConditionalLayout";
import RelatedProducts from "../../../components/RelatedProducts";

export default function ProductPage() {
    const params = useParams();
    const sku = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
    
    const { data: product } = useProductBySku(sku);
    const { data: categories } = useCategoriesWithProductCounts();
    const { data: relatedProducts } = useProductsByCategory(product?.category_id);
    const { data: allProducts } = useActiveProducts();

    // Add category info to product
    const productWithCategory = product && categories 
        ? { ...product, category: categories.find(c => c.id === product.category_id) }
        : product;

    let displayProducts = [];

    const isLoadingRecommendations = product && relatedProducts === undefined && allProducts === undefined;

    if (product && relatedProducts) {
        const filteredRelated = relatedProducts.filter(r => r.id !== product.id);
        if (filteredRelated.length > 0) {
            displayProducts = filteredRelated.slice(0, 5);
        } else if (allProducts) {
            const otherCategoryProducts = allProducts.filter(p => p.category_id !== product.category_id).slice(0, 5);
            if (otherCategoryProducts.length > 0) {
                displayProducts = otherCategoryProducts;
            }
        }
    }

    const showWaitForUpdate = product && !isLoadingRecommendations && displayProducts.length === 0;

    return (
        <ConditionalLayout>
            {!sku && <div className="container mx-auto px-8 py-16 mt-24">Invalid product.</div>}
            {sku && product === null && <div className="container mx-auto px-8 py-16 mt-24">Loading...</div>}
            {sku && product === undefined && <div className="container mx-auto px-8 py-16 mt-24">Product not found.</div>}
            
            {sku && productWithCategory && (
                <>
                    <ProductDetails product={productWithCategory} />
                    
                    <div className="container mx-auto px-4 md:px-8 lg:px-24 py-8">
                        {isLoadingRecommendations && (
                             <div className="text-center my-16">
                                <h2 className="font-outfit font-medium text-black text-xl md:text-[28px]">Loading Recommendations...</h2>
                            </div>
                        )}

                        {!isLoadingRecommendations && displayProducts.length > 0 && (
                            <RelatedProducts products={displayProducts} />
                        )}

                        {showWaitForUpdate && (
                            <div className="my-16">
                                <div className="text-center">
                                    <h2 className="font-outfit font-medium text-black text-xl md:text-[28px]">More products coming soon!</h2>
                                    <p>Please check back later.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </ConditionalLayout>
    );
}
