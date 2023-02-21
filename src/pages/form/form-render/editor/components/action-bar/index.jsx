import React from "react";
import { Button, Popconfirm } from "antd";
import Icon from "@/common/components/icon";
import ModalExport from "../modal-export";
import ModalImport from "../modal-import";
import EditorContext from "../../editor-context";
import "./index.css";

function ActionBar() {
  const { schema } = React.useContext(EditorContext);

  const [imVisible, setImVisible] = React.useState(false);
  const [exportJson, setExportJson] = React.useState(null);

  const visible = { preview: !schema.isEmpty, export: !schema.isEmpty, clear: !schema.isEmpty };

  const state = { device: schema.device, ghost: schema.ghost, preview: schema.preview };

  const handleExport = React.useCallback(() => {
    setExportJson(schema.getExportJson());
  }, []);

  const onPhone = React.useCallback(() => schema.setDevice(device => (device !== "phone" ? "phone" : null)), []);

  const onPad = React.useCallback(() => schema.setDevice(device => (device !== "pad" ? "pad" : null)), []);

  return (
    <div className="form-editor-action-bar">
      <ModalExport open={!!exportJson} value={exportJson} onCancel={() => setExportJson(null)} />
      <ModalImport open={imVisible} onOk={schema.setValue} onCancel={() => setImVisible(false)} />
      {/* <Button type="link" size="small" icon={<Icon type="icon-help" />} onClick={onHelp} /> */}
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
            icon={<Icon type="icon-xiakuangxian" />}
            title="幽灵模式"
            onClick={schema.toggleGhost}
          />
          <Button type={state.preview ? "primary" : "default"} size="small" shape="round" icon={<Icon type="icon-scenes" />} onClick={schema.togglePreview}>
            预览
          </Button>
        </Button.Group>
      )}
      <Button.Group size="small">
        {visible.import !== false && (
          <Button type="primary" shape="round" icon={<Icon type="icon-add-select" />} onClick={() => setImVisible(true)}>
            导入
          </Button>
        )}
        {visible.export !== false && (
          <Button shape="round" icon={<Icon type="icon-code" />} onClick={handleExport}>
            导出
          </Button>
        )}
      </Button.Group>
      {visible.clear !== false && (
        <Popconfirm title="确定清空吗？" okText="确定" cancelText="取消" onConfirm={schema.clear}>
          <Button danger size="small" shape="round" icon={<Icon type="icon-ashbin" />}>
            清空
          </Button>
        </Popconfirm>
      )}
    </div>
  );
}

export default ActionBar;
