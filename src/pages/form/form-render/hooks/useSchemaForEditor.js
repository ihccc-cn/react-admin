import React from "react";
import useSchema from "./useSchema";
import { version, EditorUtil } from "../utils";

/**
 * useSchemaForEditor 会比 useSchema 多一些 Editor 的操作方法
 * @param {*} schema
 * @returns
 */
function useSchemaForEditor(schemaValue) {
  const schema = useSchema(schemaValue);

  const clear = React.useCallback(() => {
    schema.valueRef.current = { columns: [], layout: { type: "basic-form-layout" }, version };
    schema.update();
  }, []);

  // 获取导出 json
  const getExportJson = React.useCallback(() => {
    return EditorUtil.exportJson(schema.valueRef.current);
  }, []);

  // 修改当前选中项
  const setSelected = React.useCallback(selected => schema.setSubValue("selected", selected, {}), []);

  // 切换幽灵模式
  const toggleGhost = React.useCallback(() => schema.setSubValue("ghost", ghost => !ghost), []);

  // 切换预览
  const togglePreview = React.useCallback(() => schema.setSubValue("preview", preview => !preview), []);

  // 设置预览设备
  const setDevice = React.useCallback(device => {
    schema.setSubValue("device", current => {
      const nextState = typeof device === "function" ? device(current) : device;
      // 如果有，显示对应布局
      const { screens = {} } = schema.getLayoutConfig();
      if (nextState === "phone" && !!screens["xs"]) schema.setLayoutConfig("active", { active: "xs" });
      else if (nextState === "pad" && !!screens["lg"]) schema.setLayoutConfig("active", { active: "lg" });
      else if (!nextState && !!screens["default"]) schema.setLayoutConfig("active", { active: "default" });
      return nextState;
    });
  }, []);

  return {
    ...schema,
    isEmpty: schema.valueRef.current.columns.length === 0,
    device: schema.valueRef.current.device || null,
    ghost: schema.valueRef.current.ghost || false,
    preview: schema.valueRef.current.preview || false,
    selected: schema.valueRef.current.selected || {},
    clear,
    getExportJson,
    toggleGhost,
    togglePreview,
    setDevice,
    setSelected,
  };
}

export default useSchemaForEditor;
