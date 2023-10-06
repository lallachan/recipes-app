import React from 'react';
import {Alert, Button, Form, Input, Spin} from "antd";
import {useLoginUser} from "../../../hooks/useAuthorization";
import {LoginType} from "../types";

const LoginForm = () => {
    const {mutate: loginUser, isLoading, isError, error} = useLoginUser();

    const onSubmit = async (values: any) => {
        loginUser({email: values.email, password: values.password});
    };

    const onSubmitFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    if(isLoading) return <Spin/>

    return (
        <>
            {/*// @ts-ignore*/}
        {isError && <Alert message={error?.response.data.message} type="error"/>}
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFailed}
                autoComplete="off"
            >
                <Form.Item<LoginType>
                    label="Email"
                    name="email"
                    rules={[ // ugly fix this
                        {required: true, message: "Please input your email!"},
                        {
                            type: "email",
                            message: "Must be of type email",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<LoginType>
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: "Please input your password!"},
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

export default LoginForm;
