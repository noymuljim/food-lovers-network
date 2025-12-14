import React, { use } from 'react';
import { GoHomeFill } from 'react-icons/go';
import { VscOpenPreview } from 'react-icons/vsc';
import { Link, NavLink } from 'react-router';
import logo from '../assets/logo.png'
import { AuthContext } from '../Context/AuthContext';

import userlogo from '../assets/user-login-icon-14.png'
import { toast } from 'react-toastify';

const Navbar = () => {
  const {user,logout}=use(AuthContext)

  const handleLogOut=()=>{
    logout()
    .then(() => {
  toast.success('Sign-out successful.')
})
.catch((error) => {
  console.log(error)
toast.error(error)
});

  }

  return (
    
    <div className="navbar bg-white text-black shadow-sm z-[9999] relative">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[9999] mt-3 w-52 p-2 shadow"
          >

          <li>
             <NavLink to={"/"}>
               <GoHomeFill />
               Home
             </NavLink>
           </li>

           <li>
             <NavLink to={"/"}>
               <VscOpenPreview />


              All Review
             </NavLink>
           </li>

          </ul>
        </div>
        <a className="btn btn-ghost text-xl"><img className='w-[80px]' src={logo} alt="" /></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
             <NavLink to={"/"}>
               <GoHomeFill />
               Home
             </NavLink>
           </li>

           <li>
             <NavLink to={"/allReviews"}>
               <VscOpenPreview />


              All Reviews
             </NavLink>
           </li>

        </ul>
      </div>



      {/* end */}
       <div className="navbar-end gap-3 text-white">
       
       
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={user.photoURL || {userlogo}}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              <li>
                <Link to={"/addReview"}>
                  Add review
                </Link>
              </li>

              <li>
                <Link to={"/myReview"}>
                  My review
                </Link>
              </li>

             


              {/* theme */}
              {/* <input onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem('theme') === "dark"}
                className="toggle" /> */}




              <li>
                <button
                   onClick={handleLogOut}
                  className="btn btn-xs text-left bg-linear-to-r from-pink-500 to-red-500 text-white"
                >
             Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/auth/login"}
            className="btn rounded-full border-gray-300  btn-sm customBtn text-white"
          >
            {" "}
             Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;