// "use client";
// import "tailwindcss/tailwind.css";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { AiOutlineHome } from "react-icons/ai";
// import classnames from "classnames";
// import { toast } from "react-toastify";

// const NavBar = () => {
//   const currentPath = usePathname();
//   console.log(currentPath);

//   const router = useRouter();
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   const userRole =
//     typeof window !== "undefined" ? localStorage.getItem("userRole") : null;

//   const handleLogout = () => {
//     const shouldLogout = window.confirm("Are you sure you want to logout?");

//     if (shouldLogout) {
//       localStorage.removeItem("token");
//       toast.success("Logged Out");
//       console.log("Logged Out");
//       setTimeout(() => {
//         router.push("/");
//       }, 2000);
//     }
//   };

//   // Conditionally include "Agents" link based on userRole
//   const links =
//     userRole === "admin"
//       ? [
//           { label: "Agents", href: "/agents" },
//           { label: "Plans", href: "/plans" },
//           { label: "Area", href: "/area" },
//           { label: "Collection", href: "/collection" },
//           { label: "Customer", href: "/customer" },
//         ]
//       : [
//           { label: "Plans", href: "/plans" },
//           { label: "Area", href: "/area" },
//           { label: "Collection", href: "/collection" },
//           { label: "Customer", href: "/customer" },
//         ];

//   // Conditionally render the NavBar based on the presence of the token
//   if (!token || currentPath === "/" || currentPath === "/login") {
//     return null;
//   }

//   return (
//     <nav className="fixed inset-y-0 left-0 w-64 py-10 bg-blue-800 z-10">
//       <div className="flex-grow" />
//       <div className="text-white mb-10">
//         <Link href="/" className="flex items-center hover:text-blue-600">
//           <AiOutlineHome className="cursor-pointer " />
//           <span className="ml-2">Home</span>
//         </Link>
//       </div>
//       <div className="flex flex-col flex-grow space-y-8 ">
//         {links.map((link) => (
//           <Link
//             key={link.href}
//             className={classnames({
//               "text-zinc-950": link.href === currentPath,
//               "text-sky-100": link.href !== currentPath,
//               "hover:text-blue-600 transition-colors flex items-center": true,
//             })}
//             href={link.href}
//           >
//             {link.label}
//           </Link>
//         ))}
//         <div className="flex-grow" />
//         <button
//           className="text-black p-3 rounded-md bg-white hover:text-white hover:bg-blue-800 transition-colors "
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

"use client";

import "tailwindcss/tailwind.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import classnames from "classnames";
//import { toast } from "react-toastify";
import { Toaster, toast } from "sonner";
import { MdOutlineLogout, MdFastfood } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";
import { FaHome, FaChartArea, FaBookOpen } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosPerson } from "react-icons/io";
import { useEffect, useState } from "react";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  const [token, setToken] = useState("");
  const [userRole, setuserRole] = useState("");

  const router = useRouter();
  // const token =
  //   typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // const userRole =
  //   typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) {
      setuserRole(role);
    }
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [userRole]);
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
          { label: "Home", href: "/homeScreen", icon: <FaHome /> },
          { label: "Agents", href: "/agents", icon: <FaPeopleGroup /> },
          { label: "Plans", href: "/plans", icon: <FaBookOpen /> },
          { label: "Area", href: "/area", icon: <FaChartArea /> },
          {
            label: "Collection",
            href: "/collection",
            icon: <HiOutlineCollection />,
          },
          { label: "Customer", href: "/customer", icon: <IoIosPerson /> },
        ]
      : [
          { label: "Home", href: "/homeScreen", icon: <FaHome /> },
          { label: "Plans", href: "/plans", icon: <FaBookOpen /> },
          { label: "Area", href: "/area", icon: <FaChartArea /> },
          {
            label: "Collection",
            href: "/collection",
            icon: <HiOutlineCollection />,
          },
          { label: "Customer", href: "/customer", icon: <IoIosPerson /> },
        ];

  // Conditionally render the NavBar based on the presence of the token
  // if (!token || currentPath === "/" || currentPath === "/login") {
  //   return null;
  // }

  return (
    <nav className="fixed inset-y-0 left-0 w-64 py-10 bg-blue-800 z-10">
      {/* <AppBar title={storedName} /> */}
      <div className="w-1/2 py-10 h-screen bg-blue-800 fixed top-0 left-96 lg:w-60 lg:left-0">
        <div className="flex items-center justify-between  mb-4">
          <h2 className="flex items-center px-2 gap-2  font-bold text-white text-3xl">
            Collection App
          </h2>
        </div>

        {/* <div className="flex items-center  justify-between  mb-4">
       <Link href="/appList">
            <div className="flex items-center text-3xl  text-white cursor-pointer hover:text-black">
              <IoIosArrowBack />
            </div>
          </Link>
          <h2 className="flex flex-col space-y-2 px-5   gap-4 pl-10 font-bold text-white text-3xl ">
            {storedName}
          </h2>
        </div> */}

        <ul className="flex flex-col space-y-2 gap-4 pl-12">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={classnames({
                  "text-zinc-900": link.href === currentPath,
                  "text-white": link.href !== currentPath,
                  "hover:text-zinc-800 transition-colors": true,
                })}
                href={link.href}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
              </Link>
            </li>
          ))}

          <li className="p-5 pl-0 px-10">
            <div className="fixed bottom-10">
              <div
                className="flex gap-2 p-2 bg-white border hover:border-gray-900  rounded-md cursor-pointer "
                onClick={handleLogout}
              >
                <MdOutlineLogout
                  className="text-2xl text-gray-100 group-hover:text-white"
                  style={{ color: "#000080" }}
                />
                <h3 className="text-base text-blue-800 font-semibold">
                  Logout
                </h3>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Toaster richColors />
    </nav>
  );
};

export default NavBar;
