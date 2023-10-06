import React from "react";
import classes from "./style.module.css";
import LoginForm from "../../components/auth/LoginForm/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm/RegisterForm";
import {Navigate} from "react-router-dom";


const LoginPage = () => {


    const token = localStorage.getItem("appUserId")

    if (token) {
        return <Navigate to="/dashboard" replace/>;
    }

    return (
        <div>
            <div className={classes.container}>
                <h2 className={classes.title}>Login</h2>
                <LoginForm/>
            </div>
            <div className={classes.container}>
                <h1>Register</h1>
                <RegisterForm/>
            </div>
        </div>
    );
};

export default LoginPage;
