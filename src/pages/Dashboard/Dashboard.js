import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {getToken, getUser, removeUserSession} from '../../utils/common';
import {Space, Table, Button, Tag, message} from 'antd';
import UserModal from "./UserModal";
import EmailModal from "./EmailModal";
const Dashboard = props => {
  const history = useNavigate();
  const user = getUser();
  const [messageApi,contextHolder] = message.useMessage();
  const [dataTable, setDataTable] = useState([])
  const [modalData, setModalData] = useState({})
  const [modalEmailData, setModalEmailData] = useState({})
  const [visible, setVisible] = useState(false)
  const [visibleEmail, setVisibleEmail] = useState(false)
  const token = getToken();
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
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Active',
      key: 'active',
      dataIndex: 'active',
      render: (_, record) =>
          record.active ? <Tag color='green' key='active'>
            Active
          </Tag> :<Tag color='volcano' key='InActive'>
            InActive
          </Tag>,

    },
    {
      title: 'Logging in',
      key: 'app_id',
      dataIndex: 'app_id',
      render: (_, record) =>
      record.app_id?.appName

    },


    {
      title: 'Registered',
      key: 'register_apps_id',
      dataIndex: 'register_apps_id',
      render: (_, record) =>
          record.register_apps_id.map((item) => <Tag>{item.appName}</Tag>)

    },
    {
      title: 'Active',
      key: 'active',
      dataIndex: 'active',
      render: (_, record) =>
          record.active ? <Tag color='green' key='active'>
            Active
          </Tag> :<Tag color='volcano' key='InActive'>
            InActive
          </Tag>,

    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => handleEditEmail(record)} >Send Email</Button>
            <Button onClick={() => handleEdit(record)} >Edit</Button>
            <Button onClick={() => handleDelete(record._id)} danger>Delete</Button>
          </Space>
      ),
    },
  ];

  // handle click event of logout button
  useEffect(() => {
    getUserTable().then(response => {
      setDataTable(response)
    });
  }, []);

  const handleEdit = async (value) => {
    setVisible(true)
    setModalData(value)
  }


  const handleEditEmail = async (value) => {
    setVisibleEmail(true)
    setModalEmailData(value.email)
  }


  const handleSubmit = async (value) => {
    const id = value._id

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });
      const body = await response.json();
      setVisible(false)
      success('Update user successfully!')
      // Handle form submission here, update user data with the form values
      getUserTable().then(response => {
        setDataTable(response)
      });
    } catch (error) {
      error('Update user failed!')
    }
  }


  const handleSubmitEmail = async (value) => {
    const id = value._id

    try {
      const response = await fetch('http://localhost:3000/mail/send-email', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });
      const body = await response;
      console.log(body)
      setVisibleEmail(false)
        success('Send email successfully!')
      // Handle form submission here, update user data with the form values

    } catch (error) {
      console.log(error)
      setVisibleEmail(false)
    }
  }


  const cancelModal = () => {
    setVisible(false)
  }

  const cancelModalEmail = () => {
    setVisibleEmail(false)
  }


  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const body = await response.json();
    getUserTable().then(response => {
      setDataTable(response)
    });
    return body;
  }

  const getUserTable = async () => {

    const response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const body = await response.json();
    console.log(body)

    return body;
  };


  return (
    <div>

      {contextHolder}
      <Table columns={columns} dataSource={dataTable} />
      <UserModal onSubmit={handleSubmit} initialData={modalData} onCancel={cancelModal} visible={visible} />
        <EmailModal visibleEmail={visibleEmail} onCancelEmail={cancelModalEmail} onSubmitEmail={handleSubmitEmail} email={modalEmailData} />
    </div>
  );
}

export default Dashboard;