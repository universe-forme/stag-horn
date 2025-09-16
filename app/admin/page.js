import DashboardClient from "@/components/admin/DashboardClient";

export const metadata = {
  title: "Dashboard",
  description: "Manage Wazir Cutlery\'s operations from the admin dashboard. " +
      "Oversee products, categories, orders, and customers to ensure a seamless " +
      "experience for your clients and staff.",
};

export default function AdminDashboard() {
  return <DashboardClient />;
}
