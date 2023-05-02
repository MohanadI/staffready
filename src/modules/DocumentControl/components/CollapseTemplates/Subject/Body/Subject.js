import React, { useContext, useEffect, useState } from 'react';

import { Form, Button, Space, Row, Col, Popover, Skeleton, Popconfirm, Table, Typography, Tooltip, Card } from 'antd';
import { MessageOutlined, QuestionCircleOutlined, CheckCircleOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { DocumentControlContext } from '../../../../configs';
import { get_subject_data } from '../../../../apis/DocumentControlCalls';
import { EditableCell } from '../../../../../../hooks/editCell';
import Feedback from '../../../../../../components/UI/Modals/Feedback';
import { APIS } from '../../../../apis/APIConstants';

const helpContent = (
    <div>
        <p>This color bar allows you to edit the document subject ID or edit what parent folder it is a part of.</p>
    </div>
);

export default function SubjectBody() {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [loadedBefore, setLoadedBefore] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    const { activeTabs, documentControlData } = useContext(DocumentControlContext);

    useEffect(() => {
        // if activeTabs.indexOf('subject') === -1 && loadedBefore === true we can reset loadedBefore
        if (activeTabs.indexOf('subject') >= 0 && !loadedBefore) {
            setIsLoading(true);
            setLoadedBefore(true);
            loadSubjectData();
        }
    }, [activeTabs]);

    const edit = (record) => {
        form.setFieldsValue({
            id: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Subject ID',
            dataIndex: 'id',
            inputType: "text",
            width: '30%',
            editable: true,
        },
        {
            title: 'Within',
            dataIndex: 'parentPk',
            inputType: "treeSelect",
            editable: true,
            api: APIS.TREE.SUBJECTS_ONLY,
            render: (record) => {
                return record?.parent?.name || '[top level]'
            }
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Button
                            size='small'
                            onClick={() => save(record.key)}
                            type='primary'
                        >
                            Save
                        </Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button size='small' type='text'>Cancel</Button>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Space>
                        <Button
                            size='small'
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                        >
                            Edit
                        </Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button size='small' danger>Delete</Button>
                        </Popconfirm>
                        <Tooltip title="Download All Published Files as ZIP">
                            <Button
                                size="small"
                                type='primary'
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'https://cobalt301.openstack.local/StaffReady/v10/api/subject/zip';
                                }}
                                icon={<CloudDownloadOutlined />}>
                                Download
                            </Button>
                        </Tooltip>
                    </Space>

                );
            },
        }
    ];

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const loadSubjectData = async () => {
        const result = await get_subject_data(documentControlData?.value);
        setDataSource([result]);
        setIsLoading(false);
    }

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.inputType,
                dataIndex: col.dataIndex,
                title: col.title,
                api: col.api ? col.api : null,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <>
            {openFeedback &&
                <Feedback openModal={openFeedback} handleCloseModal={() => setOpenFeedback(false)} />
            }
            <Row className='helpers-area'>
                <Col span={12} offset={6}>
                    <Space>
                        <Tooltip placement="top" title="Feedback">
                            <Button
                                size="small"
                                icon={<MessageOutlined />}
                                onClick={() => setOpenFeedback(true)}
                            />
                        </Tooltip>
                        <Popover content={helpContent} title="Subject" trigger="click">
                            <Tooltip placement="top" title="Help">
                                <Button size="small" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Popover>
                        <Tooltip placement="top" title="Audit">
                            <Button size="small" icon={<CheckCircleOutlined />} />
                        </Tooltip>
                    </Space>
                </Col>
            </Row>
            <Skeleton loading={isLoading}>
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        dataSource={dataSource}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{ position: ["none", "none"] }}
                        rowKey={"id"}
                    />
                </Form>
            </Skeleton>
        </>
    );
}