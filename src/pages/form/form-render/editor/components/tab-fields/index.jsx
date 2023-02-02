import React from "react";
import { ReactSortable } from "react-sortablejs";
import { Tabs, Collapse, Button } from "antd";
import Icon from "@/common/components/icon";
import { uuid, stopPropagationEvent } from "../../../utils";
import CellField from "../cell-field";

function ComponentPanel({ groupName, nodes, rowKey, onItem, onAdd }) {
  const [source, setSource] = React.useState(nodes || []);

  const setList = (index, list) => {
    setSource(source => {
      const newSource = [...source];
      newSource[index].children = list;
      return newSource;
    });
  };

  return (
    <Collapse accordion bordered={false} defaultActiveKey={[source[0][rowKey]]}>
      {source.map((group, index) => (
        <Collapse.Panel
          header={group.group}
          {...(group.addAble ? { extra: <Button type="link" size="small" icon={<Icon type="icon-add" />} onClick={stopPropagationEvent(onAdd)} /> } : {})}
          key={group[rowKey]}
        >
          <ReactSortable
            animation={150}
            list={group.children}
            setList={list => setList(index, list)}
            group={{ name: groupName, pull: "clone", put: false }}
            clone={item => ({ ...item, [rowKey]: uuid() })}
            sort={false}
          >
            {group.children.map(item => (
              <CellField title={item.title} type={item.type} icon={item.icon} onClick={() => onItem({ ...item, [rowKey]: uuid() })} key={item[rowKey]} />
            ))}
          </ReactSortable>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}

ComponentPanel.defaultProps = {
  rowKey: "id",
};

function TemplatePanel() {
  return <div>模板</div>;
}

function TabFields({ component, template }) {
  return (
    <Tabs
      items={[
        ...(!component ? [] : [{ label: "组件", key: "form", children: component }]),
        ...(!template ? [] : [{ label: "模板", key: "component", children: template }]),
      ]}
    />
  );
}

TabFields.ComponentPanel = ComponentPanel;
TabFields.TemplatePanel = TemplatePanel;

export default TabFields;
