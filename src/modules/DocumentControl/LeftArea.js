import { useContext, useEffect, useState } from "react";
import { Button, Space, Input, Tree, Skeleton, message } from "antd";
import { get_document_tree } from "./apis/DocumentControlCalls";
import { DefaultTabs, DocumentControlContext } from "./configs";
import CustomTree from "../../components/UI/CustomTree/CustomTree";

function LeftArea() {
    const { handleDCDataChange, handleLoadingChange } = useContext(DocumentControlContext);

    const [isLoading, setIsLoading] = useState(false);
    const [treeData, setTreeData] = useState([]);
    const [documentControlTabs, setDocumentControlTabs] = useState(DefaultTabs);

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        UpdateActiveTab("subject");
    }, []);

    const onSelect = (selectedKeys, info) => {
        handleDCDataChange(info?.node);
    };

    const UpdateActiveTab = async (tabKey) => {
        setTreeData([]);
        setIsLoading(true);
        handleLoadingChange(true);
        const updated = documentControlTabs.map(e => ({ ...e, active: false }));
        var currentIndex = updated.findIndex((item) => {
            return item.key === tabKey;
        });
        updated[currentIndex].active = true;
        const activeTab = documentControlTabs.filter(v => v.active === true)[0].key;

        setDocumentControlTabs(updated);

        const results = await get_document_tree(tabKey);
        if (results === null) {
            messageApi.open({
                type: 'error',
                content: 'Something went wrong!',
            });
        }
        const TreeResult = results?.data;
        if ((treeData.length === 0 && TreeResult.length > 0) || activeTab !== tabKey) {
            handleDCDataChange(TreeResult[0]);
        }

        setTreeData(TreeResult);
        setIsLoading(false);
        handleLoadingChange(false);
    }

    const activeIcon = documentControlTabs.filter(v => v.active === true)[0].icon;
    const defaultSelectedKey = treeData.length > 0 ? treeData[0].value : "";

    return (
        <>
            {contextHolder}
            <Space direction="vertical" style={{ width: '100%' }}>
                <Space.Compact style={{ width: '100%' }}>
                    <div style={{ width: '100%', display: 'flex' }}>
                        {documentControlTabs.map(tab =>
                            <Button key={tab.key} icon={tab.icon}
                                loading={tab.active && isLoading}
                                type={tab.active ? "primary" : "default"}
                                style={tab.active ? {
                                    width: 170
                                } : { backgroundColor: '#dedede', flex: 1 }
                                }
                                onClick={() => UpdateActiveTab(tab.key)}
                            >
                                {tab.active ? tab.title : ""}
                            </Button>
                        )}
                    </div>
                </Space.Compact>
                <Button
                    block
                    type="primary"
                    ghost
                >
                    Add
                </Button>
                <CustomTree
                    activeIcon={activeIcon}
                    defaultSelectedKeys={[defaultSelectedKey]}
                    onSelect={onSelect}
                    treeData={treeData}
                    isLoading={isLoading}
                />
            </Space>
        </>

    )
}

export default LeftArea;