import { Typography, Table } from 'antd';
import { useEffect, useState } from 'react';

function SelectDocumentsStep() {
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
            responsive: ['lg'],
            sorter: (a, b) => a.id.length - b.id.length,
        },
        {
            title: 'Subject',
            key: 'subject',
            responsive: ['lg'],
            // render: (text) => {
            //     return text.subject?.id
            // },
            sorter: (a, b) => a.subject?.id.length - b.subject?.id.length,
        },
        {
            title: 'Locations',
            dataIndex: 'locations',
            key: 'locations',
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            responsive: ['lg'],
            sorter: (a, b) => a.name.length - b.name.length
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    };

    const dataSource = [
        {
            name: "suhayb test 2",
            id: "Core.CL.test2.001",
            subject: "GH_Clinics",
            locations: "0 locations",
            type: "File or URL"
        }
    ]

    return(
        <>
            <Typography.Title level={4}>Select Documents</Typography.Title>
            <Typography.Paragraph>Select at least 1 document to edit. (Documents that are currently undergoing revision cannot be modified.)</Typography.Paragraph>
            <Table
                rowSelection={rowSelection}
                className="table-striped-rows"
                rowKey={"id"}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    position: ["top"]
                }}
            />
        </>
    );
}

export default SelectDocumentsStep;