import {Form, Input, Button, Spin , message} from 'antd';
import { useState, useEffect } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {public_api} from "../../env";


function Register() {
  const [form] = Form.useForm();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [messageApi,contextHolder] = message.useMessage();
  const error = (text) => {
    messageApi.open({
      type: 'error',
      content: text,
    });
  };
  const history = useNavigate();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
  };

  const validate = async (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = 'Username is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
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
    setIsSubmit(true);

    setFormErrors(await validate(values));


    axios.post(`${public_api}/users/signup`, values).then(response => {
      history('/Login');
    }).catch(e => {

      error(e.response.data.message);
    });
    setIsSubmit(false)
  };



  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit && form.isFieldsTouched(true)) {
      form.submit();
    }
  }, [formErrors,  form]);

  return (
      <>
        {contextHolder}
        <div className="bgImg"></div>
        <div className="container">
          {Object.keys(formErrors).length === 0 && isSubmit ? (
              <div className="ui message success">Signed in successfully</div>
          ) : (
              console.log('Entered Details')
          )}

          <Form
              form={form}
              name="registerForm"
              onFinish={(values) =>
              {
                onFinish(values)

              }
          }
              initialValues={initialValues}
          >
            <h1>Sign Up</h1>
            <div className="ui divider"></div>
            <div className="ui form">
              <Form.Item
                  name="name"
                  label="Username"
                  rules={[{ required: true, message: 'Username is required!' }]}
              >
                <Input placeholder="Choose a name" />
              </Form.Item>



              <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Email is required!' },
                    {
                      type: 'email',
                      message: 'Please enter a valid email address!',
                    },
                  ]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
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
              <Form.Item>
                <Button type="primary" disabled={isSubmit} htmlType="submit">
                  {isSubmit ? <Spin/> : 'Submit'}
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div className="text">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </div>
      </>
  );
}

export default Register;
