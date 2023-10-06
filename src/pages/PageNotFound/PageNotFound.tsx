import React from 'react';
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import classes from "./style.module.css"

const PageNotFound = () => {

    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate("/dashboard")
    }

    return (
        <div className={classes.centerDiv}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={handleGoBack}>Back Home</Button>}
            />
        </div>
    );
};

export default PageNotFound;
