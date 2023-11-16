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
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const userRole = typeof window !== 'undefined' ? localStorage.getItem("userRole") : null;

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
  const links = userRole === "admin"
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
    <nav className="p-6 rounded-lg w-32 h-screen bg-sky-500 space-y-5">
      <ul className="hover:text-sky-400">
        <Link href="/">
          <AiOutlineHome />
        </Link>
      </ul>
      <ul className="space-y-5">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-sky-100": link.href === currentPath,
              "text-zinc-950": link.href !== currentPath,
              "hover:text-sky-400 transition-colors flex": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <button
          className="text-black p-2 rounded-lg hover:text-white transition-colors"
          onClick={handleLogout} 
        >
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default NavBar;
