import React from "react";
import { Form } from "antd";
import { ReactSortable } from "react-sortablejs";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import set from "lodash/set";
import components from "../../../components";
import { FlexFormLayout } from "../../../render";
import { swap } from "../../../utils";
import CellEditor from "../cell-editor";
import CanvasEmpty from "../canvas-empty";

function Canvas({ groupName, columns, setColumns, layout, setLayout }) {
  const setItemLayout = React.useCallback((key, change) => {
    setLayout(state => {
      const newState = cloneDeep(state);
      const current = get(newState, "items." + key, {});
      const next = change(current);
      set(newState, "items." + key, Object.assign({}, current, next));
      return { ...newState };
    });
  }, []);

  const toggleLayoutItemInline = React.useCallback(key => {
    setItemLayout(key, state => ({ inline: !state.inline }));
  }, []);

  const setLayoutItemWidth = React.useCallback((key, changeSize) => {
    setItemLayout(key, state => {
      const currentStyle = state.style || {};
      const currentWidth = +(currentStyle.width || "100%").replace("%", "");
      let nextWidth = currentWidth + changeSize;
      nextWidth = Math.max(nextWidth, 10);
      nextWidth = Math.min(nextWidth, 100);
      return { style: { ...state.style, width: nextWidth + "%" } };
    });
  }, []);

  const toggleLayoutItemLock = React.useCallback(key => {
    setItemLayout(key, state => ({ lock: !state.lock }));
  }, []);

  const handleMoveup = React.useCallback(index => {
    setColumns(columns => swap(columns, index, index - 1));
  }, []);

  const handleMovedown = React.useCallback(index => {
    setColumns(columns => swap(columns, index, index + 1));
  }, []);

  const handleRemove = React.useCallback(key => {
    setColumns(columns => {
      return columns.filter(col => col.key !== key);
    });
  }, []);

  const items = columns.map((col, index) => {
    const name = col.name || col.dataIndex;
    return {
      ...col,
      node: (
        <CellEditor
          name={name}
          chosen={col.chosen}
          onLock={() => toggleLayoutItemLock(name)}
          onMoveup={() => handleMoveup(index)}
          onMovedown={() => handleMovedown(index)}
          onInline={() => toggleLayoutItemInline(name)}
          onResize={size => setLayoutItemWidth(name, size)}
          onRemove={() => handleRemove(col.key)}
          key={col.key}
        >
          <Form.Item label={col.title} tooltip={col.tip} name={name} {...col.itemProps}>
            {React.createElement(components[col.input] || components["Input"])}
          </Form.Item>
        </CellEditor>
      ),
    };
  });

  return (
    <FlexFormLayout
      items={items}
      layout={layout}
      empty={<CanvasEmpty />}
      tag={ReactSortable}
      handle={CellEditor.HANDLE_CLASSNAME}
      filter={CellEditor.FILTER_CLASSNAME}
      animation={150}
      list={columns}
      setList={setColumns}
      group={{ name: groupName, pull: "clone" }}
    />
  );
}

export default Canvas;
