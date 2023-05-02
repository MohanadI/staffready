import { Input, Form } from "antd";
import TreeSelect from "../components/UI/TreeSelect";

export const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    api,
    ...restProps
}) => {
    const inputNode = inputType === 'treeSelect' ? <TreeSelect api={api} record={record}/> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};