import React from 'react';
import {Navigate, Outlet} from "react-router-dom";


const ProtectedRoute = () => {
    const token = localStorage.getItem("appUserId")

    if (!token) {
        return <Navigate to="/login" replace/>;
    }
    return <Outlet/>

};

export default ProtectedRoute;
