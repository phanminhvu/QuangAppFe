import React, {useEffect, useState} from 'react';
import {getToken, getUser, } from '../../utils/common';
import {useNavigate} from 'react-router-dom';
import {Form, Input,  Card, message,  Button} from 'antd';
import {public_api} from "../../env";

const Profile = () => {
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
            history('/Login');
        } else {
            getMyInfo().then(response => {
                setData(response);
                // Set initial form values when data is fetched
                form.setFieldsValue({
                    name: response?.name || '',
                    email: response?.email || '',
                    phone: response?.phone || '',
                    address: response?.address || '',
                    // Set other fields accordingly
                });
            });
        }
    }, [form, history]);

    const getMyInfo = async () => {
        const token = getToken();
        const response = await fetch(`${public_api}/users/me`, {
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
            phone: values.phone,
            address: values.address,

            // Update other fields accordingly
        }
        try {
            const response = await fetch(`${public_api}/users/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            const body = await response.json();
            success('Update user successfully!')
            // Handle form submission here, update user data with the form values
            setData(body);
        } catch (error) {
            error('Update user failed!')
        }
    };



    return (
        <Card  title="Profiles" bordered={true}>

            {contextHolder}
            <Form
                form={form}
                onFinish={onFinish}
                labelCol={{span: 6}}
                wrapperCol={{span: 8}}

            >
                <Form.Item label="Name" name="name" rules={[{required: true, message: 'Please input your name!'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{required: true, message: 'Please input your email!'}]}>
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                    <Input/>
                </Form.Item>
                <Form.Item label="Address" name="address">
                    <Input/>
                </Form.Item>

                <Form.Item   wrapperCol={{
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                }}>
                    <Button type="primary" htmlType="submit" >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Profile;
