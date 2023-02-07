import React from "react";
import { Form } from "antd";
import { ReactSortable } from "react-sortablejs";
import differenceBy from "lodash/differenceBy";
import { p2n, swap } from "../../../utils";
import CellEditor from "../cell-editor";

function Canvas({ groupName, schema, layoutMap, componentMap, nodesConfig, transformItem, empty, rowKey, style }) {
  const { columns, formItem, component, layout } = schema.value;

  if (columns.length === 0) return empty;

  const setLayoutItemWidth = React.useCallback((name, size) => {
    schema.setLayoutItem(name, layoutItem => {
      const currentWidth = p2n(layoutItem.style?.width) || 100;
      let nextWidth = currentWidth + size;
      if (nextWidth < 10) nextWidth = 10;
      if (nextWidth > 100) nextWidth = 100;
      return { style: { ...layoutItem.style, width: nextWidth + "%" } };
    });
  }, []);

  const toggleLayoutItemInline = React.useCallback(name => {
    schema.setLayoutItem(name, layoutItem => ({ inline: !layoutItem.inline }));
  }, []);

  const toggleLayoutItemLock = React.useCallback(name => {
    schema.setLayoutItem(name, layoutItem => {
      const nextLock = !layoutItem.lock;
      if (nextLock) schema.setSelected({});
      return { lock: nextLock };
    });
  }, []);

  const handleMoveup = React.useCallback(index => {
    schema.setColumns(columns => swap(columns, index, index - 1));
  }, []);

  const handleMovedown = React.useCallback(index => {
    schema.setColumns(columns => swap(columns, index, index + 1));
  }, []);

  const handleRemove = React.useCallback(key => {
    if (key === schema.selected[rowKey]) schema.setSelected && schema.setSelected({});
    schema.setColumns(columns => columns.filter(col => col[rowKey] !== key));
  }, []);

  const handleSelect = React.useCallback(col => {
    schema.setSelected && schema.setSelected(selected => (col[rowKey] === selected[rowKey] ? {} : col));
  }, []);

  const setList = React.useCallback(list => {
    schema.setColumns(current => {
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

    const formItemValue = formItem?.[col.name]?.props;
    const componentValue = component?.[col.name]?.props;

    const inputNdoe = React.createElement(componentMap[col.input] || componentMap["Input"], Object.assign({}, propsConfig.defaultProps, componentValue));

    const formItemNode =
      itemConfig.enable === false ? (
        inputNdoe
      ) : (
        <Form.Item {...itemConfig.props} label={col.title} tooltip={col.tip} name={col.name} {...formItemValue}>
          {inputNdoe}
        </Form.Item>
      );

    return {
      ...col,
      node: schema.preview ? (
        formItemNode
      ) : (
        <CellEditor
          ghost={schema.ghost}
          label={itemConfig.enable === false ? col.title : null}
          name={col.name}
          selected={schema.selected[rowKey] === col[rowKey] || col.chosen}
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
          {formItemNode}
        </CellEditor>
      ),
    };
  });

  const BasicFormLayout = layoutMap[layout.type];

  return (
    <BasicFormLayout
      preview={schema.preview}
      items={items}
      getLayoutItem={schema.getLayoutItem}
      tag={ReactSortable}
      // ReactSortable.props
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
