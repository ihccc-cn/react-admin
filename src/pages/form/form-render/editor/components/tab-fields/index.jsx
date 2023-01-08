import React from "react";
import { ReactSortable } from "react-sortablejs";
import { Tabs, Collapse } from "antd";
import { uuid } from "@/utils/utils";
import CellField from "../cell-field";

function ComponentPanel({ groupName, items }) {
  const [source, setSource] = React.useState(items || []);

  const setList = (index, list) => {
    setSource(source => {
      const newSource = [...source];
      newSource[index].children = list;
      return newSource;
    });
  };

  return (
    <Collapse defaultActiveKey={[source[0].key]} bordered={false}>
      {source.map((group, index) => (
        <Collapse.Panel header={group.group} key={group.key}>
          <ReactSortable
            animation={150}
            list={group.children}
            setList={list => setList(index, list)}
            group={{ name: groupName, pull: "clone", put: false }}
            clone={item => {
              const newItem = { ...item, key: uuid() };
              console.log("clone", newItem);
              return newItem;
            }}
            sort={false}
          >
            {group.children.map(item => (
              <CellField title={item.title} icon={item.icon} key={item.key} />
            ))}
          </ReactSortable>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}

function TemplatePanel() {
  return <div>模板</div>;
}

function TabFields({ component, template }) {
  return (
    <div style={{ marginTop: -20 }}>
      <Tabs
        items={[
          ...(!component ? [] : [{ label: "组件", key: "form", children: component }]),
          ...(!template ? [] : [{ label: "模板", key: "component", children: template }]),
        ]}
      />
    </div>
  );
}

TabFields.ComponentPanel = ComponentPanel;
TabFields.TemplatePanel = TemplatePanel;

export default TabFields;
