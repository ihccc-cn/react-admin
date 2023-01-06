import React from "react";
import clsx from "clsx";
import Icon from "@/common/components/icon";
import { addPercent } from "../../../utils";
import "./index.css";

function CellEditor({
  name,
  lock,
  inline,
  chosen,
  className,
  children,
  onLock,
  onMoveup,
  onMovedown,
  onInline,
  onResize,
  onCopy,
  onRemove,
  style,
  ...restProps
}) {
  const cellRef = React.useRef(null);
  const startRef = React.useRef(0);

  const [fullSize, setFullSize] = React.useState(0);
  const [hold, setHold] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [changeSize, setChangeSize] = React.useState(0);

  const countFullSize = React.useCallback(() => {
    const parentElement = cellRef.current.parentElement;
    if (parentElement) setFullSize(parentElement.offsetWidth);
  }, []);

  const onMouseDown = React.useCallback(e => {
    startRef.current = e.clientX;
    setHold(true);
    countFullSize();
  }, []);

  const onMouseMove = React.useCallback(
    e => {
      if (hold) {
        const offset = e.clientX - startRef.current;
        setOffset(offset);
        setChangeSize(Math.ceil((offset / fullSize) * 100));
      }
    },
    [hold]
  );

  const onMouseUp = () => {
    if (hold) {
      onResize && onResize(changeSize);
      setHold(false);
      setOffset(0);
      setChangeSize(0);
    }
  };

  React.useEffect(() => {
    if (fullSize > 0) {
      document.body.addEventListener("mousemove", onMouseMove, false);
      document.body.addEventListener("mouseup", onMouseUp, false);
    }
    return () => {
      document.body.removeEventListener("mousemove", onMouseMove, false);
      document.body.removeEventListener("mouseup", onMouseUp, false);
    };
  }, [fullSize, onMouseMove, onMouseUp]);

  return (
    <div ref={cellRef} className={clsx("form-cell", lock && "form-cell-filter", chosen && "form-cell-chosen", className)} style={style} {...restProps}>
      {children}
      <span className="form-cell-mask">
        <Icon type="icon-password-fill" onClick={onLock} />
      </span>
      <span className="form-cell-button form-cell-handle" title="拖拽交换位置">
        <Icon type="icon-move" />
      </span>
      <div className="form-cell-actions">
        {name && <span className="form-cell-name">{name}</span>}
        <span className="form-cell-button" title="锁定" onClick={onLock}>
          <Icon type="icon-unlock" />
        </span>
        <span className="form-cell-button" title="上移" onClick={onMoveup}>
          <Icon type="icon-rising" />
        </span>
        <span className="form-cell-button" title="下移" onClick={onMovedown}>
          <Icon type="icon-falling" />
        </span>
        <span className="form-cell-button" title={inline ? "行内" : "块级"} onClick={onInline}>
          {inline ? (
            <Icon type="icon-viewgallery" style={{ transform: "scale(1.5) rotateZ(-90deg)" }} />
          ) : (
            <Icon type="icon-column" style={{ transform: "scale(1.5) rotateZ(90deg)" }} />
          )}
        </span>
        <span className="form-cell-button" title="复制" onClick={onCopy}>
          <Icon type="icon-copy" />
        </span>
        <span className="form-cell-button" title="替换">
          <Icon type="icon-component" />
        </span>
        <span className="form-cell-button form-cell-button-danger" title="删除" onClick={onRemove}>
          <Icon type="icon-ashbin" />
        </span>
      </div>
      <span
        className={clsx("form-cell-resize", hold && "form-cell-resize-hold")}
        title="拖拽修改尺寸"
        style={{ transform: `translateX(${offset}px)` }}
        onMouseDown={onMouseDown}
      >
        <span className="form-cell-resize-value">{addPercent(style?.width || 100, changeSize)}</span>
      </span>
    </div>
  );
}

CellEditor.HANDLE_CLASSNAME = ".form-cell-handle";
CellEditor.FILTER_CLASSNAME = ".form-cell-filter";

export default CellEditor;
