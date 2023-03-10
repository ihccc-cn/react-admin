import React from "react";
import useUpdate from "ahooks/lib/useUpdate";
import set from "lodash/set";
import uniqWith from "lodash/uniqWith";
import { version, EditorUtil } from "../utils";

function useSchema(schemaValue) {
  const valueRef = React.useRef({ columns: [], layout: { type: "basic-form-layout" }, version });
  const update = useUpdate();

  const setValue = React.useCallback(value => {
    if (!value) return;
    if (EditorUtil.checkValue(value)) {
      valueRef.current = EditorUtil.importValue(value);
      update();
    } else {
      console.warn("[form-editor] schema incorrect format.");
    }
  }, []);

  // 获取布局
  const getLayout = React.useCallback(() => {
    const { layout } = valueRef.current;
    return layout.screens?.[layout.active] || {};
  }, []);

  // 获取某一项布局
  const getLayoutItem = React.useCallback(name => {
    const layout = getLayout();
    const cell = layout[name];
    if (!cell) return {};
    const result = {};
    ["style", "inline", "lock"].forEach(key => {
      const data = cell[key] ?? layout[key];
      if (typeof data !== "undefined") result[key] = data;
    });
    return result;
  }, []);

  const getLayoutConfig = React.useCallback(() => {
    const { layout } = valueRef.current;
    return {
      ...layout,
      active: {
        active: layout.active,
        screens: Object.keys(layout.screens || {}),
      },
    };
  }, []);

  const setSubValue = React.useCallback((type, value, defaultValue) => {
    if (typeof value === "function") {
      valueRef.current[type] = value(valueRef.current[type] || defaultValue);
    } else {
      valueRef.current[type] = value;
    }
    update();
  }, []);

  // 修改 columns 值
  const setColumns = React.useCallback(columns => setSubValue("columns", columns, []), []);

  // 修改 layout 值
  const setLayout = React.useCallback(layout => setSubValue("layout", layout, {}), []);

  // 修改 layout 某项的值
  const setLayoutItem = React.useCallback((name, value) => {
    setLayout(layout => {
      const layoutItem = getLayoutItem(name);
      if (typeof value === "function") value = value(layoutItem);
      if (!layout.active) layout.active = "default";
      set(layout, ["screens", layout.active, name].join("."), Object.assign({}, layoutItem, value));
      return layout;
    });
  }, []);

  // 配置修改 layout 内的值
  const setLayoutConfig = React.useCallback((key, value) => {
    setLayout(layout => {
      if (key === "active") {
        const { active, create, remove } = value;
        if (!layout.screens) layout.screens = {};
        if (create && !layout.screens[create]) layout.screens[create] = {};
        if (remove && !!layout.screens[remove]) delete layout.screens[remove];
        return { ...layout, active: active || layout.active };
      } else {
        return { ...layout, [key]: value };
      }
    });
  }, []);

  // 修改 form 值
  const setForm = React.useCallback(form => setSubValue("form", form, {}), []);

  // 修改 form.props 值
  const setFormProps = React.useCallback((key, value) => {
    setForm(form => {
      if (!form.props) form.props = {};
      form.props[key] = value;
      return Object.assign({}, form);
    });
  }, []);

  // 修改 formItem 值
  const setFormItem = React.useCallback(formItem => setSubValue("formItem", formItem, {}), []);

  // 修改 formItem.props 值
  const setFormItemProps = React.useCallback((key, value, name) => {
    const target = name || valueRef.current.selected.name;
    setFormItem(formItem => {
      if (!formItem[target]) formItem[target] = {};
      if (!formItem[target].props) formItem[target].props = {};
      formItem[target].props[key] = value;
      return Object.assign({}, formItem);
    });
  }, []);

  // 修改 component 值
  const setComponent = React.useCallback(component => setSubValue("component", component, {}), []);

  // 修改 component.props 值
  const setComponentProps = React.useCallback((key, value, name) => {
    const target = name || valueRef.current.selected.name;
    setComponent(component => {
      if (!component[target]) component[target] = {};
      if (!component[target].props) component[target].props = {};
      component[target].props[key] = value;
      return Object.assign({}, component);
    });
  }, []);

  // 修改 relation 值
  const setRelations = React.useCallback(
    newRelations => setSubValue("relations", relations => uniqWith(relations.concat(newRelations), (a, b) => a.source + a.target === b.source + b.target), []),
    []
  );

  React.useEffect(() => {
    setValue(schemaValue);
  }, [schemaValue]);

  return {
    valueRef,
    value: valueRef.current,
    getLayout,
    getLayoutItem,
    getLayoutConfig,
    setValue,
    setColumns,
    setLayout,
    setLayoutItem,
    setLayoutConfig,
    setForm,
    setFormProps,
    setFormItem,
    setFormItemProps,
    setComponent,
    setComponentProps,
    setRelations,
    setSubValue,
    update,
  };
}

export default useSchema;
