import { Link } from "react-router-dom";
import WelcomeContent from "../common/welcome-content"
import { Button, Form, Input, message } from "antd"
import { registerUser } from "../../../api-services/users-services";

function RegisterPage() {
    const onFinish = async (values: never) => {
        try {
            const response = await registerUser(values);
            message.success(response.message)
        } catch (error: any) {
            message.error(error.message)
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="col-span-1 lg:flex hidden">
                <WelcomeContent />
            </div>
            <div className="h-screen flex items-center justify-center">
                <Form className="flex flex-col gap-5 w-96" layout="vertical" onFinish={onFinish}>
                    <h1 className="text-2xl font-bold text-gray-600">
                        Register Your account</h1>
                    <Form.Item name="name" required label="Name" rules={[{required:true}]}>
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item name="email" required label="Email" rules={[{required:true}]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" required label="Password" rules={[{required:true}]}>
                        <Input placeholder="Password" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>

                    <Link to="/login">
                    Already have an account? Login</Link>
                </Form>
            </div>
        </div>
    );
}

export default RegisterPage