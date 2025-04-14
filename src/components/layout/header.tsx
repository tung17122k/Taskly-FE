import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

type MenuItem = Required<MenuProps>['items'][number];




const Header: React.FC = () => {
    const [current, setCurrent] = useState('mail');
    const [userRole, setUserRole] = useState<string | null>(null);

    const { auth, setAuth } = useContext(AuthContext);
    console.log(">>>check auth", auth);

    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserRole(parsedUser.role || null);
            } catch (e) {
                console.error('Invalid user data in localStorage');
            }
        }
    }, []);


    const handleLogout = () => {
        // localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setAuth({
            isAuthenticated: false,
            user: {
                email: "",
                username: "",
                role: "",
            },
        })
        navigate('/login');
    };

    const items: MenuItem[] = useMemo(() => {
        const baseItems: MenuItem[] = [
            {
                label: <Link to="/">Home Page</Link>,
                key: 'home',
                icon: <MailOutlined />,
            },
            {
                label: 'Welcome',
                key: 'SubMenu',
                icon: <SettingOutlined />,
                children: auth.isAuthenticated ? [
                    { label: 'Đăng xuất', key: 'logout' },
                ] : [
                    { label: <Link to="/login">Đăng nhập</Link>, key: 'login' }
                ]
            },
        ];

        if (auth?.isAuthenticated && auth?.user?.role === 'admin') {
            baseItems.push({
                label: <Link to="/user">Users</Link>,
                key: 'user',
                icon: <MailOutlined />,
            });
        }

        return baseItems;
    }, [userRole]);


    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        if (e.key === 'logout') {
            handleLogout();
        }
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;