import React from "react";
import { Tabs, Input, Select, Switch } from "antd";
import "./index.css";

const nodes = {
  String: <Input size="small" placeholder="请输入" />,
  Boolean: <Switch size="small" />,
  Enum: <Select size="small" placeholder="请选择" style={{ width: "100%" }} />,
};

function FormNode({ config, onChange }) {
  return config.map(item => (
    <div className="setting-form-node" key={item.name}>
      <div className="setting-form-node-title">{item.title}</div>
      <div>{React.cloneElement(nodes[item.type] || nodes["String"], { onChange: e => onChange && onChange(item.name, e) })}</div>
    </div>
  ));
}

const propsConfig = [
  {
    title: "后置标签",
    name: "addonAfter",
    tip: "带标签的 input，设置后置标签",
    type: "String",
  },
  {
    title: "前置标签",
    name: "addonBefore",
    tip: "带标签的 input，设置前置标签",
    type: "String",
  },
  {
    title: "允许清空",
    name: "allowClear",
    tip: "可以点击清除图标删除内容",
    type: "Boolean",
  },
  {
    title: "是否有边框",
    name: "bordered",
    type: "Boolean",
  },
  {
    title: "默认内容",
    name: "defaultValue",
    type: "String",
  },
  {
    title: "是否禁用",
    name: "disabled",
    type: "Boolean",
  },
  {
    title: "最大长度",
    name: "maxLength",
    type: "Number",
  },
  {
    title: "是否展示字数",
    name: "showCount",
    type: "Boolean",
  },
  {
    title: "前缀图标",
    name: "prefix",
    type: "String",
  },
  {
    title: "占位文本",
    name: "placeholder",
    type: "String",
  },
  {
    title: "尺寸",
    name: "size",
    type: "Enum",
    options: "field.size",
  },
  {
    title: "后缀图标",
    name: "suffix",
    type: "String",
  },
  {
    title: "样式",
    name: "style",
    type: "StyleEditor",
  },
];

function FormPanel() {
  const handleChange = (name, value) => {
    console.log(name, value);
  };

  return (
    <div>
      <FormNode config={propsConfig} onChange={handleChange} />
      {/* <FormNode label="名称">
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
      </FormNode> */}
    </div>
  );
}

function ComponentPanel() {
  return (
    <div>
      ComponentPanel
      {/* <FormNode label="标题">
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
      </FormNode> */}
    </div>
  );
}

function TabSetting({ form, component }) {
  return (
    <div style={{ marginTop: -20 }}>
      <Tabs
        items={[
          ...(!form ? [] : [{ label: "表单属性", key: "form", children: form }]),
          ...(!component ? [] : [{ label: "组件属性", key: "component", children: component }]),
        ]}
      />
    </div>
  );
}

TabSetting.FormPanel = FormPanel;
TabSetting.ComponentPanel = ComponentPanel;

export default TabSetting;
