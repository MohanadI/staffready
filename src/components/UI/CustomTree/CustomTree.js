import "./_customTree.scss"
import { useState, useEffect, useRef, useContext } from 'react';
import { Tree, Skeleton, Space, Input, Button } from "antd";
import PerfectScrollbar from 'react-perfect-scrollbar'
import useWindowSize from "../../../hooks/useWindowSize";
import { FileTextOutlined } from '@ant-design/icons'
import { cloneDeep } from "lodash";
import { DocumentControlContext } from "../../../modules/DocumentControl/configs";

const CustomTree = ({ currentTab, defaultSelectedKey, onSelect, treeData, isLoading }) => {



    const [expandedKeys, setExpandedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [searchTreeData, setSearchedTreeData] = useState([]);
    const [searchText, setSearchText] = useState(null);
    const { height } = useWindowSize();

    // const { activeTabs } = useContext(DocumentControlContext);



    useEffect(() => {
        setSearchedTreeData(treeData)
    }, [treeData]);

    useEffect(() => {
        const _expandedKeys = [];
        console.log('currentTap', currentTab)
        const traverse = (data) => {
            return data.map(node => {
                const targetIdx = node?.text?.toUpperCase()?.indexOf(searchText?.toUpperCase());
                let newNode = cloneDeep(node);
                if (targetIdx > -1) {
                    const beforeStr = node?.text.substring(0, targetIdx);
                    const afterStr = node?.text.slice(targetIdx + searchText.length)
                    const originalText = node?.text.slice(targetIdx, targetIdx + searchText.length)
                    _expandedKeys.push(node.value);
                    newNode.text = (
                        <span>
                            {beforeStr}
                            <span className="tree-highlight-search">
                                {originalText}
                            </span>
                            {afterStr}
                        </span>
                    )
                } else {
                    newNode.text = <span>{node?.text}</span>
                }

                if (newNode.type === 'document' && currentTab.title === 'Subject') {
                    newNode.icon = <FileTextOutlined />
                } else {
                    newNode.icon = currentTab.icon;
                }


                if (node?.children) {
                    return { ...newNode, children: traverse(node.children) }
                }
                return newNode
            });
        }

        const traversedTree = traverse(treeData);
        setExpandedKeys(_expandedKeys);
        setSearchedTreeData(traversedTree);
        setAutoExpandParent(true);
    }, [searchText, treeData]);

    const onSearch = (e) => {
        let { value: searchText } = e.target;
        searchText = searchText == "" ? null : searchText;
        setSearchText(searchText);
    }

    const onExpand = (newExpandKeys) => {
        setAutoExpandParent(false);
        setExpandedKeys(newExpandKeys)
    }

    return (
        <>
            <Space style={{ marginBottom: '10px' }} >
                <Input placeholder="Find Subject" value={searchText} onChange={onSearch} />
                <Button onClick={() => {
                    setSearchText(null)
                }}>Reset</Button>
            </Space>
            <Skeleton loading={isLoading}>
                <PerfectScrollbar style={{ maxHeight: height - 150, overflow: "auto" }}>
                    <Tree
                        fieldNames={{ title: "text", key: "value", children: "children" }}
                        showLine={true}
                        showIcon={true}
                        // icon={activeIcon}
                        defaultSelectedKeys={[defaultSelectedKey]}
                        onSelect={onSelect}
                        treeData={searchTreeData}
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}

                    />
                </PerfectScrollbar>
            </Skeleton>
        </>

    )
}

export default CustomTree;