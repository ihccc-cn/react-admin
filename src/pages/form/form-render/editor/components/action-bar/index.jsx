import React from "react";
import { Button } from "antd";
import Icon from "@/common/components/icon";
import "./index.css";

function ActionBar({ onClear }) {
  return (
    <div className="form-editor-action-bar">
      <Button type="link" size="small" shape="round" icon={<Icon type="icon-help-fill" />} />
      <Button size="small" shape="round" icon={<Icon type="icon-scenes" />}>
        预览
      </Button>
      <Button type="primary" size="small" shape="round" icon={<Icon type="icon-code" />}>
        导出
      </Button>
      <Button danger size="small" shape="round" icon={<Icon type="icon-ashbin" />} onClick={onClear}>
        清空
      </Button>
    </div>
  );
}

export default ActionBar;
