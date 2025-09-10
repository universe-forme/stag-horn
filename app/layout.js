import { Poppins, Quattrocento, Open_Sans } from "next/font/google";
import "./globals.css";
import SupabaseClientProvider from "../components/SupabaseClientProvider";
import ClerkProviderWrapper from "../components/ClerkProviderWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const quattrocento = Quattrocento({
  variable: "--font-quattrocento",
  subsets: ["latin"],
  weight: ["400", "700"],
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
        <body className={`${poppins.variable} ${quattrocento.variable} ${openSans.variable} antialiased`}>
          <SupabaseClientProvider>
            {children}
            <ToastContainer position="top-right" />
          </SupabaseClientProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
