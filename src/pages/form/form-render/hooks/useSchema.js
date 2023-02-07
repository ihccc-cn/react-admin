import React from "react";
import useUpdate from "ahooks/lib/useUpdate";
import set from "lodash/set";
import { version, EditorUtil } from "../utils";

function useSchema(schema) {
  const valueRef = React.useRef({ columns: [], layout: { type: "basic-form-layout" }, version });
  const update = useUpdate();

  const clear = React.useCallback(() => {
    valueRef.current = { columns: [], layout: { type: "basic-form-layout" }, version };
    update();
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

  // 获取导出 json
  const getExportJson = React.useCallback(() => {
    return EditorUtil.exportJson(valueRef.current);
  }, []);

  const setValue = React.useCallback(value => {
    if (!value) return;
    if (EditorUtil.checkValue(value)) {
      valueRef.current = EditorUtil.importValue(value);
      update();
    } else {
      console.warn("[form-editor] schema incorrect format.");
    }
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
        // const { active, screens } = value;
        // if (!!screens) {
        //   if (!layout.screens) layout.screens = {};
        //   for (const key in layout.screens) {
        //     if (screens.indexOf(key) === -1) delete layout.screens[key];
        //   }
        //   for (const key of screens) {
        //     if (!layout.screens[key]) layout.screens[key] = {};
        //   }
        // }
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
  const setFormItemProps = React.useCallback((key, value) => {
    const name = valueRef.current.selected.name;
    setFormItem(formItem => {
      if (!formItem[name]) formItem[name] = {};
      if (!formItem[name].props) formItem[name].props = {};
      formItem[name].props[key] = value;
      return Object.assign({}, formItem);
    });
  }, []);

  // 修改 component 值
  const setComponent = React.useCallback(component => setSubValue("component", component, {}), []);

  // 修改 component.props 值
  const setComponentProps = React.useCallback((key, value) => {
    const name = valueRef.current.selected.name;
    setComponent(component => {
      if (!component[name]) component[name] = {};
      if (!component[name].props) component[name].props = {};
      component[name].props[key] = value;
      return Object.assign({}, component);
    });
  }, []);

  // 修改当前选中项
  const setSelected = React.useCallback(selected => setSubValue("selected", selected, {}), []);

  // 切换预览
  const toggleGhost = React.useCallback(() => setSubValue("ghost", ghost => !ghost), []);

  // 切换预览
  const togglePreview = React.useCallback(() => setSubValue("preview", preview => !preview), []);

  // 设置预览设备
  const setDevice = React.useCallback(device => {
    setSubValue("device", device);
    // 如果有，显示对应布局
    const { screens } = getLayoutConfig();
    if (device === "phone" && !!screens["xs"]) setLayoutConfig("active", { active: "xs" });
    if (device === "pad" && !!screens["lg"]) setLayoutConfig("active", { active: "lg" });
    if (!device && !!screens["default"]) setLayoutConfig("active", { active: "default" });
  }, []);

  React.useEffect(() => {
    setValue(schema);
  }, [schema]);

  return {
    isEmpty: valueRef.current.columns.length === 0,
    value: valueRef.current,
    device: valueRef.current.device || null,
    ghost: valueRef.current.ghost || false,
    preview: valueRef.current.preview || false,
    selected: valueRef.current.selected || {},
    clear,
    getLayout,
    getLayoutItem,
    getLayoutConfig,
    getExportJson,
    toggleGhost,
    togglePreview,
    setDevice,
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
    setSelected,
  };
}

export default useSchema;
