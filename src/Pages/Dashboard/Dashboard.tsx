import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const Dashboard: FC = () => {
  const menuItems = [
    <li><Link to='/dashboard/my-rents'>My Rent Applications</Link></li>,
    <li><Link to='/dashboard/my-sales'>My Sales</Link></li>
  ]
  return (
    <div className='justify-between md:flex gap-8'>
      <div className="dropdown dropdown-end dropdown-hover fixed top-2 right-2 md:hidden z-50">
        <label tabIndex={0} className="btn"><FaChevronDown /></label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-2">
          {/* <!-- Sidebar content here --> */}
          {menuItems}
        </ul>
      </div>
      <aside className="hidden md:block -ml-10" aria-label="Sidebar">
        <div className="py-4 px-3 bg-base-100 rounded">
          <ul className="menu p-4 overflow-y-auto w-64 bg-base-200 rounded-lg text-base-content gap-2">
            {/* <!-- Sidebar content here --> */}
            {menuItems}
          </ul>
        </div>
      </aside>
      <div className='w-full pt-8 md:ml-64'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;