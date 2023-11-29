"use client";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import classnames from "classnames";
import { toast } from "react-toastify";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userRole =
    typeof window !== "undefined" ? localStorage.getItem("userRole") : null;

  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure you want to logout?");

    if (shouldLogout) {
      localStorage.removeItem("token");
      toast.success("Logged Out");
      console.log("Logged Out");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  // Conditionally include "Agents" link based on userRole
  const links =
    userRole === "admin"
      ? [
          { label: "Agents", href: "/agents" },
          { label: "Plans", href: "/plans" },
          { label: "Area", href: "/area" },
          { label: "Collection", href: "/collection" },
          { label: "Customer", href: "/customer" },
        ]
      : [
          { label: "Plans", href: "/plans" },
          { label: "Area", href: "/area" },
          { label: "Collection", href: "/collection" },
          { label: "Customer", href: "/customer" },
        ];

  // Conditionally render the NavBar based on the presence of the token
  if (!token || currentPath === "/" || currentPath === "/login") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 bottom-0 w-44 bg-blue-800 p-6 flex flex-col ">
      <div className="flex-grow" />
      <div className="text-white mb-10">
        <Link href="/" className="flex items-center hover:text-blue-600">
          <AiOutlineHome className="cursor-pointer " />
          <span className="ml-2">Home</span>
        </Link>
      </div>
      <div className="flex flex-col flex-grow space-y-8 ">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-zinc-950": link.href === currentPath,
              "text-sky-100": link.href !== currentPath,
              "hover:text-blue-600 transition-colors flex items-center": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <div className="flex-grow" />
        <button
          className="text-black p-3 rounded-md bg-white hover:text-white hover:bg-blue-800 transition-colors "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
