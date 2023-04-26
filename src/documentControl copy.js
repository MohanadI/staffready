import { Space, Collapse, DatePicker, Button, ConfigProvider } from 'antd';
import { theme } from './theme';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { WarningIcon } from './components/Icons/WarningIcon';
import { CheckIcon } from './components/Icons/CheckIcon';
import { InfoIcon } from './components/Icons/InfoIcon';

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function DocumentControl() {
  const panelStyle = {
    marginBottom: 24,
    background: "#e9e9e9",
    borderRadius: 0,
    border: 'none',
  };

  const [expandIconPosition, setExpandIconPosition] = useState('end');

  const onChange = (key) => {
    console.log(key);
  };
  const genExtra = () => (
    <>
      <WarningIcon
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
      <CheckIcon />
      <InfoIcon />
    </>
  );

  return (
    <div className="App">
      <ConfigProvider
        theme={theme}
      >
        <Space>
          <DatePicker />
          <Button type="primary">Primary Button</Button>
        </Space>
        <Collapse
          defaultActiveKey={['1']}
          onChange={onChange}
          expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}
          expandIconPosition={expandIconPosition}
        >
          <Panel header={
            <>
              <p>asdasdsad</p>
              <p>Hello World</p>
            </>
          } key="1" extra={genExtra()}>
            <div>{text}</div>
          </Panel>
          <Panel header="This is panel header 2" key="2" extra={genExtra()}>
            <div>{text}</div>
          </Panel>
          <Panel header="This is panel header 3" key="3" extra={genExtra()}>
            <div>{text}</div>
          </Panel>
        </Collapse>
      </ConfigProvider>
    </div>
  );
}

export default DocumentControl;
