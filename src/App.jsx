import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import axios from 'axios';
import {Menu, Layout, Button} from 'antd';
import {
    UserOutlined,
    DashboardOutlined,
    HomeOutlined,
    AndroidOutlined ,
    SettingOutlined
} from '@ant-design/icons';
import {public_api} from './env';

import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import {getToken, getUser, removeUserSession, setUserSession} from './utils/common';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Setting/Profile';
import App1 from './pages/App1';
import NotFound from './pages/NotFound';
import App2 from "./pages/App2";
import ChangePassword from "./pages/Setting/ChangePassword";

const {SubMenu} = Menu;
const { Header, Content, Sider } = Layout;
function App() {
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(getUser());
    const [token, setToken] = useState(getToken());
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        if (!token || !user) {
            return;
        }
        axios.post(`${public_api}/auth/verifyToken`, {id: user._id, token: token}).then(response => {
            // setUserSession(response.data.token, response.data.user);
            setAuthLoading(false);
            if (!response.data.success) {
                removeUserSession();
            }
        }).catch( error => {
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
        // history('/Login');

    }

    return (
        // <BrowserRouter>
        //     <div style={{ display: 'flex', height: '100vh' }}>
        //         {/* Header */}
        //         {token && (
        //             <PageHeader
        //                 className="site-page-header"
        //                 title="Your App Name"
        //                 extra={[
        //                     <div key="logout" className="logout-container">
        //                         <span>Welcome {user.name}!</span>
        //                         <Button key="logoutButton" type="primary" onClick={handleLogout}>
        //                             Logout
        //                         </Button>
        //                     </div>,
        //                 ]}
        //             />
        //         )}
        //         {/* Menu */}
        //         {token && (
        //             <div style={{ width: 250, backgroundColor: '#f0f0f0', padding: '20px' }}>
        //                 <Menu mode="inline" theme="light">
        //
        //                     {user.role === 'Admin' &&      <Menu.Item icon={<HomeOutlined />} key="dashboardMain">
        //                         <NavLink to="/dashboard"> Dashboard</NavLink>
        //                     </Menu.Item>}
        //
        //                     {user.role === 'User' &&
        //                         <Menu.Item icon={<AndroidOutlined />} key="appDetails">
        //                         <NavLink to="/app1"> App1</NavLink>
        //                     </Menu.Item>}
        //
        //                     {user.role === 'User' &&
        //                     <Menu.Item icon={<AndroidOutlined />} key="app2">
        //                         <NavLink to="/app2"> App 2</NavLink>
        //                     </Menu.Item>}
        //                     {user.role === 'User' &&<Menu.Item icon={<AndroidOutlined />} key="app3">
        //                         <NavLink to="/app2"> App 3</NavLink>
        //                     </Menu.Item>}
        //                     <Menu.SubMenu icon={<SettingOutlined />} title="Setting">
        //                     <Menu.Item  key="profile" >
        //                         <NavLink to="/setting/profile">Profile</NavLink>
        //                     </Menu.Item>
        //                         <Menu.Item key="change-password" >
        //                             <NavLink to="/setting/change-password">Change Password</NavLink>
        //                         </Menu.Item>
        //                     </Menu.SubMenu>
        //                 </Menu>
        //             </div>
        //         )}
        //
        //         {/* Content */}
        //         <div style={{ flex: 1, padding: '20px' }}>
        //             <Routes>
        //                 <Route path="*" element={<NotFound />} />
        //
        //                 <Route element={<PublicRoutes />}>
        //                     <Route path="/login" element={<Login />} />
        //                     <Route path="/register" element={<Register />} />
        //                 </Route>
        //                 <Route element={<PrivateRoutes />}>
        //                     <Route index path="/dashboard" element={<Dashboard />} />
        //                     <Route path="/setting/profile" element={<Profile />} />
        //                     <Route path="/setting/change-password" element={<ChangePassword />} />
        //                     <Route path="/app1" element={<App1 />} />
        //                     <Route path="/app2" element={<App2 />} />
        //                 </Route>
        //             </Routes>
        //         </div>
        //
        //         {/* Header */}
        //         {token && (
        //         <div style={{ padding: '20px' }}>
        //             <div>
        //                 Welcome {user.name}!
        //                 <input type="button" onClick={handleLogout} value="Logout" />
        //             </div>
        //         </div>    )}
        //
        //     </div>
        // </BrowserRouter>


        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                {/* Sidebar */}
                {token && (
                    <Sider theme="dark">
                        <h2 style={{ color: 'white', paddingLeft:"37px" }}>{user.role}</h2>
                        <Menu mode="inline" theme="dark"  >

                            {user.role === 'Admin' && <Menu.Item icon={<HomeOutlined />} key="dashboardMain">
                                <NavLink to="/dashboard"> Dashboard</NavLink>
                            </Menu.Item>}

                            {user.role === 'User' &&
                                <Menu.Item icon={<AndroidOutlined />} key="appDetails">
                                    <NavLink to="/app1"> App1</NavLink>
                                </Menu.Item>}

                            {user.role === 'User' &&
                                <Menu.Item icon={<AndroidOutlined />} key="app2">
                                    <NavLink to="/app2"> App 2</NavLink>
                                </Menu.Item>}
                            {user.role === 'User' &&<Menu.Item icon={<AndroidOutlined />} key="app3">
                                <NavLink to="/app2"> App 3</NavLink>
                            </Menu.Item>}
                            <Menu.SubMenu icon={<SettingOutlined />} title="Setting">
                                <Menu.Item  key="profile" >
                                    <NavLink to="/setting/profile">Profile</NavLink>
                                </Menu.Item>
                                <Menu.Item key="change-password" >
                                    <NavLink to="/setting/change-password">Change Password</NavLink>
                                </Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                )}

                <Layout className="site-layout">
                    {/* Header */}
                    {token && (
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                            <div className="header-content">
                                <h2 style={{ color: 'white' }}>
                                    {/*Your App Name*/}

                                </h2>
                                <div className="user-info">
                                    <span style={{ color: 'white' }}>Welcome {user.name}!</span>
                                    <Button type="link" onClick={handleLogout} style={{ color: 'white' }}>
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </Header>
                    )}

                    {/* Content */}
                    <Content style={{ margin: '16px' }}>
                        <Routes >
                            <Route path="*" element={<Login />} />
                            <Route element={<PublicRoutes />}>
                                <Route path="/" element={<Login />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Route>
                            <Route element={<PrivateRoutes />}>
                                <Route index path="/dashboard" element={<Dashboard />} />
                                <Route path="/setting/profile" element={<Profile />} />
                                <Route path="/setting/change-password" element={<ChangePassword />} />
                                <Route path="/app1" element={<App1 />} />
                                <Route path="/app2" element={<App2 />} />
                            </Route>
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
}

export default App;