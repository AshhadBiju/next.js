// "use client";
// import "tailwindcss/tailwind.css";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect } from "react"; // Import useEffect
// import { useRouter } from "next/navigation";
//
// import classnames from "classnames";

// const AppBar = () => {
//   const currentPath = usePathname();
//   console.log(currentPath);

//   const router = useRouter();
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   const userRole =
//     typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
//   const userName =
//     typeof window !== "undefined" ? localStorage.getItem("userName") : null;
//   const userAvatar =
//     typeof window !== "undefined" ? localStorage.getItem("userAvatar") : null;

//   // Conditionally include "Agents" link based on userRole
//   const getPageName = (path) => {
//     switch (path) {
//       case "/":
//         return "Home";
//       case "/agents":
//         return "Agents";
//       case "/plans":
//         return "Plans";
//       case "/area":
//         return "Area";
//       case "/collection":
//         return "Collection";
//       case "/customer":
//         return "Customer";
//       default:
//         return "Unknown";
//     }
//   };

//   // useEffect to set document title based on the current page
//   useEffect(() => {
//     document.title = `Your App Name - ${
//       currentPath === "/"
//         ? "Home"
//         : currentPath === "/agents"
//         ? "Agents"
//         : currentPath === "/plans"
//         ? "Plans"
//         : currentPath === "/area"
//         ? "Area"
//         : currentPath === "/collection"
//         ? "Collection"
//         : "Customer"
//     }`;
//   }, [currentPath]);

//   // Conditionally render the AppBar based on the presence of the token
//   if (!token || currentPath === "/" || currentPath === "/login") {
//     return null;
//   }

//   return (
//     <nav className="fixed top-0 right-0 bg-white p-4 flex items-center justify-between overflow-hidden custom-width">
//       <div className="text-white"></div>
//       <div className="flex space-x-4 text-white items-center">
//         <div className="text-gray-800 absolute left-3 font-semibold">
//           {getPageName(currentPath)}
//         </div>
//         {/* Make user avatar and name clickable */}
//         <Link href="/profile">
//           <div className="flex items-center">
//             {userAvatar ? (
//               <img
//                 src={userAvatar}
//                 alt={`${userName}'s Avatar`}
//                 className="w-8 h-8 rounded-full mr-2"
//               />
//             ) : (
//               <FaUser className="text-gray-800 text-xl mr-2" />
//             )}
//             {userName && <span className="text-gray-800">{userName}</span>}
//           </div>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default AppBar;

// export default function AppBar() {
//   return (
//     <div>
//       <nav className="flex justify-between items-center  p-4 bg-white">
//         <div className="text-black">Home</div>
//       </nav>
//     </div>
//   );
// }
"use client";
import { useRouter, usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";

const AppBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/")[1];

  // Function to replace UUID with "edit" and capitalize the first letter
  const formatSegment = (segment) => {
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white">
      <div className="text-black">{formatSegment(pathSegments)}</div>
      {/* <div className="flex items-center">
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
      </div> */}
    </nav>
  );
};

export default AppBar;
