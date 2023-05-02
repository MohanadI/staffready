import React, { useEffect, useState, useContext } from 'react';

import { Button, Space, Row, Col, Popover, Skeleton, Table, Tooltip } from 'antd';
import { MessageOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons';
import { DocumentControlContext } from '../../../../configs';
import { get_subject_document_data } from '../../../../apis/DocumentControlCalls';
import EditSubjectDocument from '../../../BulkEditSubjectDocument/EditSubjectDocument';

const helpContent = (
    <div>
        <p>This color bar allows you to edit all documents within this subject and bulk-edit properties for some or all Subject Documents.</p>
    </div>
);

export default function SubjectDocumentBody() {
    const [isLoading, setIsLoading] = useState(false);
    const [loadedBefore, setLoadedBefore] = useState(false);
    const [openBulkEdit, setOpenBulkEdit] = useState(false)
    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            id: 'Edward King 0',
            parentPk: 0,
            parent: {}
        }
    ]);
    const { activeTabs, documentControlData } = useContext(DocumentControlContext);
    const columns = [
        {
            title: 'Document Name',
            dataIndex: 'name',
            key: 'document_name',
            width: "30%",
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: 'Classification',
            dataIndex: 'id',
            key: 'classification',
            sorter: (a, b) => a.id.length - b.id.length,
        },
        {
            title: 'Subject',
            key: 'subject',
            render: (text) => {
                return text.subject?.id
            },
            sorter: (a, b) => a.subject?.id.length - b.subject?.id.length,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.id.length - b.id.length,
        }
    ];

    useEffect(() => {
        console.log(activeTabs);
        // if activeTabs.indexOf('subject') === -1 && loadedBefore === true we can reset loadedBefore
        if (activeTabs.indexOf('subject_documents') >= 0 && !loadedBefore) {
            setIsLoading(true);
            setLoadedBefore(true);
            loadSubjectDocumentData();
        }
    }, [activeTabs]);

    const loadSubjectDocumentData = async () => {
        const result = await get_subject_document_data(documentControlData?.value);
        setDataSource(result);
        setIsLoading(false);
    }

    return (
        <>
            {openBulkEdit &&
                <EditSubjectDocument openModal={openBulkEdit} handleCloseModal={() => setOpenBulkEdit(false)} />
            }
            <Row className='helpers-area'>
                <Col span={12} offset={6}>
                    <Space>
                        <Tooltip placement="top" title="Feedback">
                            <Button size="small" icon={<MessageOutlined />} />
                        </Tooltip>
                        <Popover content={helpContent} title="Subject Documents" trigger="click">
                            <Tooltip placement="top" title="Help">
                                <Button size="small" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Popover>
                    </Space>
                </Col>
            </Row>
            <Skeleton loading={isLoading}>
                <Button
                    className='m-b-5'
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => setOpenBulkEdit(true)}
                >
                    Bulk Edit Documents
                </Button>
                <Table
                    className="table-striped-rows"
                    rowKey={"id"}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        position: ["bottomRight"]
                    }}
                />
            </Skeleton>
        </>
    );
}