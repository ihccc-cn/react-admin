import React from "react";
import { Modal, Input } from "antd";
import { EditorUtil } from "../../../utils";

function ModalImport({ onOk, onCancel, ...restProps }) {
  const [value, setValue] = React.useState(null);

  const handleOk = () => {
    try {
      const schema = JSON.parse(value);
      if (EditorUtil.checkValue(schema)) {
        onOk && onOk(schema);
        onCancel && onCancel();
        setValue(null);
        return;
      }
    } catch (error) {}
    Modal.error({
      title: "Error, 错误提示！",
      content: "导入失败，数据格式可能不正确，请检查后重试！",
    });
  };

  return (
    <Modal title="导入 Schema" width={640} okText="导入" cancelText="取消" onOk={handleOk} onCancel={onCancel} {...restProps}>
      <Input.TextArea value={value} placeholder="请粘贴 Schema 数据" rows={24} onChange={e => setValue(e.target.value)} />
    </Modal>
  );
}

export default ModalImport;
