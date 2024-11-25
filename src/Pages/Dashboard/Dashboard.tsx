import React, { FC, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeUser } from "../../features/userSlice";

const Dashboard: FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);
  const email = user?.email;
  useEffect(() => {
    fetch(`https://rent-a-property-server.vercel.app/admin/${email}`, {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          dispatch(removeUser());
        } else {
          return res.json();
        }
      })
      .then((data) => setIsAdmin(data.isAdmin));
  }, [user, email]);
  const menuItems = [
    <li>
      <Link to="/dashboard">Profile</Link>
    </li>,
    <li>
      <Link to="/dashboard/my-rents">My Rent Applications</Link>
    </li>,
    <li>
      <Link to="/dashboard/my-sales">My Sales</Link>
    </li>,
    isAdmin && (
      <li>
        <Link to="/dashboard/manage-property">Manage Properties</Link>
      </li>
    ),
  ];
  return (
    <div className="justify-between md:flex gap-8 min-h-screen">
      <div className="dropdown dropdown-end dropdown-hover fixed top-2 right-2 md:hidden z-50">
        <label tabIndex={0} className="btn">
          <FaChevronDown />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-2"
        >
          {menuItems}
        </ul>
      </div>
      <aside className="hidden md:block -ml-10" aria-label="Sidebar">
        <div className="py-4 px-3 bg-base-100 rounded">
          <ul className="menu p-4 overflow-y-auto w-64 bg-base-200 rounded-lg text-base-content gap-2">
            {menuItems}
          </ul>
        </div>
      </aside>
      <div className="w-full pt-4 md:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
