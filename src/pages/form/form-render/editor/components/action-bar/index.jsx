import React from "react";
import { Button, Popconfirm } from "antd";
import Icon from "@/common/components/icon";
import "./index.css";

function ActionBar({ visible, disabled, state, onPhone, onPad, onHelp, onGhost, onPreview, onImport, onExport, onClear }) {
  return (
    <div className="form-editor-action-bar">
      <Button type="link" size="small" icon={<Icon type="icon-help" />} onClick={onHelp} />
      {/* {visible.autoLayout !== false && (
        <Button size="small" shape="round" icon={<Icon type="icon-robot" />}>
          智能布局
        </Button>
      )} */}
      {visible.viewMode !== false && (
        <Button.Group size="small">
          <Button type={state.device === "phone" ? "primary" : "default"} size="small" shape="round" icon={<Icon type="icon-mobile-phone" />} onClick={onPhone}>
            手机
          </Button>
          <Button type={state.device === "pad" ? "primary" : "default"} size="small" shape="round" icon={<Icon type="icon-ipad" />} onClick={onPad}>
            平板
          </Button>
        </Button.Group>
      )}
      {visible.preview !== false && (
        <Button.Group size="small">
          <Button
            type={state.ghost ? "primary" : "default"}
            size="small"
            shape="round"
            disabled={disabled.ghost}
            icon={<Icon type="icon-xiakuangxian" />}
            title="幽灵模式"
            onClick={onGhost}
          />
          <Button
            type={state.preview ? "primary" : "default"}
            size="small"
            shape="round"
            disabled={disabled.preview}
            icon={<Icon type="icon-scenes" />}
            onClick={onPreview}
          >
            预览
          </Button>
        </Button.Group>
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
      {visible.clear !== false &&
        (disabled.clear ? (
          <Button size="small" shape="round" disabled icon={<Icon type="icon-ashbin" />}>
            清空
          </Button>
        ) : (
          <Popconfirm title="确定清空吗？" okText="确定" cancelText="取消" onConfirm={onClear}>
            <Button danger size="small" shape="round" icon={<Icon type="icon-ashbin" />}>
              清空
            </Button>
          </Popconfirm>
        ))}
    </div>
  );
}

ActionBar.defaultProps = {
  state: {},
  visible: {},
  disabled: {},
};

export default ActionBar;
