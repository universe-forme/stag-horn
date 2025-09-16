import ProductDetailClient from "@/components/ProductDetailClient";
import { createClient } from '@supabase/supabase-js';

// This is a server component, so we can fetch data directly.
// We create a new Supabase client here. In a larger app, this might be in a shared file.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function generateMetadata({ params }) {
  const { slug } = params;
  if (!slug) {
    return {
        title: 'Product',
        description: "Explore high-quality, handcrafted knives " +
            "and swords from Wazir Cutlery."
    };
  }

  const { data: product } = await supabase
    .from('products')
    .select('name')
    .eq('sku', slug)
    .single();

  if (product) {
    return {
      title: product.name,
      description: `Discover the ${product.name}, a masterfully handcrafted blade 
      from Wazir Cutlery. Forged in Wazirabad from premium materials for 
      exceptional performance and durability.`,
    };
  }

  return {
    title: "Product Not Found",
    description: "The product you are looking for is not available. " +
        "Explore other handcrafted blades from Wazir Cutlery.",
  };
}

export default function ProductPage({ params }) {
  const { slug } = params;
  return <ProductDetailClient sku={slug} />;
}
