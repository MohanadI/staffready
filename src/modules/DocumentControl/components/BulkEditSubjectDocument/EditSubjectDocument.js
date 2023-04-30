import { Modal, message, Button, Input, Steps } from 'antd';
import { useEffect, useState } from 'react';
import SelectDocumentsStep from './SelectDocumentsStep';

function EditSubjectDocument({ openModal, handleCloseModal }) {
    const [isModalOpen, setIsModalOpen] = useState(openModal);
    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title: 'Select Documents',
            content: <SelectDocumentsStep />,
        },
        {
            title: 'Document Properties',
            content: 'Document Properties',
        },
        {
            title: 'Reviewers',
            content: 'Reviewers',
        },
        {
            title: 'Final Reviewers',
            content: 'Final Reviewers',
        },
        {
            title: 'Approvers',
            content: 'Approvers',
        },
        {
            title: 'Summary',
            content: 'Summary',
        }
    ];

    useEffect(() => {
        setIsModalOpen(openModal);
    }, [openModal]);

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
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

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'left',
        marginTop: 16,
    };

    return (
        <Modal
            width={950}
            title="Bulk Edit Documents"
            style={{
                top: 50,
            }}
            footer={[]}
            open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        >
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
                style={{
                    marginTop: 24,
                    textAlign: "end"
                }}
            >
                <Button
                    size='small'
                    style={{
                        margin: '0 8px',
                    }}
                    danger
                    onClick={() => handleCancel()}
                >
                    Cancel
                </Button>
                {current < steps.length - 1 && (
                    <Button size='small' type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button size='small' type="primary" onClick={() => message.success('Processing complete!')}>
                        Finish
                    </Button>
                )}
                <Button
                    disabled={current === 0}
                    size='small'
                    style={{
                        margin: '0 8px',
                    }}
                    onClick={() => prev()}
                >
                    Previous
                </Button>
            </div>
        </Modal>
    )
}

export default EditSubjectDocument;