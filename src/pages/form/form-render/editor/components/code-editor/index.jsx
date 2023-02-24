import React from "react";
import { Button, Popover } from "antd";
import CodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { inputValueFormat } from "@/utils";
import "./index.css";

export function CodeEditor(props) {
  return <CodeMirror className="code-editor-body" theme={githubLight} {...props} />;
}

function CodeEditorWithConfirm({ prefix, suffix, onConfirm, ...restProps }) {
  return (
    <div className="code-editor-wrapper">
      {prefix && <div className="code-editor-prefix">{prefix}</div>}
      <CodeMirror className="code-editor-body" maxHeight="320px" {...restProps} />
      {suffix && <div className="code-editor-suffix">{suffix}</div>}
      <div className="code-editor-footer">
        <Button type="primary" size="small" onClick={onConfirm}>
          确认
        </Button>
      </div>
    </div>
  );
}

export function CodePopover({ prefix, suffix, width, extensions, value, onChange, ...restProps }) {
  const [open, setOpen] = React.useState(false);
  const [val, setVal] = React.useState(value);

  const handleChange = e => {
    setVal(inputValueFormat(e));
  };

  const handleConfirm = () => {
    onChange && onChange(val);
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) setVal(value);
  }, [open, value]);

  return (
    <Popover
      trigger={["click"]}
      destroyTooltipOnHide
      {...restProps}
      open={open}
      onOpenChange={setOpen}
      content={
        <CodeEditorWithConfirm
          prefix={prefix}
          suffix={suffix}
          width={width}
          extensions={extensions}
          value={val}
          onChange={handleChange}
          onConfirm={handleConfirm}
        />
      }
    />
  );
}

export default CodeEditorWithConfirm;
