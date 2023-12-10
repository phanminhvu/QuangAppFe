import React, {useEffect} from 'react';
import {Layout, Menu} from 'antd';
import { NavLink } from 'react-router-dom';
import {
    HomeOutlined,
    AndroidOutlined,
    SettingOutlined
} from '@ant-design/icons';
const {  Sider } = Layout;
const CustomMenu = ({ user, token }) => {
    useEffect(() => {
        const handleStorage = () => {
            // Place for a function responsible for
            // pulling and displaying local storage data
        }

        window.addEventListener('storage', handleStorage())
        return () => window.removeEventListener('storage', handleStorage())
    }, [])
    const renderMenu = () => {
        if (token) {
            return (
                <Sider theme="dark">
                <Menu mode="inline" theme="dark">
                    <h2 style={{ color: 'white', paddingLeft: "37px" }}>{user.role}</h2>
                    {user.role === 'Admin' &&
                        <Menu.Item icon={<HomeOutlined />} key="dashboardMain">
                            <NavLink to="/dashboard"> Dashboard</NavLink>
                        </Menu.Item>
                    }

                    {user.role === 'User' &&
                        <Menu.Item icon={<AndroidOutlined />} key="appDetails">
                            <NavLink to="/app1"> App1</NavLink>
                        </Menu.Item>
                    }

                    {user.role === 'User' &&
                        <Menu.Item icon={<AndroidOutlined />} key="app2">
                            <NavLink to="/app2"> App 2</NavLink>
                        </Menu.Item>
                    }
                    {user.role === 'User' &&
                        <Menu.Item icon={<AndroidOutlined />} key="app3">
                            <NavLink to="/app3"> App 3</NavLink>
                        </Menu.Item>
                    }
                    <Menu.SubMenu icon={<SettingOutlined />} title="Setting">
                        <Menu.Item key="profile">
                            <NavLink to="/setting/profile">Profile</NavLink>
                        </Menu.Item>
                        <Menu.Item key="change-password">
                            <NavLink to="/setting/change-password">Change Password</NavLink>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
                </Sider>
            );
        } else {
            // Render a different UI if no token is present (handle guest user)
            return (
           ""
            );
        }
    };

    return (
        <div>
            {renderMenu()}
        </div>
    );
};

export default CustomMenu;
