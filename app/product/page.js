import ProductClient from "@/components/ProductClient";

export const metadata = {
  title: "Products",
  description: "Shop the full collection of Wazir Cutlery's masterfully" +
      " crafted blades. Browse our extensive range of handmade knives, " +
      "collector swords, and professional chef cutlery, all forged in " +
      "Wazirabad from premium high-carbon and Damascus steel. " +
      "Find your perfect blade today.",
};

export default function ProductPage() {
  return <ProductClient />;
}
