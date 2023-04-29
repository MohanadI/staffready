import { useContext } from "react";
import { Divider, Skeleton, Typography } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { DocumentControlContext } from "./configs";
import SubjectTemplate from "./components/CollapseTemplates/Subject/SubjectTemplate";
import DocumentsTemplate from "./components/CollapseTemplates/DocumentsTemplate";
import RevisionTemplate from "./components/CollapseTemplates/RevisionTemplate";
import ClassificationFolderTemplate from "./components/CollapseTemplates/ClassificationFolderTemplate";
import ClassificationTemplate from "./components/CollapseTemplates/ClassificationTemplate";
import SiteTemplate from "./components/CollapseTemplates/SiteTemplate";
import LocationTemplate from "./components/CollapseTemplates/LocationTemplate";

const { Title } = Typography;

function RightArea() {
    const { isLoading, documentControlData } = useContext(DocumentControlContext);

    const DocumentControlTemplates = {
        "subject": <SubjectTemplate />,
        "document": <DocumentsTemplate />,
        "revision": <RevisionTemplate />,
        "classification_folder": <ClassificationFolderTemplate />,
        "classification": <ClassificationTemplate />,
        "site": <SiteTemplate />,
        "location": <LocationTemplate />
    };

    const template = documentControlData?.type ? DocumentControlTemplates[documentControlData?.type] : <h1>No Template</h1>
    return (
        <Skeleton loading={isLoading}>
            <Title className="m-0" level={3}>
                <FileSearchOutlined /> {documentControlData?.text}
            </Title>
            <Divider className="m-t-10 m-b-10" />
            {template}
        </Skeleton>
    )
}

export default RightArea;