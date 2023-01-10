import React from "react";
import { Button } from "antd";
import Icon from "@/common/components/icon";
import "./index.css";

function ActionBar({ visible, disabled, preview, onHelp, onPreview, onImport, onExport, onClear }) {
  return (
    <div className="form-editor-action-bar">
      <Button type="link" size="small" shape="circle" icon={<Icon type="icon-help" />} onClick={onHelp} />
      {visible.preview !== false && (
        <Button
          type={preview ? "primary" : "default"}
          size="small"
          shape="round"
          disabled={disabled.preview}
          icon={<Icon type="icon-scenes" />}
          onClick={onPreview}
        >
          预览
        </Button>
      )}
      <Button.Group size="small">
        {visible.import !== false && (
          <Button type="primary" shape="round" disabled={disabled.import} icon={<Icon type="icon-add-select" />} onClick={onImport}>
            导入
          </Button>
        )}
        {visible.export !== false && (
          <Button shape="round" disabled={disabled.export} icon={<Icon type="icon-code" />} onClick={onExport}>
            导出
          </Button>
        )}
      </Button.Group>
      {visible.clear !== false && (
        <Button danger size="small" shape="round" disabled={disabled.clear} icon={<Icon type="icon-ashbin" />} onClick={onClear}>
          清空
        </Button>
      )}
    </div>
  );
}

ActionBar.defaultProps = {
  visible: {},
  disabled: {},
};

export default ActionBar;
