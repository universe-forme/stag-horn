"use client";
import { useParams } from "next/navigation";
import { useProductBySku, useActiveProducts, useProductsByCategory } from "../../../lib/hooks";
import ProductDetails from "../../../components/ProductDetails";
import ConditionalLayout from "../../../components/ConditionalLayout";
import Link from "next/link";

// Component to render a list of products
const ProductList = ({ products, title }) => {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="text-center mt-24 mb-24">
                <h2 className="mb-8">{title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                {products.map((p) => (
                    <div key={p.id} className="product-card-new">
                        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                            <div className="relative">
                                <Link href={`/product/${encodeURIComponent(p.sku)}`}>
                                    <img src={p.main_image || "/spoon-product.jpg"} width={256} height={256} alt={p.name} className="w-full h-60 object-cover"/>
                                </Link>
                            </div>
                            <div className="p-5">
                                <Link href={`/product/${encodeURIComponent(p.sku)}`} className="block">
                                    <p className="product-name-new mb-3 h-9 line-clamp-2">{p.name}</p>
                                </Link>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-bold product-price-new">${p.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function ProductPage() {
    const params = useParams();
    const sku = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
    
    const { data: product } = useProductBySku(sku);
    const { data: relatedProducts } = useProductsByCategory(product?.category_id);
    const { data: allProducts } = useActiveProducts();

    let displayProducts = [];
    let displayTitle = "";

    const isLoadingRecommendations = product && relatedProducts === undefined && allProducts === undefined;

    if (product && relatedProducts) {
        const filteredRelated = relatedProducts.filter(r => r.id !== product.id);
        if (filteredRelated.length > 0) {
            displayProducts = filteredRelated.slice(0, 8);
            displayTitle = "Related Products";
        } else if (allProducts) {
            const otherCategoryProducts = allProducts.filter(p => p.category_id !== product.category_id).slice(0, 8);
            if (otherCategoryProducts.length > 0) {
                displayProducts = otherCategoryProducts;
                displayTitle = "Other Products You Might Like";
            }
        }
    }

    const showWaitForUpdate = product && !isLoadingRecommendations && displayProducts.length === 0;

    return (
        <ConditionalLayout>
            {!sku && <div className="container mx-auto px-8 py-16 mt-24">Invalid product.</div>}
            {sku && product === undefined && <div className="container mx-auto px-8 py-16 mt-24">Loading...</div>}
            {sku && product === null && <div className="container mx-auto px-8 py-16 mt-24">Product not found.</div>}
            
            {sku && product && (
                <ProductDetails product={{
                    ...product,
                    images: Array.isArray(product.images) ? product.images : (product.mainImage ? [product.mainImage] : []),
                }} />
            )}

            {isLoadingRecommendations && (
                 <div className="text-center mt-24 mb-24">
                    <h2 className="mb-8">Loading Recommendations...</h2>
                </div>
            )}

            {!isLoadingRecommendations && displayProducts.length > 0 && (
                <ProductList products={displayProducts} title={displayTitle} />
            )}

            {showWaitForUpdate && (
                <div className="max-w-7xl mx-auto px-8 py-12">
                    <div className="text-center mt-24 mb-24">
                        <h2 className="mb-8">Wait for Update</h2>
                        <p>More products are coming soon. Please check back later.</p>
                    </div>
                </div>
            )}
        </ConditionalLayout>
    );
}