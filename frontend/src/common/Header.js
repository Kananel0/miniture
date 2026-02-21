import React, { useEffect, useState } from "react";
import { navbar } from "../data/Data";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineHeart, HiOutlineUser } from "react-icons/hi";
import Sidebar from "./Sidebar";

const Header = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <div className={`${sticky ? "py-4 sticky top-0 z-50 shadow-xl bg-white" : "py-4"} transition-all duration-300`}>
        <div className="flex items-center justify-between w-10/12 m-auto">
          <Link to="/" className="text-xl font-bold uppercase tracking-widest">miniture</Link>
          
          <div className="hidden md:flex space-x-5">
            {navbar.map((nav, key) => (
              <Link key={key} className="hover:text-red-600 font-medium" to={nav.path}>{nav.nav}</Link>
            ))}
          </div>

          <div className="flex items-center space-x-5">
            <button onClick={() => setIsSidebarOpen(true)} className="text-2xl"><HiOutlineHeart /></button>

            {user ? (
              <div className="flex items-center space-x-3 bg-gray-50 px-3 py-1 rounded-full border">
                <span className="text-sm font-bold text-gray-800">
                   Hi, {user.username}
                </span>
                <button onClick={handleLogout} className="text-[10px] bg-red-600 text-white px-2 py-1 rounded font-bold uppercase">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-2xl"><HiOutlineUser /></Link>
            )}

            <button onClick={() => setIsSidebarOpen(true)} className="relative text-2xl">
              <MdOutlineShoppingBag />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;