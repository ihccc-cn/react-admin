import React from "react";
import useUpdate from "ahooks/lib/useUpdate";
import { version, EditorUtil } from "../utils";

function useSchema(schema) {
  const valueRef = React.useRef({ columns: [], layout: { type: "basic-form-layout" }, version });
  const update = useUpdate();

  const clear = React.useCallback(() => {
    valueRef.current = { columns: [], layout: { type: "basic-form-layout" }, version };
    update();
  }, []);

  const getExportValue = React.useCallback(() => {
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
      valueRef.current[type] = value(valueRef.current[type] || defaultValue || {});
    } else {
      valueRef.current[type] = value;
    }
    update();
  }, []);

  // 修改 columns 值
  const setColumns = React.useCallback(columns => setSubValue("columns", columns, []), []);

  // 修改 layout 值
  const setLayout = React.useCallback(layout => setSubValue("layout", layout), []);

  // 修改 form 值
  const setForm = React.useCallback(form => setSubValue("form", form), []);

  // 修改 form.props 值
  const setFormProps = React.useCallback((key, value, isInitial) => {
    setForm(form => {
      if (isInitial) {
        delete form.props[key];
        return form;
      }
      if (!form.props) form.props = {};
      form.props[key] = value;
      return Object.assign({}, form);
    });
  }, []);

  // 修改 formItem 值
  const setFormItem = React.useCallback(formItem => setSubValue("formItem", formItem), []);

  // 修改 formItem.props 值
  const setFormItemProps = React.useCallback((key, value, isInitial) => {
    const name = valueRef.current.selected.name;
    setFormItem(formItem => {
      if (isInitial) {
        console.log(formItem, name);
        delete formItem[name].props[key];
        return formItem;
      }
      if (!formItem[name]) formItem[name] = {};
      if (!formItem[name].props) formItem[name].props = {};
      formItem[name].props[key] = value;
      return Object.assign({}, formItem);
    });
  }, []);

  // 修改 component 值
  const setComponent = React.useCallback(component => setSubValue("component", component), []);

  // 修改 component.props 值
  const setComponentProps = React.useCallback((key, value, isInitial) => {
    const name = valueRef.current.selected.name;
    setComponent(component => {
      if (isInitial) {
        delete component[name].props[key];
        return component;
      }
      if (!component[name]) component[name] = {};
      if (!component[name].props) component[name].props = {};
      component[name].props[key] = value;
      return Object.assign({}, component);
    });
  }, []);

  // 修改当前选中项
  const setSelected = React.useCallback(selected => setSubValue("selected", selected), []);

  React.useEffect(() => {
    setValue(schema);
  }, [schema]);

  return {
    isEmpty: valueRef.current.columns.length === 0,
    clear,
    getExportValue,
    value: valueRef.current,
    selected: valueRef.current.selected || {},
    setValue,
    setColumns,
    setLayout,
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
