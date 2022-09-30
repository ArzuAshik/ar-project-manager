import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logo } from "../assets/images";
import { userLoggedOut } from "../features/auth/authSlice";
import filterSearchedProjects from "../features/filter/filterThunk";
import selectUser from "../features/selectors/selectUser";
import useDebounce from "../hooks/useDebounce";

export default function Navbar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [search, setSearch] = useState("");

  const handleDispatchFilter = () => {
    dispatch(filterSearchedProjects(search));
  };

  useDebounce(handleDispatchFilter, 500, [search]);

  const navLinkClassName = ({ isActive }) => {
    return `mx-2 text-sm font-semibold ${
      isActive ? "" : "hover:"
    }text-indigo-700`;
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (pathname === "/projects") {
      handleDispatchFilter();
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
        <Link to="/teams">
          <img alt="logo" src={logo} className="h-10 w-10" />
        </Link>
        <div className="ml-10">
          <NavLink to="/projects" className={navLinkClassName}>
            Projects
          </NavLink>
          <NavLink to="/teams" className={navLinkClassName}>
            Team
          </NavLink>
        </div>
        {pathname === "/projects" && (
          <input
            className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring w-96"
            type="text"
            placeholder="Search for Projects"
            onChange={handleSearch}
            value={search}
          />
        )}
        <h3 className="ml-auto mr-3 text-lg font-bold">{user.name}</h3>
        <div className="flex items-center justify-center w-8 h-8 cursor-pointer relative group">
          <img className="rounded-full" src={user.avatar} alt={user.name} />
          <div className="absolute bg-white top-full right-0 p-5 hidden group-hover:block">
            <button
              onClick={handleLogout}
              className="hover:bg-red-500 hover:text-red-100 p-1 px-4 rounded-full bg-red-300 text-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
