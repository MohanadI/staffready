import { Col, Row } from 'antd';
import LeftArea from './LeftArea';
import RightArea from './RightArea';

function DocumentControl() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={6} xs={24} sm={24} md={10} lg={6} xl={6}>
        <LeftArea />
      </Col>
      <Col span={18} xs={24} sm={24} md={14} lg={18} xl={18}>
        <RightArea />
      </Col>
    </Row>
  );
}

export default DocumentControl;
