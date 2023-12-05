import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import axios from 'axios';
import {Menu} from 'antd';
import {
    UserOutlined,
    DashboardOutlined,
    HomeOutlined,
} from '@ant-design/icons';

import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import {getToken, getUser, removeUserSession, setUserSession} from './utils/common';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home';
import AppDetail from './pages/AppDetail';
import NotFound from './pages/NotFound';
import AppConfig from "./pages/AppConfig";

const {SubMenu} = Menu;

function App() {
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(getUser());
    const [token, setToken] = useState(getToken());
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        if (!token || !user) {
            return;
        }
        axios.post('http://localhost:3000/auth/verifyToken', {id: user._id, token: token}).then(response => {
            // setUserSession(response.data.token, response.data.user);
            setAuthLoading(false);
            if (!response.data.success) {
                removeUserSession();
            }
        }).catch(error => {
            removeUserSession();
            setAuthLoading(false);
        });
    }, []);





    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>
    }


    const handleLogout = () => {
        removeUserSession();
        window.location.replace("/login");
        // history('/login');

    }

    return (
        <BrowserRouter>
            <div style={{ display: 'flex', height: '100vh' }}>
                {/* Menu */}
                {token && (
                    <div style={{ width: 250, backgroundColor: '#f0f0f0', padding: '20px' }}>
                        <Menu mode="vertical" theme="light">
                            <Menu.Item key="home" icon={<HomeOutlined />}>
                                <NavLink to="/">Home</NavLink>
                            </Menu.Item>
                            {user.role === 'Admin' &&      <Menu.Item key="dashboardMain">
                                <NavLink to="/dashboard"> Dashboard</NavLink>
                            </Menu.Item>}

                            <Menu.Item key="appDetails">
                                <NavLink to="/app_detail"> App Details</NavLink>
                            </Menu.Item>

                            <Menu.Item key="appConfigs">
                                <NavLink to="/app_config"> App Configs</NavLink>
                            </Menu.Item>
                        </Menu>
                    </div>
                )}

                {/* Content */}
                <div style={{ flex: 1, padding: '20px' }}>
                    <Routes>
                        <Route path="*" element={<NotFound />} />

                        <Route element={<PublicRoutes />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route element={<PrivateRoutes />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route index element={<Home />} />
                            <Route path="/app_detail" element={<AppDetail />} />
                            <Route path="/app_config" element={<AppConfig />} />
                        </Route>
                    </Routes>
                </div>

                {/* Header */}
                {token && (
                <div style={{ padding: '20px' }}>
                    <div>
                        Welcome {user.name}!
                        <input type="button" onClick={handleLogout} value="Logout" />
                    </div>
                </div>    )}

            </div>
        </BrowserRouter>
    );
}

export default App;
