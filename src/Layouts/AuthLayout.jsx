import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
           
            <Outlet>
               
            </Outlet>
            <ToastContainer />
        </div>
    );
};

export default AuthLayout;