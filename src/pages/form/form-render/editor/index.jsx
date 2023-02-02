import React from "react";
import { Form } from "antd";
import useSchema from "../hooks/useSchema";
import ActionBar from "./components/action-bar";
import TabFields from "./components/tab-fields";
import TabSetting from "./components/tab-setting";
import Canvas from "./components/canvas";
import CanvasEmpty from "./components/canvas-empty";
import ModalExport from "./components/modal-export";
import ModalImport from "./components/modal-import";
import Layout from "./layout";
import { uuid } from "../utils";
import nodesConfig from "../nodes-config.json";
import exampleSchame from "../../fr-example.json";
import "./index.css";

const GROUP_NAME = "form-editor";

const transformField = ({ type, ...data }) => {
  return { ...data, name: uuid(type), input: type };
};

function Editor({ schema: schemaValue, style }) {
  const mainContainerRef = React.useRef(null);
  const schema = useSchema(schemaValue);
  const [ghost, setGhost] = React.useState(true);
  const [preview, setPreview] = React.useState(false);
  const [imVisible, setImVisible] = React.useState(false);
  const [exportJson, setExportJson] = React.useState(null);
  const [containerHeight, setContainerHeight] = React.useState(null);

  console.log("💾[editor-value]: ", schema.value);

  // console.log("[selected]: ", schema.selected);

  const handleGhost = React.useCallback(() => {
    setGhost(ghost => !ghost);
  }, []);

  const handlePreview = React.useCallback(() => {
    setPreview(preview => !preview);
  }, []);

  const handleExport = React.useCallback(() => {
    setExportJson(schema.getExportValue());
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
            state={{ ghost, preview }}
            onGhost={handleGhost}
            onPreview={handlePreview}
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
            notChoose={!schema.selected.id}
            form={<TabSetting.FormPanel value={schema.value.form?.props} onChange={schema.setFormProps} />}
            formItem={
              nodesConfig.formItem[schema.selected.input]?.enable !== false && (
                <TabSetting.FormItemPanel
                  value={schema.value.formItem?.[schema.selected.name]?.props}
                  onChange={schema.setFormItemProps}
                  key={schema.selected.id}
                />
              )
            }
            component={
              <TabSetting.ComponentPanel
                name={schema.selected.input}
                value={schema.value.component?.[schema.selected.name]?.props}
                config={nodesConfig.props[schema.selected.input]}
                onChange={schema.setComponentProps}
                key={schema.selected.id}
              />
            }
          />
        }
        style={style}
      >
        <div ref={mainContainerRef}>
          <Form layout="horizontal" {...schema.value.form?.props} name="__form_editor__" style={{ background: "#fff", ...schema.value.form?.props?.style }}>
            <Canvas
              ghost={ghost}
              preview={preview}
              groupName={GROUP_NAME}
              schema={schema.value}
              setColumns={schema.setColumns}
              setLayout={schema.setLayout}
              nodesConfig={nodesConfig}
              transformItem={transformField}
              empty={<CanvasEmpty icon="icon-operation" title="点击/拖拽左侧栏目的组件进行添加" extra={viewExample} />}
              selected={schema.selected}
              onSelect={schema.setSelected}
              style={{ minHeight: containerHeight }}
            />
          </Form>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default Editor;
