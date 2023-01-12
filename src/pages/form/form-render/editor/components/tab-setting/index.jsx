import React from "react";
import { Tabs } from "antd";
import FormRender from "./form-render";
import { formProps, formItemProps } from "./props-config";

function FormPanel() {
  const handleChange = (name, value) => {
    console.log(name, value);
  };

  return (
    <div style={{ padding: "20px 14px 0 20px" }}>
      <FormRender config={formProps} onChange={handleChange} />
    </div>
  );
}

function ComponentPanel({ node }) {
  const itemDisable = node.formItem?.enable === false;
  const propsConfig = node.props?.config || [];

  const handleChange = (name, value) => {
    console.log(name, value);
  };

  const componentConfig = [
    {
      title: `组件 ${node.input || "Input"}`,
      name: "group-component",
      type: "Group",
      icon: "icon-integral",
    },
  ].concat(propsConfig);

  return (
    <div style={{ padding: "20px 14px 0 20px" }}>
      <FormRender config={itemDisable ? componentConfig : formItemProps.concat(componentConfig)} onChange={handleChange} />
    </div>
  );
}

function TabSetting({ form, component }) {
  return (
    <Tabs
      items={[
        ...(!form ? [] : [{ label: "表单属性", key: "form", children: form }]),
        ...(!component ? [] : [{ label: "组件属性", key: "component", children: component }]),
      ]}
    />
  );
}

TabSetting.FormPanel = FormPanel;
TabSetting.ComponentPanel = ComponentPanel;

export default TabSetting;
