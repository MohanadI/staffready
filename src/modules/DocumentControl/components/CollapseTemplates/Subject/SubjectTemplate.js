import React, { useEffect, useContext, useState } from 'react';
import { Spin } from 'antd';

import CollapseComponent from '../../Collapse';
import { DocumentControlContext } from '../../../configs';
import { APIS } from '../../../apis/APIConstants';
import SubjectBody from './Body/Subject';
import SubjectDocumentBody from './Body/SubjectDocument';

export default function SubjectTemplate() {
    const [isLoading, setIsLoading] = useState(false);
    const [subjectID, setSubjectID] = useState(null);
    const { documentControlData } = useContext(DocumentControlContext);

    useEffect(() => {
        setIsLoading(true);
        setSubjectID(documentControlData?.value);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, [documentControlData]);

    const panels = [
        {
            key: "subject",
            title: "Subject",
            iconApi: APIS.COLOR_BAR.STATUS.SUBJECT(subjectID),
            body: <SubjectBody />
        },
        {
            key: "subject_documents",
            title: "Subject Documents",
            iconApi: APIS.COLOR_BAR.STATUS.SUBJECT_DOCUMENT(subjectID),
            body: <SubjectDocumentBody />
        }
    ];
    return (
        <Spin spinning={isLoading}>
            {subjectID && <CollapseComponent key={subjectID} panels={panels}/> }
        </Spin>
    );
}