import { TreeSelect as TreeDropDown } from 'antd';
import { useEffect, useState } from 'react';
import { get_subjects_tree } from '../../modules/DocumentControl/apis/DocumentControlCalls';
// const treeData = [
//     {
//         value: 'parent 1',
//         title: 'parent 1',
//         children: [
//             {
//                 value: 'parent 1-0',
//                 title: 'parent 1-0',
//                 children: [
//                     {
//                         value: 'leaf1',
//                         title: 'leaf1',
//                     },
//                     {
//                         value: 'leaf2',
//                         title: 'leaf2',
//                     },
//                 ],
//             },
//             {
//                 value: 'parent 1-1',
//                 title: 'parent 1-1',
//                 children: [
//                     {
//                         value: 'leaf3',
//                         title: (
//                             <b
//                                 style={{
//                                     color: '#08c',
//                                 }}
//                             >
//                                 leaf3
//                             </b>
//                         ),
//                     },
//                 ],
//             },
//         ],
//     },
// ];
const TreeSelect = ({api, record}) => {
    const [treeData, setTreeData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState();
    const onChange = (newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setIsLoading(true);
        loadSubjectsTree();
    }, []);

    const loadSubjectsTree = async () => {
        const result = await get_subjects_tree();
        setTreeData(result);
        setIsLoading(false);
    }

    return (
        <TreeDropDown
            loading={isLoading}
            showSearch
            style={{
                width: '100%',
            }}
            fieldNames={
                { label: "text", value: "value", children: "children" }
            }
            value={value}
            dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto',
            }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={treeData}
        />
    );
};
export default TreeSelect;