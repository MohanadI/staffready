import { useState } from 'react';
import { Col, Row } from 'antd';
import LeftArea from './LeftArea';
import RightArea from './RightArea';
import { DocumentControlContext } from './configs';

function DocumentControl() {
  const [documentControlData, setDocumentControlData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [activeTabs, setActiveTabs] = useState([]);

  const handleDCDataChange = (data) => {
    setDocumentControlData(data);
  }

  const handleLoadingChange = (flag) => {
    setIsLoading(flag);
  }

  const handleActiveTabsChange = (tabs) => {
    setActiveTabs(tabs);
  }

  return (
    <DocumentControlContext.Provider value={
      {
        documentControlData,
        handleDCDataChange,
        isLoading,
        handleLoadingChange,
        activeTabs,
        handleActiveTabsChange
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={6} xs={24} sm={24} md={8} lg={6} xl={4}>
          <LeftArea />
        </Col>
        <Col span={18} xs={24} sm={24} md={16} lg={18} xl={20}>
          <RightArea />
        </Col>
      </Row>
    </DocumentControlContext.Provider>
  );
}

export default DocumentControl;
