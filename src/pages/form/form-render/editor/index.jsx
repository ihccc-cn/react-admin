import React from "react";
import { Form } from "antd";
import useSchema from "../hooks/useSchema";
import ActionBar from "./components/action-bar";
import TabFields from "./components/tab-fields";
import TabSetting from "./components/tab-setting";
import Canvas from "./components/canvas";
import CanvasEmpty from "./components/canvas-empty";
import Layout from "./layout";
import inputNodes from "../input-nodes.json";

const GROUP_NAME = "form-editor";

function Editor({ schema }) {
  const { value, setColumns, setLayout, setValue, clear } = useSchema();

  console.log("💾[editor-value]: ", value);

  const viewExample = (
    <a onClick={() => setValue(schema)} style={{ fontSize: 12, textDecoration: "underline" }}>
      查看示例
    </a>
  );

  return (
    <React.Fragment>
      <style>{`
      .form-editor-layout .ant-tabs-content { height: calc(100vh - 224px); overflow: auto; }
      .form-editor-layout .ant-collapse-item .ant-collapse-header { padding: 6px 8px; }
      .form-editor-layout .ant-collapse-item .ant-collapse-content .ant-collapse-content-box { padding: 4px 12px 12px; }
      `}</style>
      <Layout
        top={<ActionBar onClear={clear} />}
        left={<TabFields component={<TabFields.ComponentPanel groupName={GROUP_NAME} items={inputNodes} />} template={<TabFields.TemplatePanel />} />}
        right={<TabSetting form={<TabSetting.FormPanel />} component={<TabSetting.ComponentPanel />} />}
        style={{ height: "calc(100vh - 140px)" }}
      >
        <Form name="basic" layout="vertical" style={{ height: "100%" }}>
          <Canvas
            groupName={GROUP_NAME}
            columns={value.columns}
            setColumns={setColumns}
            layout={value.layout}
            setLayout={setLayout}
            empty={<CanvasEmpty icon="icon-operation" title="拖拽左侧栏目的组件进行添加" extra={viewExample} />}
          />
        </Form>
      </Layout>
    </React.Fragment>
  );
}

export default Editor;
