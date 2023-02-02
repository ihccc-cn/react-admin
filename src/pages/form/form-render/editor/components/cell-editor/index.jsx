import React from "react";
import clsx from "clsx";
import Icon from "@/common/components/icon";
import { addPercent, stopPropagationEvent } from "../../../utils";
import DragBar from "./drag-bar";
import "./index.css";

function CellEditor({
  label,
  name,
  ghost,
  lock,
  inline,
  selected,
  control,
  sizeFormat,
  sizeLabel,
  onLock,
  onMoveup,
  onMovedown,
  onInline,
  onResize,
  onCopy,
  onRemove,
  onSelect,
  style,
  className,
  children,
  ...restProps
}) {
  const cellRef = React.useRef(null);

  const [fullSize, setFullSize] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [selectAble, setSelectAble] = React.useState(true);

  const changeSize = React.useMemo(() => sizeFormat(offset, fullSize), [offset, fullSize]);

  const countFullSize = React.useCallback(() => {
    const parentElement = cellRef.current.parentElement;
    if (parentElement) setFullSize(parentElement.offsetWidth - 40);
    setSelectAble(false);
  }, []);

  const handleClick = React.useCallback(
    event => {
      if (lock || !selectAble) return;
      onSelect && onSelect(event);
    },
    [lock, selectAble, onSelect]
  );

  const controlAble = control || {};

  return (
    <div
      ref={cellRef}
      className={clsx(
        "cell-editor",
        {
          "cell-editor-ghost": ghost,
          "cell-editor-lock": lock,
          "cell-editor-selected": selected,
        },
        className
      )}
      style={style}
      {...restProps}
      onClick={controlAble.select !== false ? handleClick : void 0}
    >
      {label && <div className="cell-editor-label">{label}</div>}
      {children}
      {controlAble.mask !== false && (
        <span className={"cell-editor-mask"}>
          <Icon type="icon-password-fill" onClick={stopPropagationEvent(onLock)} />
        </span>
      )}
      {controlAble.move !== false && (
        <span className="cell-editor-button cell-editor-handle" title="拖拽交换位置">
          <Icon type="icon-move" />
        </span>
      )}
      <div className="cell-editor-actions">
        {controlAble.name !== false && !label && <span className="cell-editor-name">{name || "unknow"}</span>}
        {controlAble.lock !== false && (
          <span className="cell-editor-button" title="锁定" onClick={stopPropagationEvent(onLock)}>
            <Icon type="icon-unlock" />
          </span>
        )}
        {/* {controlAble.move !== false && (
        <span className="cell-editor-button" title="上移" onClick={stopPropagationEvent(onMoveup)}>
          <Icon type="icon-rising" />
        </span>
        )}
        {controlAble.move !== false && (
        <span className="cell-editor-button" title="下移" onClick={stopPropagationEvent(onMovedown)}>
          <Icon type="icon-falling" />
        </span>
        )} */}
        {controlAble.inline !== false && (
          <span className="cell-editor-button" title={inline ? "行内" : "块级"} onClick={stopPropagationEvent(onInline)}>
            {inline ? (
              <Icon type="icon-viewgallery" style={{ transform: "scale(1.5) rotateZ(-90deg)" }} />
            ) : (
              <Icon type="icon-column" style={{ transform: "scale(1.5) rotateZ(90deg)" }} />
            )}
          </span>
        )}
        {controlAble.copy !== false && (
          <span className="cell-editor-button" title="复制" onClick={stopPropagationEvent(onCopy)}>
            <Icon type="icon-copy" />
          </span>
        )}
        {/* {controlAble.replace !== false && (
        <span className="cell-editor-button" title="替换">
          <Icon type="icon-component" />
        </span>
        )} */}
        {controlAble.remove !== false && (
          <span className="cell-editor-button cell-editor-button-danger" title="删除" onClick={stopPropagationEvent(onRemove)}>
            <Icon type="icon-ashbin" />
          </span>
        )}
      </div>
      {controlAble.resize !== false && (
        <DragBar
          className="cell-editor-resize"
          title="拖拽修改尺寸"
          offset={offset}
          showLabel={() => sizeLabel(changeSize, style?.width || 100)}
          onStart={countFullSize}
          onChange={setOffset}
          onEnd={() => {
            onResize && onResize(changeSize);
            setTimeout(() => setSelectAble(true), 0);
          }}
        />
      )}
    </div>
  );
}

CellEditor.HANDLE_CLASSNAME = ".cell-editor-handle";
CellEditor.FILTER_CLASSNAME = ".cell-editor-lock";

CellEditor.defaultProps = {
  sizeFormat: (value, full) => Math.round((value / full) * 100),
  sizeLabel: (value, width) => addPercent(width || 100, value),
};

export default CellEditor;
