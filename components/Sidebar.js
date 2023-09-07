"use client";
import {
  HomeIcon,
  UsersIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  FlagIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  return (
    <aside
      className="bg-white md:w-[16vw] absolute mt-3 
    md:flex md:flex-col overflow-auto  md:p-2
    h-[calc(100vh-56px)] justify-center hidden "
    >
      <div className="grow mt-4 flex flex-col">
        {/* dashboard */}
        <Link href="/dashboard">
          <div className="flex items-center space-x-2 hover:shadow-md p-2 shadow-black">
            <HomeIcon className="h-4 w-4" />
            <h3 className="text-xs">Dashboard</h3>
          </div>
        </Link>
        {/* agencies */}
        <Link href="/dashboard/agencies">
          <div className="flex items-center space-x-2 hover:shadow-md p-2 shadow-black">
            <BuildingOffice2Icon className="h-4 w-4" />
            <h3 className="text-xs">Agencies</h3>
          </div>
        </Link>
        {/* complaints */}
        <Link href="/dashboard/complaints">
          <div className="flex items-center space-x-2 hover:shadow-md p-2 shadow-black">
            <FlagIcon className="h-4 w-4" />
            <h3 className="text-xs">Complaints</h3>
          </div>
        </Link>
        {/* users */}
        <Link href="/dashboard/users">
          <div className="flex items-center space-x-2 hover:shadow-md p-2 shadow-black">
            <UsersIcon className="h-4 w-4" />
            <h3 className="text-xs">Users</h3>
          </div>
        </Link>
        {/* settings */}
        <Link href="/dashboard/settings">
          <div className="flex items-center space-x-2 hover:shadow-md p-2 shadow-black">
            <Cog6ToothIcon className="h-4 w-4" />
            <h3 className="text-xs">Settings</h3>
          </div>
        </Link>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="w-full bg-black text-white text-xs p-4"
        >
          Logout
        </button>
      </div>
      <ToastContainer />
    </aside>
  );
}
