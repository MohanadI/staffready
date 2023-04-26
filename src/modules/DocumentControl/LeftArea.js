import { Button, Space, Input, Tree, Skeleton, message } from "antd";
import {
    TagsOutlined,
    SendOutlined,
    FolderFilled,
    FileSearchOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { get_document_tree } from "./apis/DocumentControlCalls";

const treeData = [
    {
        title: 'Core Lab',
        key: '0-0',
        icon: <FolderFilled />,
    },
    {
        title: 'GH-Clinics',
        key: '0-1',
        icon: <FolderFilled />,
    },
    {
        title: 'JM-Test',
        key: '0-2',
        icon: <FolderFilled />,
        children: [
            {
                title: 'N-Folder',
                key: '0-2-0',
                icon: <FolderFilled />,
                children: [
                    {
                        title: 'Testing Document',
                        key: '0-2-0-1',
                        icon: <FileSearchOutlined />,
                    }
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-2-1',
                icon: <FolderFilled />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-2-1-0',
                        icon: <FileSearchOutlined />,
                    },
                ],
            }
        ],
    }
];

function LeftArea() {
    const [isLoading, setIsLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [documentControlTabs, setDocumentControlTabs] = useState([
        {
            key: 'subject',
            title: 'Subject',
            icon: <FolderFilled />,
            active: true
        },
        {
            key: 'classification',
            title: 'Classification',
            icon: <TagsOutlined />,
            active: false
        },
        {
            key: 'location',
            title: 'Location',
            icon: <SendOutlined />,
            active: false
        }
    ]);

    const UpdateActiveTab = async (tabKey) => {
        setIsLoading(true);
        const updated = documentControlTabs.map(e => ({ ...e, active: false }));
        var currentIndex = updated.findIndex((item) => {
            return item.key === tabKey;
        });
        updated[currentIndex].active = true;
        setDocumentControlTabs(updated);

        const treeData = await get_document_tree();
        if(treeData === null){
            messageApi.open({
                type: 'error',
                content: 'Something went wrong!',
            });
        }
        setIsLoading(false);
    }

    return (
        <>
            {contextHolder}
            <Space direction="vertical">
                <Space.Compact>
                    {documentControlTabs.map(tab =>
                        <Button icon={tab.icon}
                            loading={tab.active && isLoading}
                            type={tab.active ? "primary" : "default"}
                            style={tab.active ? {
                                width: 170
                            } : {}
                            }
                            onClick={() => UpdateActiveTab(tab.key)}
                        >
                            {tab.active ? tab.title : ""}
                        </Button>
                    )}
                </Space.Compact>
                <Space>
                    <Space.Compact>
                        <Input placeholder="Find Subject" />
                        <Button>Find</Button>
                    </Space.Compact>
                    <Button>Add</Button>
                </Space>
                <Skeleton loading={isLoading}>
                    <Tree
                        showLine={true}
                        showIcon={true}
                        // onSelect={onSelect}
                        treeData={treeData}
                    />
                </Skeleton>
            </Space>
        </>

    )
}

export default LeftArea;