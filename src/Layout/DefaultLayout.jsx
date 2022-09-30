import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function DefaultLayout({ children, title }) {
  document.title = `${title} | Project Manager`;
  // toast("sdf")
  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
}
