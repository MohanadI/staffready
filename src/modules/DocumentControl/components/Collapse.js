import { Collapse, Space, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
// import { WarningIcon } from '../../../components/Icons/WarningIcon';
import { CheckIcon } from '../../../components/Icons/CheckIcon';
// import { InfoIcon } from '../../../components/Icons/InfoIcon';


const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


function CollapseComponent() {

    const expandIconPosition = 'end';

    const onChange = (key) => {
        console.log(key);
    };


    return (
        <>
            <Collapse
                defaultActiveKey={['1']}
                onChange={onChange}
                expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}
                expandIconPosition={expandIconPosition}
            >
                <Panel header={
                    <Space>
                        <CheckIcon />
                        <Typography.Text>
                            Subject
                        </Typography.Text>
                    </Space>
                } key="1">
                    <div>{text}</div>
                </Panel>
                <Panel header={
                    <Space>
                        <CheckIcon />
                        <Typography.Text>
                            Subject Document
                        </Typography.Text>
                    </Space>
                } key="2">
                    <div>{text}</div>
                </Panel>
            </Collapse>
        </>
    )
}

export default CollapseComponent;