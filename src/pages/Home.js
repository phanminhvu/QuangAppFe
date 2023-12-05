import React, {useEffect, useState} from 'react';
import {getToken, getUser, setUserSession} from '../utils/common';
import {useNavigate} from 'react-router-dom';
import {Form, Input, Switch, message, Select, Button} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';

const {Option} = Select;
const Home = () => {
    const [messageApi,contextHolder] = message.useMessage();
    const history = useNavigate();
    const [data, setData] = useState(null);
    const [form] = Form.useForm(); // Initialize Ant Design Form instance
    const success = (text) => {
        messageApi.open({
            type: 'success',
            content: text,
        });
    };
    const error = (text) => {
        messageApi.open({
            type: 'error',
            content: text,
        });
    };
    useEffect(() => {
        const token = getToken();
        const user = getUser();
        if (!token || !user) {
            history('/login');
        } else {
            getMyInfo().then(response => {
                setData(response);
                // Set initial form values when data is fetched
                form.setFieldsValue({
                    name: response?.name || '',
                    email: response?.email || '',
                    role: response?.role || '',
                    active: response?.active,
                    // Set other fields accordingly
                });
            });
        }
    }, [form, history]);

    const getMyInfo = async () => {
        const token = getToken();
        const response = await fetch('http://localhost:3000/users/me', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const body = await response.json();
        return body;
    };

    const onFinish = async (values) => {
        const token = getToken();
        const id = getUser()._id;
        const requestData = {
            ...data,
            name: values.name,
            email: values.email,
            role: values.role,
            active: values.active,
            // Update other fields accordingly
        }
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            const body = await response.json();
         console.log(token, body)
            success('Update user successfully!')
            // Handle form submission here, update user data with the form values
            setData(body);
        } catch (error) {
            error('Update user failed!')
        }
    };



    return (
        <div style={{paddingTop: '20px'}}>

            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item label="Name" name="name" rules={[{required: true, message: 'Please input your name!'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{required: true, message: 'Please input your email!'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Role" name="role" rules={[{required: true, message: 'Please select a role!'}]}>
                    <Select>
                        <Option value="User">User</Option>
                        <Option value="Admin">Admin</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Active" name="active">
                    <Select>
                        <Option value={true}>Active</Option>
                        <Option value={false}>InActive</Option>
                    </Select>
                </Form.Item>
                {/* Add more form items for additional fields */}
                {/* For example:
        <Form.Item label="Tokens" name="tokens">
          <Input />
        </Form.Item>
        <Form.Item label="Another Field" name="anotherField">
          <Input />
        </Form.Item>
        */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Home;
