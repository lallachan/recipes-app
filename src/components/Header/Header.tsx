import React from 'react';
import classes from "./style.module.css";
import {Button, Dropdown, MenuProps, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import {useUserData} from "../../hooks/userState";
import {SettingOutlined} from "@ant-design/icons";
import {useDeleteUser} from "../../hooks/useAuthorization";



const Header: React.FC = () => {
    const {data: user} = useUserData();
    const {mutate: deleteUser, isLoading} = useDeleteUser();
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("appUserId");
        navigate("/login");
    };

    const handleDeleteUser = () => {
        deleteUser()
    };

    const items: MenuProps['items'] = [
        {
            label: <a onClick={handleLogout}>Log out</a>,
            key: '0',
        },
        {
            label: <a onClick={handleDeleteUser}>Delete account</a>,
            key: '1',
        },
    ];


    return (
        <div className={classes.header}>
            <h1>Dashboard<span className={classes.name}>Welcome back <span
                className={classes.userName}>{user?.data.appUser.name}</span>!</span></h1>
            <div className={classes.buttonContainer}>
                {isLoading ? <Spin/> : <Dropdown menu={{items}} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Button icon={<SettingOutlined width={20} height={20}/>} type={"text"}/>
                    </a>
                </Dropdown>}
            </div>
        </div>
    );
};

export default Header;
