import { useState } from 'react';
import { Col, Row } from 'antd';
import LeftArea from './LeftArea';
import RightArea from './RightArea';
import { DocumentControlContext } from './configs';

function DocumentControl() {
  const [documentControlData, setDocumentControlData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleDCDataChange = (data) => {
    setDocumentControlData(data);
  }

  const handleLoadingChange = (flag) => {
    setIsLoading(flag);
  }


  return (
    <DocumentControlContext.Provider value={{ documentControlData, handleDCDataChange, isLoading, handleLoadingChange }}>
      <Row gutter={[16, 16]}>
        <Col span={6} xs={24} sm={24} md={10} lg={6} xl={6}>
          <LeftArea />
        </Col>
        <Col span={18} xs={24} sm={24} md={14} lg={18} xl={18}>
          <RightArea />
        </Col>
      </Row>
    </DocumentControlContext.Provider>
  );
}

export default DocumentControl;
