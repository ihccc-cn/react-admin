import React from "react";
import { Tabs } from "antd";
import FormRender from "./form-render";
import { formProps, formItemProps, getComponentTitleProps } from "./props-config";

function FormPanel({ value, onChange }) {
  return (
    <div style={{ padding: "20px 14px 0 20px" }}>
      <FormRender config={formProps.config} value={Object.assign({}, formProps.defaultProps, value)} onChange={onChange} />
    </div>
  );
}

function FormItemPanel({ value, onChange }) {
  return (
    <div style={{ padding: "20px 14px 0 20px" }}>
      <FormRender config={formItemProps.config} value={Object.assign({}, formItemProps.defaultProps, value)} onChange={onChange} />
    </div>
  );
}

function ComponentPanel({ name, config, value, onChange }) {
  return (
    <div style={{ padding: "20px 14px 0 20px" }}>
      <FormRender
        config={getComponentTitleProps(name || "Unknow", config?.config)}
        value={Object.assign({}, config?.defaultProps, value)}
        onChange={onChange}
      />
    </div>
  );
}

function TabSetting({ notChoose, form, formItem, component }) {
  return (
    <Tabs
      items={
        notChoose
          ? [{ label: "表单", key: "form", children: form }]
          : [
              ...(!formItem ? [] : [{ label: "表单项", key: "item", children: formItem }]),
              { label: "组件", key: "component", children: component },
              // { label: "校验", key: "rules", children: "rules" },
              // { label: "关联", key: "relations", children: "relations" },
            ]
      }
    />
  );
}

TabSetting.FormPanel = FormPanel;
TabSetting.FormItemPanel = FormItemPanel;
TabSetting.ComponentPanel = ComponentPanel;

export default TabSetting;
