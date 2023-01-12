import React from "react";
import { Form } from "antd";
import { ReactSortable } from "react-sortablejs";
import differenceBy from "lodash/differenceBy";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import set from "lodash/set";
import components from "../../../components";
import { FlexFormLayout } from "../../../render";
import { swap } from "../../../utils";
import CellEditor from "../cell-editor";

function Canvas({ preview, groupName, columns, setColumns, layout, setLayout, nodesConfig, transformItem, empty, rowKey, style, selected, onSelect }) {
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
    setColumns(columns => columns.filter(col => col[rowKey] !== key));
  }, []);

  const handleSelect = React.useCallback(
    col => {
      if (!onSelect) return;
      if (col[rowKey] === selected[rowKey]) {
        onSelect({});
        return;
      }
      const itemConfig = nodesConfig.formItem[col.input || "Input"] || {};
      const propsConfig = nodesConfig.props[col.input || "Input"] || {};
      onSelect(Object.assign({ formItem: itemConfig, props: propsConfig }, col));
    },
    [selected]
  );

  const setList = React.useCallback(list => {
    setColumns(current => {
      const [added] = differenceBy(list, current, "id");
      if (!added) return list;
      const index = list.indexOf(added);
      const newColumns = [...list];
      newColumns.splice(index, 1, transformItem(added));
      return newColumns;
    });
  }, []);

  const items = columns.map((col, index) => {
    const controlConfig = nodesConfig.control[col.input || "Input"] || {};
    const itemConfig = nodesConfig.formItem[col.input || "Input"] || {};
    const propsConfig = nodesConfig.props[col.input || "Input"] || {};

    const inputNdoe = React.createElement(components[col.input] || components["Input"], propsConfig.default);

    const formItem =
      itemConfig.enable === false ? (
        inputNdoe
      ) : (
        <Form.Item {...itemConfig.props} label={col.title} tooltip={col.tip} name={col.name}>
          {inputNdoe}
        </Form.Item>
      );

    return {
      ...col,
      node: preview ? (
        formItem
      ) : (
        <CellEditor
          label={itemConfig.enable === false ? col.title : null}
          name={col.name}
          chosen={selected[rowKey] === col[rowKey] || col.chosen}
          control={controlConfig}
          onLock={() => toggleLayoutItemLock(col.name)}
          onMoveup={() => handleMoveup(index)}
          onMovedown={() => handleMovedown(index)}
          onInline={() => toggleLayoutItemInline(col.name)}
          onResize={size => setLayoutItemWidth(col.name, size)}
          onRemove={() => handleRemove(col[rowKey])}
          onClick={() => handleSelect(col)}
          key={col[rowKey]}
        >
          {formItem}
        </CellEditor>
      ),
    };
  });

  return (
    <FlexFormLayout
      itemPropsProvide={!preview}
      items={items}
      layout={layout}
      empty={empty}
      tag={ReactSortable}
      handle={CellEditor.HANDLE_CLASSNAME}
      filter={CellEditor.FILTER_CLASSNAME}
      animation={300}
      list={columns}
      setList={setList}
      group={{ name: groupName, pull: "clone" }}
      style={{ padding: 20, boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)", ...style }}
    />
  );
}

Canvas.defaultProps = {
  rowKey: "id",
};

export default Canvas;
