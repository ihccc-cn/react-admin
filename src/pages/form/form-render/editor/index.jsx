import React from "react";
import clsx from "clsx";
import { Form } from "antd";
import useSchemaForEditor from "../hooks/useSchemaForEditor";
import ActionBar from "./components/action-bar";
import TabFields from "./components/tab-fields";
import TabSetting from "./components/tab-setting";
import Canvas from "./components/canvas";
import CanvasEmpty from "./components/canvas-empty";
import ModalExport from "./components/modal-export";
import ModalImport from "./components/modal-import";
import Layout from "./layout";
import nodesConfig from "../nodes-config.json";
import components from "../components";
import { BasicFormLayout } from "../render";
import { uuid } from "../utils";
import exampleSchame from "../../fr-example.json";
import "./index.css";

const GROUP_NAME = "form-editor";

const transformField = ({ type, ...data }) => {
  return { ...data, name: uuid(type), input: type };
};

function Editor({ schema: schemaValue, style }) {
  const mainContainerRef = React.useRef(null);
  const schema = useSchemaForEditor(schemaValue);
  const [imVisible, setImVisible] = React.useState(false);
  const [exportJson, setExportJson] = React.useState(null);
  const [containerHeight, setContainerHeight] = React.useState(null);

  console.log("💾[editor-schema]: ", schema);

  const handleExport = React.useCallback(() => {
    setExportJson(schema.getExportJson());
  }, []);

  const handleField = React.useCallback(item => {
    schema.setColumns(current => current.concat(transformField(item)));
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
    <React.Fragment>
      <style>
        {`
      .form-editor-layout .ant-tabs-content { height: calc(${style.height || "100vh"} - 48px); }
      `}
      </style>
      <ModalExport open={!!exportJson} value={exportJson} onCancel={() => setExportJson(null)} />
      <ModalImport open={imVisible} onOk={schema.setValue} onCancel={() => setImVisible(false)} />
      <Layout
        top={
          <ActionBar
            visible={{ preview: !schema.isEmpty, export: !schema.isEmpty, clear: !schema.isEmpty }}
            state={{ device: schema.device, ghost: schema.ghost, preview: schema.preview }}
            onPhone={() => schema.setDevice(schema.device !== "phone" ? "phone" : null)}
            onPad={() => schema.setDevice(schema.device !== "pad" ? "pad" : null)}
            onGhost={schema.toggleGhost}
            onPreview={schema.togglePreview}
            onImport={() => setImVisible(true)}
            onExport={handleExport}
            onClear={schema.clear}
          />
        }
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
            relation={<TabSetting.Panel.Relation value={{}} />}
            data={<TabSetting.Panel.Data value={{}} />}
          />
        }
        style={style}
      >
        <div
          ref={mainContainerRef}
          className={clsx(schema.device && "form-editor-wrapper-device", schema.device === "pad" && "form-editor-wrapper-device-pad")}
        >
          <Form layout="horizontal" {...schema.value.form?.props} name="__form_editor__" style={{ background: "#fff", ...schema.value.form?.props?.style }}>
            <Canvas
              groupName={GROUP_NAME}
              schema={schema}
              layoutMap={{ "basic-form-layout": BasicFormLayout }}
              componentMap={components}
              nodesConfig={nodesConfig}
              transformItem={transformField}
              empty={<CanvasEmpty icon="icon-operation" title="点击/拖拽左侧栏目的组件进行添加" extra={viewExample} />}
              style={schema.device ? { height: "100%", overflow: "auto" } : { minHeight: containerHeight }}
            />
          </Form>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default Editor;
