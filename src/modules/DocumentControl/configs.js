import { createContext } from 'react';
import {
    TagsOutlined,
    SendOutlined,
    FolderFilled
} from '@ant-design/icons';

export const DocumentControlContext = createContext();

export const DefaultTabs = [
    {
        key: 'subject',
        title: 'Subject',
        icon: <FolderFilled />,
        active: true
    },
    {
        key: 'classification',
        title: 'Classification',
        icon: <TagsOutlined />,
        active: false
    },
    {
        key: 'location',
        title: 'Location',
        icon: <SendOutlined />,
        active: false
    }
];