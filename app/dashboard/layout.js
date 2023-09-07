import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard",
  description: "servicom dashboard",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      <Sidebar />
      {children}
    </div>
  );
}
