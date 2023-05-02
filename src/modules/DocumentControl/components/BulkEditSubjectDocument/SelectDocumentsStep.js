import { Typography, Table, Button, Modal} from 'antd';
import { useEffect, useState, useContext } from 'react';
import { DocumentControlContext } from '../../configs';
import { get_subject_document_data, load_document_locations } from '../../apis/DocumentControlCalls';

function SelectDocumentsStep() {
    const { documentControlData } = useContext(DocumentControlContext);
    const [isLoading, setIsLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [openLocationsModal, setOpenLocationsModal] = useState(false);
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const [locationsData, setLocationData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        loadSubjectDocumentData();
    }, []);

    const loadSubjectDocumentData = async () => {
        const result = await get_subject_document_data(documentControlData?.value);
        setDataSource(result);
        setIsLoading(false);
    }
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
            render: (record, text) => {
                return text?.subject?.id
            },
            sorter: (a, b) => a.subject?.id.length - b.subject?.id.length,
        },
        {
            title: 'Locations',
            dataIndex: 'locationCount',
            key: 'locationCount',
            sorter: (a, b) => a.name.length - b.name.length,
            render: (record, text) => {
                return <Button type='link' onClick={async () => {
                    setIsLocationLoading(true);
                    setOpenLocationsModal(true);
                    const result = await load_document_locations(text.improvePk);
                    setLocationData(result);
                    setIsLocationLoading(false);
                }}>
                    {text?.locationCount + " Locations"}
                </Button>
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            responsive: ['lg'],
            render: (record, text) => {
                return text?.isImproveId
            },
            sorter: (a, b) => a.name.length - b.name.length
        }
    ];

    const locationColumns = [
        {
            title: 'Location',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: 'Site',
            dataIndex: 'site',
            key: 'site',
            sorter: (a, b) => a.id.length - b.id.length,
            render: (record, text) => {
                return text?.site?.name
            }
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    };

    return(
        <>
            <Typography.Title level={4}>Select Documents</Typography.Title>
            <Typography.Paragraph>Select at least 1 document to edit. (Documents that are currently undergoing revision cannot be modified.)</Typography.Paragraph>
            <Table
                loading={isLoading}
                rowSelection={rowSelection}
                className="table-striped-rows"
                rowKey={"id"}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    position: ["top"]
                }}
            />
            <Modal
                footer={null}
                title="Locations for Document"
                open={openLocationsModal}
                onCancel={() => {
                    setOpenLocationsModal(false);
                    setLocationData([]);
                }}>
                <Table
                    loading={isLocationLoading}
                    columns={locationColumns}
                    dataSource={locationsData} />
            </Modal>
        </>
    );
}

export default SelectDocumentsStep;