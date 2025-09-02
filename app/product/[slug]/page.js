"use client";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ProductDetails from "../../../components/ProductDetails";
import ConditionalLayout from "../../../components/ConditionalLayout";

export default function ProductPage() {
    const params = useParams();
    const sku = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
    const product = useQuery(api.products.getProductBySku, sku ? { sku } : "skip");
    const related = useQuery(api.products.getProductsByCategory, product?._id ? { categoryId: product.categoryId } : 'skip');

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
            {sku && product && Array.isArray(related) && related.length > 0 && (
                <div className="max-w-7xl mx-auto px-8 py-12">
                    <div className="text-center mt-24 mb-24">
                        <h2 className="mb-8">Related Products</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                        {related.filter(r => r._id !== product._id).slice(0, 8).map((p) => (
                            <div key={p._id} className="product-card-new">
                                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                                    <div className="relative">
                                        <a href={`/product/${encodeURIComponent(p.sku)}`}>
                                            <img src={p.mainImage || "/spoon-product.jpg"} width={256} height={256} alt={p.name} className="w-full h-60 object-cover"/>
                                        </a>
                                    </div>
                                    <div className="p-5">
                                        <a href={`/product/${encodeURIComponent(p.sku)}`} className="block">
                                            <p className="product-name-new mb-3 h-9 line-clamp-2">{p.name}</p>
                                        </a>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xl font-bold product-price-new">${p.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </ConditionalLayout>
    );
}