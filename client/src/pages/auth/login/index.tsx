import {Link } from "react-router-dom";
import WelcomeContent from "../common/welcome-content";
import { Button, Form, Input } from "antd"

function LoginPage() {

    const onFinish = (values: any) => {
        console.log("Received values:", values);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="col-span-1 lg:flex hidden">
                <WelcomeContent />
            </div>
            <div className="h-screen flex items-center justify-center">
                <Form className="flex flex-col gap-5 w-96" layout="vertical" onFinish={onFinish}>
                    <h1 className="text-2xl font-bold text-gray-600">
                        Login Your account</h1>
                    <Form.Item name="email" required label="Email" rules={[{required:true}]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" required label="Password" rules={[{required:true}]}>
                        <Input placeholder="Password" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>

                    <Link to="/register">
                    Don't have an account? Register</Link>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage