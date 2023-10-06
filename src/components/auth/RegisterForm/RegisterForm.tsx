import React from 'react';
import {Alert, Button, Form, Input, Spin} from "antd";
import {useRegisterUser} from "../../../hooks/useAuthorization";
import {RegisterType} from "../types";

const RegisterForm = () => {
    const {mutate: registerUser, isLoading, data, isError, error} = useRegisterUser();

    const onSubmit = async (values: any) => {
        registerUser({name: values.name, email: values.email, password: values.password})
    };

    const onSubmitFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    if(isLoading) return <Spin/>

    return (
        <>
            {/*// @ts-ignore*/}
            {isError && <Alert message={error?.response.data.message} type="error"/>}
            {data && <Alert message={data?.data.message} type="success"/>}
        <Form
            name="register"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
            onFinish={onSubmit}
            onFinishFailed={onSubmitFailed}
            autoComplete="off"
        >
            <Form.Item<RegisterType>
                label="Name"
                name="name"
                rules={[{required: true, message: "Please input your name!"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item<RegisterType>
                label="Email"
                name="email"
                rules={[
                    {required: true, message: "Please input your email!"},
                    {
                        type: "email",
                        message: "Must be of type email",
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item<RegisterType>
                label="Password"
                name="password"
                rules={[
                    {required: true, message: "Please input your password!"},
                    {
                        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                        message: "Password must contain at least one letter, one number, and be at least 8 characters long.",
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </>
    );
};

export default RegisterForm;
