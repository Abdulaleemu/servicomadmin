import Header from "@/components/Header"
import Sidebar from "@/components/Asidebar"


export const metadata = {
  title: 'Servicom',
  description: 'Servicom Dashboard',
}

export default function Layout({ children }) {
  return (
    <main className=" h-screen">

      <Header/>
      <Sidebar/>
      </main>
  )
}
