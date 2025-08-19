import { Poppins, Quattrocento } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "800"],
});

const quattrocento = Quattrocento({
  variable: "--font-quattrocento",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata = {
  title: "Stag Horn",
  description: "Developed by Datadaur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${quattrocento.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
