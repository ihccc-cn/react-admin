import React from "react";
import { Modal, Input } from "antd";

function ModalExport({ value, ...restProps }) {
  return (
    <Modal title="导出 Schema" width={640} okText="拷贝" cancelText="取消" {...restProps}>
      <Input.TextArea value={value} rows={24} />
    </Modal>
  );
}

export default ModalExport;
