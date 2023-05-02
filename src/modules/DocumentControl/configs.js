import { createContext } from 'react';
import {
    FolderFilled,
    TagsFilled,
    FlagFilled
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
        icon: <TagsFilled />,
        active: false
    },
    {
        key: 'location',
        title: 'Location',
        icon: <FlagFilled />,
        active: false
    }
];