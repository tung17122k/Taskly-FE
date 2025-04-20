import React, { useContext, useEffect, useMemo, useState } from 'react';
import { SettingOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';


type MenuItem = Required<MenuProps>['items'][number];




const Header: React.FC = () => {
    const [current, setCurrent] = useState('mail');
    const [userRole, setUserRole] = useState<string | null>(null);

    const { auth, setAuth } = useContext(AuthContext);
    // console.log(">>>check auth", auth);

    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = auth.user;

        if (storedUser) {
            try {
                setUserRole(storedUser.role || null);
            } catch (e) {
                console.error('Invalid user data in localStorage');
            }
        }
    }, []);


    const handleLogout = () => {
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
                icon: <ShoppingOutlined />,
            },
            ...(auth?.isAuthenticated && auth?.user?.role === "admin" ? [{
                label: <Link to="/user">Users</Link>,
                key: 'user',
                icon: <UserOutlined />,
            }] : []),
            {
                label: 'Setting',
                key: 'SubMenu',
                icon: <SettingOutlined />,
                children: auth.isAuthenticated ? [
                    { label: 'Đăng xuất', key: 'logout' },
                ] : [
                    { label: <Link to="/login">Đăng nhập</Link>, key: 'login' }
                ]
            },
        ];


        return baseItems;
    }, [userRole]);


    const onClick: MenuProps['onClick'] = (e) => {
        // console.log('click ', e);
        setCurrent(e.key);
        if (e.key === 'logout') {
            handleLogout();
        }
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;