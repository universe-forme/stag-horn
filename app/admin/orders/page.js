import OrdersClient from "@/components/admin/OrdersClient";

export const metadata = {
  title: "Orders",
  description: "View and manage all customer orders for Wazir Cutlery. " +
      "Track order statuses, view order details, and manage fulfillment to ensure " +
      "a smooth and efficient process for your customers.",
};

export default function OrdersPage() {
  return <OrdersClient />;
}
