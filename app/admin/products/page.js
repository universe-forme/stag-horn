import ProductsClient from "@/components/admin/ProductsClient";

export const metadata = {
  title: "Products",
  description: "Efficiently manage your product catalog at Wazir Cutlery. " +
      "Add, edit, and update details for handmade knives, swords, a" +
      "nd chef cutlery. Control stock levels, pricing, and visibility " +
      "to maintain an organized and up-to-date inventory.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
