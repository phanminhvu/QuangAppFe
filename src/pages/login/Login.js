import {Form, Input, Button, Select, Checkbox} from 'antd';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { setUserSession } from '../../utils/common';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
const { Option } = Select;
function LogIn() {
  const initialValues = {
    email: '',
    password: '',
    app_id: '',
  };

  const [form] = Form.useForm();
  const history = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [appList, setAppList] = useState([]);
  useEffect(() => {   getAppName();}, []);

  const handleSubmit = async (values) => {
    console.log(values);
    setIsSubmit(true);
    try {
      const response = await axios.post('http://localhost:3000/app1/users/login', values);
      console.log(response.data);
      if(response.data.success === true){
        setUserSession(response.data.data.token, response.data.data.user);
        window.location.replace("/");

      } else{
        alert(response.data.message);
      }

      // setUserSession(response.data.token, response.data.user);
      // window.location.replace("/dashboard");
      //
      // // history('/dashboard');
      // window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const getAppName = async () => {
    const response = await axios.get('http://localhost:3000/app/app_name');
    const data = response.data;
    setAppList(data.data);
    return data;
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
    return errors;
  };

  return (
      <>
        <div className="bgImg"></div>
        <div className="container">

          <Form
              form={form}
              name="loginForm"
              initialValues={initialValues}
              onFinish={handleSubmit}
          >
            <h1>Sign In</h1>
            <div className="ui divider"></div>
            <div className="ui form">
              <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Email is required!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                  ]}
              >
                <Input placeholder="Email" />
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

              {/*<Form.Item*/}
              {/*    name="app_id"*/}
              {/*    label="App select"*/}
              {/*    rules={[{ required: true, message: 'Please select a role!' }]}*/}
              {/*>*/}
              {/*  <Select>*/}
              {/*    {*/}
              {/*      appList?.map((app) =>*/}
              {/*          <Option value={app._id}>{app.appName}</Option>)*/}
              {/*    }*/}

              {/*  </Select>*/}
              {/*</Form.Item>*/}


              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div className="text">
            Do not have an account yet? <a href="/register">Sign up</a>
          </div>
        </div>
      </>
  );
}

export default LogIn;
