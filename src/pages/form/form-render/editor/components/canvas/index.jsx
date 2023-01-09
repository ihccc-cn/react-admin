import React from "react";
import { Form } from "antd";
import { ReactSortable } from "react-sortablejs";
import differenceBy from "lodash/differenceBy";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import set from "lodash/set";
import components from "../../../components";
import { FlexFormLayout } from "../../../render";
import { uuid, swap } from "../../../utils";
import CellEditor from "../cell-editor";

function Canvas({ groupName, columns, setColumns, layout, setLayout, empty, rowKey }) {
  const setItemLayout = React.useCallback((name, change) => {
    setLayout(state => {
      const newState = cloneDeep(state);
      const current = get(newState, "items." + name, {});
      const next = change(current);
      set(newState, "items." + name, Object.assign({}, current, next));
      return { ...newState };
    });
  }, []);

  const toggleLayoutItemInline = React.useCallback(name => {
    setItemLayout(name, state => ({ inline: !state.inline }));
  }, []);

  const setLayoutItemWidth = React.useCallback((name, size) => {
    setItemLayout(name, state => {
      const currentStyle = state.style || {};
      const currentWidth = +(currentStyle.width || "100%").replace("%", "");
      let nextWidth = currentWidth + size;
      nextWidth = Math.max(nextWidth, 10);
      nextWidth = Math.min(nextWidth, 100);
      return { style: { ...state.style, width: nextWidth + "%" } };
    });
  }, []);

  const toggleLayoutItemLock = React.useCallback(name => {
    setItemLayout(name, state => ({ lock: !state.lock }));
  }, []);

  const handleMoveup = React.useCallback(index => {
    setColumns(columns => swap(columns, index, index - 1));
  }, []);

  const handleMovedown = React.useCallback(index => {
    setColumns(columns => swap(columns, index, index + 1));
  }, []);

  const handleRemove = React.useCallback(key => {
    setColumns(columns => {
      return columns.filter(col => col[rowKey] !== key);
    });
  }, []);

  const items = columns.map((col, index) => {
    return {
      ...col,
      node: (
        <CellEditor
          label={col.formItem === false ? col.title : null}
          name={col.name}
          chosen={col.chosen}
          control={col.control}
          onLock={() => toggleLayoutItemLock(col.name)}
          onMoveup={() => handleMoveup(index)}
          onMovedown={() => handleMovedown(index)}
          onInline={() => toggleLayoutItemInline(col.name)}
          onResize={size => setLayoutItemWidth(col.name, size)}
          onRemove={() => handleRemove(col[rowKey])}
          key={col[rowKey]}
        >
          {col.formItem === false ? (
            React.createElement(components[col.input] || components["Input"])
          ) : (
            <Form.Item label={col.title} tooltip={col.tip} name={col.name} {...col.itemProps}>
              {React.createElement(components[col.input] || components["Input"])}
            </Form.Item>
          )}
        </CellEditor>
      ),
    };
  });

  return (
    <FlexFormLayout
      items={items}
      layout={layout}
      empty={empty}
      tag={ReactSortable}
      handle={CellEditor.HANDLE_CLASSNAME}
      filter={CellEditor.FILTER_CLASSNAME}
      animation={300}
      list={columns}
      setList={list => {
        setColumns(current => {
          const [added] = differenceBy(list, current, "id");
          if (!added) return list;
          const index = list.indexOf(added);
          const newColumns = [...list];
          newColumns.splice(index, 1, { ...added, name: uuid(added.type), input: added.type });
          return newColumns;
        });
      }}
      group={{ name: groupName, pull: "clone" }}
      style={{ height: "100%" }}
    />
  );
}

Canvas.defaultProps = {
  rowKey: "id",
};

export default Canvas;
