import "./globals.css";
import { Inter } from "next/font/google";
import { TokenProvider } from "@/components/UserToken";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Servicom Admin",
  description: "servicom admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F5F5] w-screen h-screen overflow-hidden">
        <TokenProvider>{children}</TokenProvider>
      </body>
    </html>
  );
}
