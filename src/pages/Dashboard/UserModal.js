import React, {useEffect, useState} from 'react';
import {Form, Input, Select, Button, Modal, message, Checkbox} from 'antd';
import axios from "axios";

const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

const UserFormModal = ({visible, onCancel, onSubmit, initialData}) => {
    const [form] = Form.useForm();
    const [roles, setRoles] = useState(initialData.role );
    const [appList, setAppList] = useState( []);

    useEffect(() => {
        setRoles(initialData.role)
        getAppName();
        form.setFieldsValue({
            name: initialData?.name || '',
            email: initialData?.email || '',
            role: initialData?.role || '',
            active: initialData?.active || false,
            register_apps_id: initialData?.register_apps_id?.map((item) => item._id),
            // Set other fields accordingly
        });
    }, [form, initialData]);


    const getAppName = async () => {
        const response = await axios.get('http://localhost:3000/app/app_name');
        const data = response.data;
        setAppList(data.data);
        return data;
    }

    const onFinish = (values) => {
        onSubmit({
            ...initialData, name: values.name,
            email: values.email,
            role: values.role,
            active: values.active,
            register_apps_id: values.register_apps_id,
        });
    };

    return (
        <Modal
            title="User Information"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    Save
                </Button>,
            ]}
        >
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
                <Form.Item label="Role"  name="role" rules={[{required: true, message: 'Please select a role!'}]}>
                    <Select onChange={(value) => {setRoles(value)}}>
                        <Option value="User">User</Option>
                        <Option value="Admin">Admin</Option>
                    </Select>
                </Form.Item>
                {
                    roles === 'User' &&
                    <Form.Item
                        name="register_apps_id"
                        label="Register APP"
                        rules={[{ required: true, message: 'Please select App!' }]}
                    >
                        <CheckboxGroup >
                            {
                                appList?.map((app) =>
                                    <Checkbox value={app._id}>{app.appName}</Checkbox>)
                            }
                        </CheckboxGroup>
                    </Form.Item>
                }
                <Form.Item label="Active" name="active">
                    <Select>
                        <Option value={true}>Active</Option>
                        <Option value={false}>InActive</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserFormModal;
