import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getToken, getUser, removeUserSession} from '../../utils/common';
import {Space, Table, Button, Tag, Upload, message} from 'antd';
import {UploadOutlined, DownloadOutlined} from '@ant-design/icons';

const AppConfig = props => {
    const history = useNavigate();
    const user = getUser();
    const [messageApi, contextHolder] = message.useMessage();
    const [dataTable, setDataTable] = useState([])
    const [modalData, setModalData] = useState({})
    const [modalEmailData, setModalEmailData] = useState({})
    const [visible, setVisible] = useState(false)
    const [visibleEmail, setVisibleEmail] = useState(false)
    const [file, setFile] = useState(null)
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
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tên hàng',
            dataIndex: 'ten_hang',
            key: 'ten_hang',
        },
        {
            title: 'Vị trí',
            dataIndex: 'vi_tri',
            key: 'vi_tri',

        },
        {
            title: 'mã AI',
            dataIndex: 'ma_AI',
            key: 'ma_AI',
        },
        {
            title: 'Barcode',
            dataIndex: 'Barcode',
            key: 'Barcode',
        },
        {
            title: 'User',
            dataIndex: 'user_id',
            key: 'user_id',
            render: (data) => <Tag key={data._id}>{data.name}</Tag>,

        },
        {
            title: 'App',
            dataIndex: 'app_id',
            key: 'app_id',
            render: (data) => <Tag key={data._id}>{data.appName}</Tag>,

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
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tên hàng',
            dataIndex: 'ten_hang',
            key: 'ten_hang',
        },
        {
            title: 'Vị trí',
            dataIndex: 'vi_tri',
            key: 'vi_tri',

        },
        {
            title: 'mã AI',
            dataIndex: 'ma_AI',
            key: 'ma_AI',
        },
        {
            title: 'Barcode',
            dataIndex: 'Barcode',
            key: 'Barcode',
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

    // handle click event of logout button
    useEffect(() => {
        getAppDetails().then(response => {
            setDataTable(response)

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

        const response = await fetch('http://localhost:3000/app-config', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const body = await response.json();
        return body.data;
    };

    const getfileDetail = (file) => {
        let originFileNm = file.name;
        let fileUpload = file.originFileObj;
console.log(file)
        return [originFileNm, fileUpload];
    };



    const uploadFile = async (file) => {
        let formData = new FormData();
        formData.append("file", file.fileList[0]);
        console.log(formData, 'formData')

        console.log(formData, 'formData')
        const response = await fetch('http://localhost:3000/app-config/upload', {
                method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'content-type': `multipart/form-data`,
            },
                body: formData,
            },
        );

        return response;

    }


    useEffect(() => {
        if(!file) return;
        uploadFile(file).then(response => {
            console.log(response)
        });

    }, [file]);


    return (
        <div>
            <Upload
                action={false}
                accept="application/vnd.ms-excel,.application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(file) => setFile(file)}

                beforeUpload={file => {
                    return false;
                }}
                showUploadList={false}
            >
                <Button icon={<UploadOutlined/>}>Upload</Button>
            </Upload>


            {contextHolder}
            {
                dataTable.length > 0 &&
                <Table columns={user.role === "Admin" ? columnsAdmins : columnsUsers} dataSource={dataTable}/>
            }
        </div>
    );
}

export default AppConfig;