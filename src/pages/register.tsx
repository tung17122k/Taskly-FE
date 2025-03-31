import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { createUserApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';




const RegisterPage: React.FC = () => {
    const navigate = useNavigate();


    const onFinish: FormProps<IUserData>['onFinish'] = async (values) => {
        try {
            const { username, email, password, confirmPassword } = values as IUserData;
            // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp nhau không
            if (password === confirmPassword) {
                const res = await createUserApi({ username, email, password });
                console.log('>>>>res:', res);
                if (res) {
                    notification.success({
                        message: 'Success',
                        description: 'Đăng ký thành công!',
                    });
                    navigate('/login');
                } else {
                    notification.error({
                        message: 'Error',
                        description: 'Đăng ký không thành công!',
                    });
                }
            }

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div style={{
            margin: "50px"
        }}>
            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}

                autoComplete="off"
                layout='vertical'
            >
                <Form.Item<IUserData>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<IUserData>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item<IUserData>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }, {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!'
                    }]}
                >
                    <Input.Password />
                </Form.Item>
                {/* https://ant.design/components/form#form-demo-register  confirm password*/}
                <Form.Item<IUserData>
                    label="Nhập lại mật khẩu"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default RegisterPage