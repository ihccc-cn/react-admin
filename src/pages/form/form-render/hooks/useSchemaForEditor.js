import useSchema from "./useSchema";

/**
 * useSchemaForEditor 会比 useSchema 多一些 Editor 的操作方法，目前暂时全部写在 useSchema 内
 * @param {*} schema
 * @returns
 */
function useSchemaForEditor(schema) {
  const schemaResult = useSchema(schema);
  return schemaResult;
}

export default useSchemaForEditor;
