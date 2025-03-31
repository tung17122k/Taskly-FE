import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <Link to="/">Home Page</Link>,
        key: 'home',
        icon: <MailOutlined />,
    },
    {
        label: 'Welcome',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            { label: 'Đăng nhập', key: 'login' },
            { label: 'Đăng xuất', key: 'logout' },
        ],
    },
    {
        label: <Link to="/user">Users</Link>,
        key: 'user',
        icon: <MailOutlined />,
    },
];

const Header: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;