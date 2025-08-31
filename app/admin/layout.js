import { Poppins } from "next/font/google";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminRouteProtection from "../../components/AdminRouteProtection";
import ConvexClientProvider from "../../components/ConvexClientProvider";
import { AdminAuthProvider } from "../../components/AdminAuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Admin Dashboard - Wazir Cutlery",
  description: "Admin panel for Wazir Cutlery",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased bg-gray-50`}>
        <ConvexClientProvider>
          <AdminAuthProvider>
            <AdminRouteProtection>
              <div className="flex h-screen bg-gray-100">
                <AdminSidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <AdminHeader />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {children}
                  </main>
                </div>
              </div>
              <ToastContainer position="top-right" />
            </AdminRouteProtection>
          </AdminAuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
