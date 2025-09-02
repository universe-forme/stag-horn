import ProductDetails from "../../../components/ProductDetails";
import ConditionalLayout from "../../../components/ConditionalLayout";

// Mock data - in a real app, you would fetch this from your database (e.g., Convex or Supabase)
const mockProduct = {
    slug: 'stainless-steel-dinner-spoon-satin-finish',
    name: 'Stainless Steel Dinner Spoon – Satin Finish',
    price: 5.99,
    description: 'Lorem ipsum turpis id proin et euismod imperdiet pellentesque risus id nibh sed mi amet libero nec commodo sit et nulla et proin erat facilisi nullam et volutpat turpis tincidunt velit mollit lorem orci tincidunt odor amet lorem proin habitant quam congue adipiscing quam rhoncus ut viverra elit tortor arcu magna duis nulla ut sit consectetur orci semper sed amet nulla integer neque morbi et libero habitant amet nulla imperdiet duis ac nisl iaculis ac neque orci faucibus lacinia est sed tellus consectetur est aliquet aliquet nec et faucibus mauris ultricies facilibus tempus id diam libero sed pharetra consequat vestibulum donec sit id congue at nullam platea varius egestas cursus eget sagittis nisl proin ullamcorper neque vestibulum eu vel non sit nec justo nunc ac fringilla porttitor nulla viverra porta consectetur nulla est et at fusce nunc natoque volutpat fusce volutpat turpis urna ultrices diam id commodo pharetra tincidunt faucibus sed volutputate venenatis erat non a ut viverra velit dolor gravida venenatis laoreet etiam quam duis id tortor orci neque lorem sit gravida donec elit magna semper ac odio mauris tempor etiam tincidunt vulputate vel mi mauris adipiscing id vestibulum tincidunt malesuada interdum semper ullamcorper eu amet sit amet nisl elit erat convallis tincidunt ipsum amet odio vestibulum consequat et habitasse porttitor augue vestibulum in cras vel tortor leo augue magna semper consequat egestas mauris auctor laoreet sagittis facilisis pellentesque ut sed massa sodales hac dolor urna urna cras semper fringilla metus amet tincidunt venenatis aliquet in suspendisse duis non nibh mi proin maecenas tellus ac vulputate ut nunc faucibus arcu ut amet quis eget et diam est arcu facilisi dolor nunc a faucibus quisque sit magna auctor lacus aliquet felis tellus venenatis pharetra ac quis eget justo felis viverra bibendum ornare urna risus dolor varius dignissim vitae eu sed justo amet nec sed nulla tincidunt viverra tristique sed velit nulla.',
    images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1609099159388-a8a8e50d2e3e?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1585936728642-12c7dd10b90d?w=800&h=600&fit=crop&crop=center"
    ],
    previewImages: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1609099159388-a8a8e50d2e3e?w=400&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1585936728642-12c7dd10b90d?w=400&h=300&fit=crop&crop=center"
    ]
};

async function getProductBySlug(slug) {
    // This is where you'd fetch data from your backend.
    // For now, it returns the mock product if the slug matches.
    if (slug === mockProduct.slug) {
        return mockProduct;
    }
    return null;
}

export default async function ProductPage({ params }) {
    const { slug } = params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <ConditionalLayout>
            <ProductDetails product={product} />
        </ConditionalLayout>
    );
}