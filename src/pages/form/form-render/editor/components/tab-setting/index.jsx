import React from "react";
import { Tabs, Input, Select, Switch } from "antd";
import "./index.css";

function FormNode({ label, children }) {
  return (
    <div className="setting-form-node">
      <div className="setting-form-node-label">{label}</div>
      <div>{React.cloneElement(children)}</div>
    </div>
  );
}

function FormPanel() {
  return (
    <div>
      <FormNode label="名称">
        <Input size="small" />
      </FormNode>
      <FormNode label="布局">
        <Select size="small" style={{ width: "100%" }} />
      </FormNode>
      <FormNode label="锁定">
        <Switch size="small" />
      </FormNode>
      <FormNode label="行内">
        <Switch size="small" />
      </FormNode>
      <FormNode label="样式">
        <Input size="small" />
      </FormNode>
    </div>
  );
}

function ComponentPanel() {
  return (
    <div>
      <FormNode label="标题">
        <Input size="small" />
      </FormNode>
      <FormNode label="占位文本">
        <Input size="small" />
      </FormNode>
      <FormNode label="锁定">
        <Switch size="small" />
      </FormNode>
      <FormNode label="行内">
        <Switch size="small" />
      </FormNode>
      <FormNode label="样式">
        <Input size="small" />
      </FormNode>
    </div>
  );
}

function TabSetting({ form, component }) {
  return (
    <div style={{ marginTop: -20 }}>
      <Tabs
        items={[
          ...(!form ? [] : [{ label: "表单参数", key: "form", children: form }]),
          ...(!component ? [] : [{ label: "组件参数", key: "component", children: component }]),
        ]}
      />
    </div>
  );
}

TabSetting.FormPanel = FormPanel;
TabSetting.ComponentPanel = ComponentPanel;

export default TabSetting;
