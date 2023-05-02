import { Collapse, Space, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import PanelStatusIcon from '../../../components/UI/PanelStatusIcon';
import { useContext } from 'react';
import { DocumentControlContext } from '../configs';


const { Panel } = Collapse;


function CollapseComponent({ panels }) {
    const { handleActiveTabsChange } = useContext(DocumentControlContext);

    const expandIconPosition = 'end';

    const onChange = (key) => {
        handleActiveTabsChange(key);
    };


    return (
        <>
            <Collapse
                onChange={onChange}
                expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}
                expandIconPosition={expandIconPosition}
            >
                {panels?.map((panel) =>
                (
                    <Panel
                        key={panel.key}
                        forceRender={true}
                        header={
                            <Space>
                                <PanelStatusIcon url={panel.iconApi} />
                                <Typography.Text>
                                    {panel.title}
                                </Typography.Text>
                            </Space>
                        }>
                        {panel.body}
                    </Panel>
                )
                )}
            </Collapse>
        </>
    )
}

export default CollapseComponent;