import { Collapse, Space, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import PanelStatusIcon from '../../../components/UI/PanelStatusIcon';
import { useContext } from 'react';
import { DocumentControlContext } from '../configs';


const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


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