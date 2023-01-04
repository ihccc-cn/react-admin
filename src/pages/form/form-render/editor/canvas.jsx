import React from "react";
import { Form, Input } from "antd";
import { ReactSortable } from "react-sortablejs";
import FormCell from "../components/form-cell";
import { FlexFormLayout } from "../render";

function Canvas({ group, columns, setColumns, layout, setLayout }) {
  const setItemLayout = React.useCallback(
    (key, change) => {
      setLayout(state => {
        if (!state.items) state.items = {};
        const currentLayout = state.items[key] || {};
        state.items[key] = { ...currentLayout, ...(change ? change(currentLayout) : {}) };
        console.log(state.items[key]);
        return { ...state };
      });
    },
    [setLayout]
  );

  const toggleLayoutItemInline = React.useCallback(key => {
    console.log(key);
    setItemLayout(key, state => ({ ...state, inline: !state.inline }));
  }, []);

  const setLayoutItemWidth = React.useCallback((key, changeSize) => {
    setItemLayout(key, state => {
      const currentStyle = state.style || {};
      const currentWidth = +(currentStyle.width || "100%").replace("%", "");
      let nextWidth = currentWidth + Math.floor(changeSize * 100);
      nextWidth = Math.max(nextWidth, 10);
      nextWidth = Math.min(nextWidth, 100);
      return { ...state, style: { ...state.style, width: nextWidth + "%" } };
    });
  }, []);

  // console.log(layout);

  const items = React.useMemo(
    () =>
      columns.map(col => ({
        ...col,
        node: (
          <FormCell chosen={col.chosen} onInline={() => toggleLayoutItemInline(col.key)} onResize={size => setLayoutItemWidth(col.key, size)} key={col.key}>
            <Form.Item label={col.title} tooltip={col.tip} name={col.name || col.dataIndex}>
              <Input />
            </Form.Item>
          </FormCell>
        ),
      })),
    [columns]
  );

  return (
    <FlexFormLayout
      items={items}
      layout={layout}
      tag={ReactSortable}
      handle={FormCell.HANDLE_CLASSNAME}
      animation={150}
      list={columns}
      setList={setColumns}
      group={{ name: group, pull: "clone" }}
    />
  );
}

export default Canvas;
