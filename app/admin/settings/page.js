import SettingsClient from "@/components/admin/SettingsClient";

export const metadata = {
  title: "Settings",
  description: "Configure store settings for Wazir Cutlery. " +
      "Manage store information, email notifications, security preferences, " +
      "and other operational settings for your e-commerce site.",
};

export default function SettingsPage() {
  return <SettingsClient />;
}
