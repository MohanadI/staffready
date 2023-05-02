import { Modal, Form, Button, Input } from 'antd';
import { useEffect, useState } from 'react';

function Feedback({ openModal, handleCloseModal }) {
    const [isModalOpen, setIsModalOpen] = useState(openModal);
    useEffect(() => {
        setIsModalOpen(openModal);
    }, [openModal]);

    const handleOk = () => {
        setIsModalOpen(false);
        handleCloseModal(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        handleCloseModal(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="Feedback"
            style={{
                top: 50,
            }}
            footer={[]}
            open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                layout={"vertical"}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                            message: 'Please input your Email Address!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Subject!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="body"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Body!',
                        },
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="User Type"
                    name="userType"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your User Type!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Facility or Location"
                    name="facility"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Facility or Location!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="License Id"
                    name="licenseId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your License Id!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ticket Type"
                    name="ticketType"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Ticket Type!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default Feedback;