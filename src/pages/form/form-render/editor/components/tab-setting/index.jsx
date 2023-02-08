import React from "react";
import { Tabs } from "antd";
import IconTip from "../icon-tip";
import FormRender from "./form-render";
import { formProps, layoutProps, formItemProps, getComponentTitleProps, relationConfig, dataConfig } from "./props-config";

function FormPanel({ value, onChange }) {
  return (
    <div style={{ padding: "20px 14px 0 20px" }}>
      <FormRender config={formProps.config} value={Object.assign({}, formProps.defaultProps, value)} onChange={onChange} />
    </div>
  );
}

function LayoutPanel({ value, onChange }) {
  return (
    <div style={{ padding: "20px 14px 0 20px" }}>
      <FormRender config={layoutProps.config} value={Object.assign({}, layoutProps.defaultProps, value)} onChange={onChange} />
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

function RelationPanel({ value, onChange }) {
  return (
    <div style={{ padding: "20px 14px 0 20px" }}>
      <FormRender config={relationConfig} value={Object.assign({}, value)} onChange={onChange} />
    </div>
  );
}

function DataConfigPanel({ value, onChange }) {
  return (
    <div style={{ padding: "20px 14px 0 20px" }}>
      <FormRender config={dataConfig} value={Object.assign({}, value)} onChange={onChange} />
    </div>
  );
}

function DataUsePanel({ value, onChange }) {
  return (
    <div style={{ padding: "20px 14px 0 20px" }}>
      <FormRender config={dataConfig} value={Object.assign({}, value)} onChange={onChange} />
    </div>
  );
}

function TabSetting({ notChoose, form, layout, dataConfig, formItem, component, relation, dataUse }) {
  return (
    <Tabs
      items={
        notChoose
          ? [
              { label: <IconTip title="表单" icon="icon-product" />, key: "form", children: form },
              { label: <IconTip title="布局" icon="icon-integral" />, key: "layout", children: layout },
              { label: <IconTip title="数据" icon="icon-zijin" />, key: "data-config", children: dataConfig },
            ]
          : [
              ...(!formItem ? [] : [{ label: <IconTip title="表单项" icon="icon-Similarproducts" />, key: "item", children: formItem }]),
              { label: <IconTip title="组件" icon="icon-component" />, key: "component", children: component },
              // { label: <IconTip title="校验" icon="icon-shuangshen" />, key: "rules", children: "rules" },
              { label: <IconTip title="动态关联" icon="icon-connections" />, key: "relation", children: relation },
              { label: <IconTip title="数据" icon="icon-zijin" />, key: "data-use", children: dataUse },
            ]
      }
    />
  );
}

TabSetting.Panel = {
  Form: FormPanel,
  Layout: LayoutPanel,
  FormItem: FormItemPanel,
  Component: ComponentPanel,
  Relation: RelationPanel,
  DataConfig: DataConfigPanel,
  DataUse: DataUsePanel,
};

export default TabSetting;
