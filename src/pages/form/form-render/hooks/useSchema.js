import React from "react";
import useUpdate from "ahooks/lib/useUpdate";
import { EditorUtil } from "../utils";

function useSchema(schema) {
  const valueRef = React.useRef({ columns: [], layout: {} });
  const update = useUpdate();

  const setColumns = React.useCallback(columns => {
    if (typeof columns === "function") {
      valueRef.current.columns = columns(valueRef.current.columns);
    } else {
      valueRef.current.columns = columns;
    }
    update();
  }, []);

  const setLayout = React.useCallback(layout => {
    if (typeof layout === "function") {
      valueRef.current.layout = layout(valueRef.current.layout);
    } else {
      valueRef.current.layout = layout;
    }
    update();
  }, []);

  const setValue = React.useCallback(value => {
    if (!value) return;
    if (EditorUtil.checkValue(value)) {
      valueRef.current = EditorUtil.initValue(value);
      update();
    } else {
      console.warn("[form-editor] schema incorrect format.");
    }
  }, []);

  const clear = React.useCallback(() => {
    valueRef.current = { columns: [], layout: {} };
    update();
  }, []);

  React.useEffect(() => {
    setValue(schema);
  }, [schema]);

  return {
    value: valueRef.current,
    setColumns,
    setLayout,
    setValue,
    clear,
  };
}

export default useSchema;
