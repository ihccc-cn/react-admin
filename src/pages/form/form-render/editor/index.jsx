import React from "react";
import { Form } from "antd";
import useSchemaForEditor from "../hooks/useSchemaForEditor";
import ActionBar from "./components/action-bar";
import TabFields from "./components/tab-fields";
import TabSetting from "./components/tab-setting";
import Canvas from "./components/canvas";
import DeviceBox from "./components/device-box";
import CanvasEmpty from "./components/canvas-empty";
import Layout from "./layout";
import EditorContext from "./editor-context";
import nodesConfig from "../nodes-config.json";
import components from "../components";
import { BasicFormLayout } from "../render";
import { uuid } from "../utils";
import exampleSchame from "../../fr-example.json";
import "./index.css";

const GROUP_NAME = "form-editor";

function Editor({ schema: schemaValue, style }) {
  const mainContainerRef = React.useRef(null);
  const schema = useSchemaForEditor(schemaValue);
  const [containerHeight, setContainerHeight] = React.useState(null);

  console.log("💾[editor-schema]: ", schema);

  const handleInitField = React.useCallback(({ type, ...data }) => {
    const itemConfig = nodesConfig.formItem[type] || {};
    const componentConfig = nodesConfig.props[type]?.defaultProps || {};
    const name = uuid(type);
    schema.setFormItem(current => ({ ...current, [name]: itemConfig }));
    schema.setComponent(current => ({ ...current, [name]: { props: componentConfig } }));
    return { ...data, name, input: type };
  }, []);

  const handleField = React.useCallback(item => {
    schema.setColumns(current => current.concat(handleInitField(item)));
  }, []);

  React.useEffect(() => {
    if (!mainContainerRef.current) return;
    const height = mainContainerRef.current.parentElement.offsetHeight;
    setContainerHeight(!height ? height : height - 40);
  }, []);

  const viewExample = (
    <a onClick={() => schema.setValue(exampleSchame)} style={{ fontSize: 12, textDecoration: "underline" }}>
      查看示例
    </a>
  );

  return (
    <EditorContext.Provider value={{ schema }}>
      <style>
        {`
      .form-editor-layout .ant-tabs-content { height: calc(${style.height || "100vh"} - 48px); }
      `}
      </style>
      <Layout
        top={<ActionBar />}
        left={
          <TabFields
            component={
              <TabFields.ComponentPanel
                groupName={GROUP_NAME}
                nodes={nodesConfig.nodes}
                onItem={handleField}
                onAdd={() => {
                  console.log("add");
                }}
              />
            }
            template={<TabFields.TemplatePanel />}
          />
        }
        right={
          <TabSetting
            notChoose={!schema.selected.id || schema.preview}
            form={<TabSetting.Panel.Form value={schema.value.form?.props} onChange={schema.setFormProps} />}
            layout={<TabSetting.Panel.Layout value={schema.getLayoutConfig()} onChange={schema.setLayoutConfig} />}
            dataConfig={<TabSetting.Panel.DataConfig value={{}} />}
            formItem={
              nodesConfig.formItem[schema.selected.input]?.enable !== false && (
                <TabSetting.Panel.FormItem
                  value={schema.value.formItem?.[schema.selected.name]?.props}
                  onChange={schema.setFormItemProps}
                  key={schema.selected.id}
                />
              )
            }
            component={
              <TabSetting.Panel.Component
                name={schema.selected.input}
                value={schema.value.component?.[schema.selected.name]?.props}
                config={nodesConfig.props[schema.selected.input]}
                onChange={schema.setComponentProps}
                key={schema.selected.id}
              />
            }
            relation={<TabSetting.Panel.Relation />}
            dataUse={<TabSetting.Panel.DataUse value={{}} />}
          />
        }
        style={style}
      >
        <DeviceBox ref={mainContainerRef} className={schema.device && "form-editor-wrapper"} device={schema.device}>
          <Form layout="horizontal" {...schema.value.form?.props} name="__form_editor__" style={{ background: "#fff", ...schema.value.form?.props?.style }}>
            <Canvas
              groupName={GROUP_NAME}
              schema={schema}
              layoutMap={{ "basic-form-layout": BasicFormLayout }}
              componentMap={components}
              nodesConfig={nodesConfig}
              transformItem={handleInitField}
              empty={<CanvasEmpty icon="icon-operation" title="点击/拖拽左侧栏目的组件进行添加" extra={viewExample} />}
              style={schema.device ? { height: "100%", overflow: "auto" } : { minHeight: containerHeight }}
            />
          </Form>
        </DeviceBox>
      </Layout>
    </EditorContext.Provider>
  );
}

export default Editor;
