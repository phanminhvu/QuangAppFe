import  {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {getToken, getUser, removeUserSession} from '../../utils/common';
import {Switch , Card, Table,  message} from 'antd';
import {public_api} from "../../env";

// import UserModal from "./UserModal";
// import EmailModal from "./EmailModal";
const Dashboard = props => {

  const [messageApi,contextHolder] = message.useMessage();
  const [dataTable, setDataTable] = useState([])

  const token = getToken();

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'user_id',
      key: 'user_id',
      width: '15%',
      render: (user_id) => <a>{user_id.name}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'user_id',
      key: 'email',
      width: '20%',

      render: (user_id) => <a>{user_id.email}</a>,
    },
    {
      title: 'app1',
      key: 'app1',
      dataIndex: 'app1',
      render: (_, record) =>
          <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked={record.app1} onChange={(checked) => onChange(checked, record, 'app1')} />,

    },
    {
      title: 'app2',
      key: 'app2',
      dataIndex: 'app2',
      render: (_, record) =>
          <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked={record.app2} onChange={(checked) => onChange(checked, record, 'app2')} />,

    },
    {
      title: 'app3',
      key: 'app3',
      dataIndex: 'app3',
      render: (_, record) =>
          <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked={record.app3} onChange={(checked) => onChange(checked, record, 'app3')} />,

    },


    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //       <Space size="middle">
    //         <Button onClick={() => handleEditEmail(record)} >Send Email</Button>
    //         <Button onClick={() => handleEdit(record)} >Edit</Button>
    //         <Button onClick={() => handleDelete(record._id)} danger>Delete</Button>
    //       </Space>
    //   ),
    // },
  ];

  // handle click event of logout button
  useEffect(() => {
    getUserTable().then(response => {
      setDataTable(response)
    });
  }, []);


  const onChange = async (checked, record, type) => {
    let data =  JSON.parse(JSON.stringify(record));
    if(type === 'app1'){
      data = {...data, app1: checked}
    }
    if(type === 'app2'){
        data = {...data, app2: checked}
    }
    if(type === 'app3'){
        data = {...data, app3: checked}
    }

      try {
        const response = await fetch(`${public_api}/admin/phan-quyen`, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const body = await response.json();


        // Handle form submission here, update user data with the form values
        getUserTable().then(response => {
          setDataTable(response)
        });
      } catch (error) {
        error('Update user failed!')
      }
  };

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
  //
  //
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
  //     getUserTable().then(response => {
  //       setDataTable(response)
  //     });
  //   } catch (error) {
  //     error('Update user failed!')
  //   }
  // }
  //
  //
  // const handleSubmitEmail = async (value) => {
  //   const id = value._id
  //
  //   try {
  //     const response = await fetch('http://localhost:3000/mail/send-email', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: 'Bearer ' + token,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(value),
  //     });
  //     const body = await response;
  //     console.log(body)
  //     setVisibleEmail(false)
  //       success('Send email successfully!')
  //     // Handle form submission here, update user data with the form values
  //
  //   } catch (error) {
  //     console.log(error)
  //     setVisibleEmail(false)
  //   }
  // }
  //
  //
  // const cancelModal = () => {
  //   setVisible(false)
  // }
  //
  // const cancelModalEmail = () => {
  //   setVisibleEmail(false)
  // }
  //
  //
  // const handleDelete = async (id) => {
  //   const response = await fetch(`http://localhost:3000/users/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   });
  //   const body = await response.json();
  //   getUserTable().then(response => {
  //     setDataTable(response)
  //   });
  //   return body;
  // }

  const getUserTable = async () => {

    const response = await fetch(`${public_api}/admin/phan-quyen`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const body = await response.json();

    return body;
  };


  return (
      <Card title="Dashboard" bordered={true}>
      {contextHolder}
      <Table columns={columns} dataSource={dataTable.data} />
      {/*<UserModal onSubmit={handleSubmit} initialData={modalData} onCancel={cancelModal} visible={visible} />*/}
      {/*  <EmailModal visibleEmail={visibleEmail} onCancelEmail={cancelModalEmail} onSubmitEmail={handleSubmitEmail} email={modalEmailData} />*/}
    </Card>
  );
}

export default Dashboard;