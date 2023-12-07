import { Form, Input, Card, Button, Select, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import axios from "axios";
import {getToken, setUserSession} from "../../utils/common";
import {public_api} from "../../env";

import {useNavigate} from "react-router-dom";
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

function ChangePassword() {
    const [form] = Form.useForm();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [roles, setRoles] = useState('User');
    const [appList, setAppList] = useState([]);
    const history = useNavigate();
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'User',
    };
    const token = getToken();
    const validate = async (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 4) {
            errors.password = 'Password must be more than 4 characters';
        } else if (values.password.length > 10) {
            errors.password = 'Password cannot exceed more than 10 characters';
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Those passwords didn’t match. Try again.";
        }
        return errors;
    };

    const onFinish = async (values) => {
        setFormErrors(await validate(values));
        // setIsSubmit(true);

        const response = await fetch(`${public_api}/users/change-password`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

    };



    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit && form.isFieldsTouched(true)) {
            form.submit();
        }
    }, [formErrors, isSubmit, form]);

    return (
            <Card  title="Change Password" bordered={true}>


                <Form
                    form={form}
                    name="registerForm"
                    onFinish={(values) => onFinish(values)}
                    initialValues={initialValues}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 8}}
                >

                    <div className="ui form">

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                { required: true, message: 'Password is required!' },
                                { min: 4, message: 'Password must be at least 4 characters!' },
                                { max: 10, message: 'Password cannot exceed 10 characters!' },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("The two passwords don't match!")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm password" />
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
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>

            </Card>
    );
}

export default ChangePassword;
