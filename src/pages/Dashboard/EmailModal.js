import React, {useEffect, useState} from 'react';
import {Form, Input,  Select, Button, Modal, message} from 'antd';

const {Option} = Select;
const { TextArea } = Input;
const UserFormModal = ({visibleEmail, onCancelEmail, onSubmitEmail, email}) => {
    const [form] = Form.useForm();


    useEffect(() => {
        form.resetFields();
    }, [visibleEmail, email]);
    const onFinish = (values) => {
        onSubmitEmail({
            to: email,
            subject: values.subject,
            body: values.body,
        });
    };

    return (
        <Modal
            title="Send Email"
            visible={visibleEmail}
            onCancel={onCancelEmail}
            footer={[
                <Button key="cancel" onClick={onCancelEmail}>
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
                <Form.Item label="Subject" name="subject" rules={[{required: true, message: 'Please input your Subject!'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Body" name="body" rules={[{required: true, message: 'Please input your Body!'}]}>
                    <TextArea  rows={4} />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default UserFormModal;
