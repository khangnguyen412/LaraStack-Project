import { Link } from 'react-router-dom';

/**
 * Ant Design
 */
import { UserOutlined, HomeOutlined, LogoutOutlined, PieChartOutlined, FileOutlined, CopyOutlined, ProductOutlined } from '@ant-design/icons';

export const menuItems = (Profile: { user_name: string }, HandleLogout: () => void) => [
    {
        key: "home",
        label: <Link to="/home">Home</Link>,
    },
    {
        key: "profile",
        label: <span>Welcome, {Profile?.user_name}</span>,
        icon: <UserOutlined />,
        children: [
            { label: <Link to={"/admin/user-profile"}>Profile</Link>, key: 'setting:1' },
            { label: 'Logout', key: 'setting:3', onClick: HandleLogout },
        ],
    },
];

export const menuItemsMobile = (HandleLogout: () => void) => [
    {
        key: "home-mobile",
        icon: <HomeOutlined />,
        label: <Link to="/home">Home</Link>,
    },
    {
        key: "profile-mobile",
        icon: <UserOutlined />,
        label: <Link to={"/admin/user-profile"} >Profile</Link>,
    },
    {
        key: "logout-mobile",
        onClick: HandleLogout,
        icon: <LogoutOutlined />,
        label: <Link to="/Logout">Logout</Link>,
    },
];

export const menuItemsSidebar = (HandleLogout: () => void) => [
    {
        key: "dashboard",
        label: <Link to="/admin">Admin Board</Link>,
        icon: <PieChartOutlined />,
        access: ['Admin', 'Manager'],
    },
    {
        key: "page",
        label: <Link to="">Page</Link>,
        icon: <FileOutlined />,
        access: ['Admin', 'Manager'],
    },
    {
        key: "blog",
        label: <Link to="">Blog</Link>,
        icon: <CopyOutlined />,
        access: ['Admin', 'Manager'],
        children: [
            {
                key: 'blog-list',
                label: <Link to={'/admin/blog'}>Blog List</Link>,
            },
            {
                key: 'blog-category',
                label: <Link to={'/admin/blog-category'}>Category</Link>,
            },
        ],
    },
    {
        key: "users",
        label: <Link to="">Users</Link>,
        icon: <UserOutlined />,
        access: ['Admin', 'Manager'],
        children: [
            {
                key: 'users-list',
                label: <Link to={'/admin/users'}>User List</Link>,
            },
            {
                key: 'users-creation',
                label: <Link to={'/admin/users-creation'}>User Creation</Link>,
            },
            {
                key: 'users-profile',
                label: <Link to={''}>Profile</Link>,
            },
        ],
    },
    {
        key: "product",
        label: <Link to="">Product</Link>,
        icon: <ProductOutlined />,
        access: ['Admin', 'Manager'],
        children: [
            {
                key: 'product-list',
                label: <Link to={''}>Product List</Link>,
            },
            {
                key: 'product-category',
                label: <Link to={''}>Category</Link>,
            },
        ],
    },
    {
        key: "logout",
        label: <Link to="">Logout</Link>,
        icon: <LogoutOutlined />,
        onClick: HandleLogout,
    }
]