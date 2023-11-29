"use client";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa"; // Assuming you want to use the Font Awesome user icon
import { AiOutlineHome } from "react-icons/ai";
import classnames from "classnames";
import { toast } from "react-toastify";

const AppBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userRole =
    typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
  const userName =
    typeof window !== "undefined" ? localStorage.getItem("userName") : null;
  const userAvatar =
    typeof window !== "undefined" ? localStorage.getItem("userAvatar") : null;

  // Conditionally include "Agents" link based on userRole
  const links =
    userRole === "admin"
      ? [{ label: "Agents", href: "/agents" }]
      : [{ label: "Plans", href: "/plans" }];

  // Conditionally render the AppBar based on the presence of the token
  if (!token || currentPath === "/" || currentPath === "/login") {
    return null;
  }

  return (
    <nav className="fixed top-0 right-0 bg-white p-4 flex items-center justify-between overflow-hidden custom-width">
      <div className="text-white"></div>
      <div className="flex space-x-4 text-white items-center">
        {/* Make user avatar and name clickable */}
        <Link href="/profile">
          {" "}
          {/* Change "/profile" to the actual profile page route */}
          <a className="flex items-center">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={`${userName}'s Avatar`}
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <FaUser className="text-gray-800 text-xl mr-2" />
            )}
            {userName && <span className="text-gray-800">{userName}</span>}
          </a>
        </Link>

        {/* Display links based on user role */}
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-zinc-950": link.href === currentPath,
              "text-sky-100": link.href !== currentPath,
              "hover:text-blue-600 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AppBar;
