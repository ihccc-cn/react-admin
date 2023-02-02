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

function Canvas({ ghost, preview, groupName, schema, setColumns, setLayout, nodesConfig, transformItem, empty, rowKey, style, selected, onSelect }) {
  const columns = schema.columns;

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
    setItemLayout(name, state => {
      const nextLock = !state.lock;
      if (nextLock) onSelect({});
      return { lock: nextLock };
    });
  }, []);

  const handleMoveup = React.useCallback(index => {
    setColumns(columns => swap(columns, index, index - 1));
  }, []);

  const handleMovedown = React.useCallback(index => {
    setColumns(columns => swap(columns, index, index + 1));
  }, []);

  const handleRemove = React.useCallback(
    key => {
      if (key === selected[rowKey]) onSelect && onSelect({});
      setColumns(columns => columns.filter(col => col[rowKey] !== key));
    },
    [selected, onSelect]
  );

  const handleSelect = React.useCallback(
    col => {
      onSelect && onSelect(col[rowKey] === selected[rowKey] ? {} : col);
    },
    [selected, onSelect]
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

    const formItemValue = schema.formItem?.[col.name]?.props;
    const componentValue = schema.component?.[col.name]?.props;

    const inputNdoe = React.createElement(components[col.input] || components["Input"], Object.assign({}, propsConfig.defaultProps, componentValue));

    const formItem =
      itemConfig.enable === false ? (
        inputNdoe
      ) : (
        <Form.Item {...itemConfig.props} label={col.title} tooltip={col.tip} name={col.name} {...formItemValue}>
          {inputNdoe}
        </Form.Item>
      );

    return {
      ...col,
      node: preview ? (
        formItem
      ) : (
        <CellEditor
          ghost={ghost}
          label={itemConfig.enable === false ? col.title : null}
          name={col.name}
          selected={selected[rowKey] === col[rowKey] || col.chosen}
          control={controlConfig}
          onLock={() => toggleLayoutItemLock(col.name)}
          onMoveup={() => handleMoveup(index)}
          onMovedown={() => handleMovedown(index)}
          onInline={() => toggleLayoutItemInline(col.name)}
          onResize={size => setLayoutItemWidth(col.name, size)}
          onRemove={() => handleRemove(col[rowKey])}
          onSelect={() => handleSelect(col)}
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
      layout={schema.layout}
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
