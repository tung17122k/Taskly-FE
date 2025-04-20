import React, { useContext } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, notification } from 'antd';
import { loginApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/auth.context';




const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);
    const onFinish: FormProps<IUserData>['onFinish'] = async (values) => {
        try {
            const { email, password } = values as IUserData;

            const res = await loginApi({ email, password });
            console.log('>>>>res:', res);

            if (res.EC === 0) {
                notification.success({
                    message: 'Success',
                    description: 'Đăng nhập thành công!',
                });

                Cookies.set('access_token', res.data.access_token, {
                    expires: 1, // 1 ngày
                    sameSite: 'Strict'
                });

                Cookies.set('refresh_token', res.data.refresh_token, {
                    expires: 7, // 7 ngày
                    sameSite: 'Strict',
                });

                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);

                // localStorage.setItem('user', JSON.stringify(res.data.user));
                setAuth({
                    isAuthenticated: true,
                    user: res.data.user
                });

                navigate('/');
            } else {
                notification.error({
                    message: 'Error',
                    description: res?.message
                })
            }
        } catch (error: any) {
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
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }, {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!'
                    }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Đăng Nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default LoginPage