import React from "react";
import { langs } from "@uiw/codemirror-extensions-langs";
import { CodeEditor } from "../code-editor";
import { inputValueFormat } from "@/utils";

const extensions = [langs.json()];

function StyleEditor({ value, onChange, ...props }) {
  const [style, setStyle] = React.useState();

  const handleChange = React.useCallback(
    e => {
      const value = inputValueFormat(e);
      try {
        onChange && onChange(value === "" ? void 0 : JSON.parse(value));
      } catch (error) {
        setStyle(value);
      }
    },
    [onChange]
  );

  React.useEffect(() => {
    setStyle(!value ? "" : JSON.stringify(value, null, 2));
  }, [value]);

  return (
    <CodeEditor
      height="240px"
      extensions={extensions}
      basicSetup={{ lineNumbers: false, foldGutter: false }}
      {...props}
      value={style}
      onChange={handleChange}
    />
  );
}

export default StyleEditor;
