import React from "react";
import { Form } from "antd";
import useSchema from "../hooks/useSchema";
import ActionBar from "./components/action-bar";
import TabFields from "./components/tab-fields";
import TabSetting from "./components/tab-setting";
import Canvas from "./components/canvas";
import CanvasEmpty from "./components/canvas-empty";
import IoModal from "./components/io-modal";
import Layout from "./layout";
import { uuid } from "../utils";
import inputNodes from "../input-nodes.json";
import exampleSchame from "../fr-example.json";

const GROUP_NAME = "form-editor";

const transformField = item => {
  return { ...item, name: uuid(item.type), input: item.type };
};

function Editor({ schema }) {
  const { value, isEmpty, getExportValue, setColumns, setLayout, setValue, clear } = useSchema();
  const [preview, setPreview] = React.useState(false);
  const [exportJson, setExportJson] = React.useState(null);

  console.log("💾[editor-value]: ", value);

  const handlePreview = () => {
    setPreview(preview => !preview);
  };

  const handleExport = () => {
    setExportJson(getExportValue());
  };

  const handleField = item => {
    setColumns(current => current.concat(transformField(item)));
  };

  const viewExample = (
    <a onClick={() => setValue(schema || exampleSchame)} style={{ fontSize: 12, textDecoration: "underline" }}>
      查看示例
    </a>
  );

  return (
    <React.Fragment>
      <style>
        {`
      .form-editor-layout .ant-tabs-content { height: calc(100vh - 224px); overflow: auto; }
      .form-editor-layout .ant-collapse-item .ant-collapse-header { padding: 6px 8px; }
      .form-editor-layout .ant-collapse-item .ant-collapse-content .ant-collapse-content-box { padding: 4px 12px 12px; }
      `}
      </style>
      <IoModal open={!!exportJson} value={exportJson} onCancel={() => setExportJson(null)} />
      <Layout
        top={
          <ActionBar
            visible={{ preview: !isEmpty, export: !isEmpty, clear: !isEmpty }}
            preview={preview}
            onPreview={handlePreview}
            onExport={handleExport}
            onClear={clear}
          />
        }
        left={
          <TabFields
            component={<TabFields.ComponentPanel groupName={GROUP_NAME} items={inputNodes} onItem={handleField} />}
            template={<TabFields.TemplatePanel />}
          />
        }
        right={<TabSetting form={<TabSetting.FormPanel />} component={<TabSetting.ComponentPanel />} />}
        style={{ height: "calc(100vh - 140px)" }}
      >
        <Form name="__form_editor__" layout="vertical" style={{ height: "100%" }}>
          <Canvas
            preview={preview}
            groupName={GROUP_NAME}
            columns={value.columns}
            setColumns={setColumns}
            layout={value.layout}
            setLayout={setLayout}
            transformItem={transformField}
            empty={<CanvasEmpty icon="icon-operation" title="点击/拖拽左侧栏目的组件进行添加" extra={viewExample} />}
          />
        </Form>
      </Layout>
    </React.Fragment>
  );
}

export default Editor;
