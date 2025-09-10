import {Open_Sans, Outfit, Cabin} from "next/font/google";
import "./globals.css";
import SupabaseClientProvider from "../components/SupabaseClientProvider";
import ClerkProviderWrapper from "../components/ClerkProviderWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Wazir Cutlery",
  description: "Developed by Datadaur",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProviderWrapper>
      <html lang="en">
        <body className={`${outfit.variable} ${cabin.variable} ${openSans.variable} antialiased`}>
          <SupabaseClientProvider>
            {children}
            <ToastContainer position="top-right" />
          </SupabaseClientProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
