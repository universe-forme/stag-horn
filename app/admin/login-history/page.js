import LoginHistoryClient from "@/components/admin/LoginHistoryClient";

export const metadata = {
  title: "Login History",
  description: "Review the admin login history for Wazir Cutlery. " +
      "Monitor login attempts, IP addresses, and timestamps to ensure the " +
      "security and integrity of your admin panel.",
};

export default function AdminLoginHistoryPage() {
  return <LoginHistoryClient />;
}
