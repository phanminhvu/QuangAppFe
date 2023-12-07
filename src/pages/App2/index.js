import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getToken, getUser, removeUserSession} from '../../utils/common';
import {Space, Table, Button, Tag,Result, Upload, message} from 'antd';
import {UploadOutlined, DownloadOutlined} from '@ant-design/icons';

const App2 = props => {




    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Result
                status="403"
                title="You don't have access to this app yet."
                subTitle="You need to buy access to use this application."

            />
        </div>
    );
}

export default App2;