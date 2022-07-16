import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Link, NavLink } from 'react-router-dom';
import { removeUser } from '../features/userSlice';

const Navbar: FC = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const email = user?.email;
    const dispatch = useAppDispatch();


    const handleSignOut = () => {
        dispatch(removeUser());
    }

    const menuItems: JSX.Element = <div className='text-lg md:flex md:gap-6 font-semibold'>
        <li><NavLink to='/'>Rent</NavLink></li>
        <li><NavLink to='/sale'>Sale</NavLink></li>
        {
            email && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        }
    </div>
    const authItems: JSX.Element = <div className='flex flex-col md:flex-row gap-2 md:gap-4 mt-3'>
        {
            user?.email ?
                <div className="dropdown dropdown-end dropdown-hover">
                    <label tabIndex={0} className="btn m-1">{user?.name && user?.name[0]}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        <li><button onClick={handleSignOut} className='btn btn-sm md:btn-md btn-primary mt-2'>SignOut</button></li>
                    </ul>
                </div>
                :
                <>
                    <Link to='/login' className='btn btn-sm md:btn-md btn-outline btn-primary'>Login</Link>
                    <Link to='/sign-up' className='btn btn-sm md:btn-md btn-primary'>SignUp</Link>
                </>
        }
    </div>
    return (
        <div className="navbar bg-white fixed top-0 z-40">
            <div className="">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                        {authItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-lg md:text-2xl">Rent a Property</Link>
            </div>
            <div className="navbar-start hidden md:flex md:ml-14">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end hidden md:flex">
                {authItems}
            </div>
        </div>
    );
};

export default Navbar;