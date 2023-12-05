import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {getToken, getUser, removeUserSession} from '../../utils/common';
import {Space, Table, Button, Tag, message} from 'antd';

const AppDetail = props => {
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
  const columnsAdmins = [
    {
      title: 'Name',
      dataIndex: 'appName',
      key: 'appName',
      render: (text) => <a>{text}</a>,
    },
 {
      title: 'Total Loggin',
      dataIndex: 'userLoggin',
      key: 'totalLoggin',
      render: (data) => data.count,
    },
     {
      title: 'User Loggin',
      dataIndex: 'userLoggin',
      key: 'userLoggin',
      render: (data) => data?.users.map((item) => <Tag key={item._id}>{item.name}</Tag>),

    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
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
            {/*<Button onClick={() => handleEditEmail(record)} >Send Email</Button>*/}
            {/*<Button onClick={() => handleEdit(record)} >Edit</Button>*/}
            <Button onClick={() => handleDelete(record._id)} danger>Delete</Button>
          </Space>
      ),
    },
  ];

  const columnsUsers = [
    {
      title: 'Name',
      dataIndex: 'appName',
      key: 'appName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
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

  ];

  // handle click event of logout button
  useEffect(() => {
    getAppDetails().then(response => {
      setDataTable(response)
      console.log(response, 'alo')

    });
  }, []);

  // const handleEdit = async (value) => {
  //   setVisible(true)
  //   setModalData(value)
  // }
  //
  //
  // const handleEditEmail = async (value) => {
  //   setVisibleEmail(true)
  //   setModalEmailData(value.email)
  // }


  // const handleSubmit = async (value) => {
  //   const id = value._id
  //
  //   try {
  //     const response = await fetch(`http://localhost:3000/users/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         Authorization: 'Bearer ' + token,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(value),
  //     });
  //     const body = await response.json();
  //     setVisible(false)
  //     success('Update user successfully!')
  //     // Handle form submission here, update user data with the form values
  //     getAppDetails().then(response => {
  //       setDataTable(response)
  //     });
  //   } catch (error) {
  //     error('Update user failed!')
  //   }
  // }



  // const cancelModal = () => {
  //   setVisible(false)
  // }
  //
  // const cancelModalEmail = () => {
  //   setVisibleEmail(false)
  // }


  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/app/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const body = await response.json();
    getAppDetails().then(response => {
      setDataTable(response)

    });
    return body;
  }

  const getAppDetails = async () => {

    const response = await fetch('http://localhost:3000/app', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const body = await response.json();
console.log(body.data, 'blo')
    return body.data;
  };

  console.log(dataTable)

  return (
    <div>

      {contextHolder}
      {
        dataTable.length > 0 &&
          <Table columns={user.role === "Admin" ? columnsAdmins : columnsUsers} dataSource={dataTable} />

      }

    </div>
  );
}

export default AppDetail;