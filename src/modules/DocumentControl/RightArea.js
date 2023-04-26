import { Divider, Typography } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import CollapseComponent from './components/Collapse';
const { Title } = Typography;

function RightArea() {
    return (
        <>
            <Title level={3} style={{margin: 0}}>
                <FileSearchOutlined /> Testing Document 8
            </Title>
            <Divider style={{ margin: "10px 0px 10px 0px"}}/>
            <CollapseComponent />
        </>
    )
}

export default RightArea;