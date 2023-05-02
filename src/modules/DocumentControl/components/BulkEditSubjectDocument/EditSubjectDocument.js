import { Modal, message, Button, Steps } from 'antd';
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
            width={1000}
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
                        margin: '0px 4px',
                    }}
                    danger
                    onClick={() => handleCancel()}
                >
                    Cancel
                </Button>
                <Button
                    disabled={current === 0}
                    size='small'
                    style={{
                        margin: '0px 4px',
                    }}
                    onClick={() => prev()}
                >
                    Previous
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
            </div>
        </Modal>
    )
}

export default EditSubjectDocument;