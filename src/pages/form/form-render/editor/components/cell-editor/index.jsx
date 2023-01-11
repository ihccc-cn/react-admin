import React from "react";
import clsx from "clsx";
import Icon from "@/common/components/icon";
import { addPercent } from "../../../utils";
import "./index.css";

function CellEditor({
  label,
  name,
  lock,
  inline,
  chosen,
  control,
  sizeFormat,
  sizeChangeLabel,
  onLock,
  onMoveup,
  onMovedown,
  onInline,
  onResize,
  onCopy,
  onRemove,
  style,
  className,
  children,
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
        setChangeSize(sizeFormat(offset, fullSize));
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

  const controlAble = control || {};

  return (
    <div ref={cellRef} className={clsx("cell-editor", lock && "cell-editor-filter", chosen && "cell-editor-chosen", className)} style={style} {...restProps}>
      {label && <div className="cell-editor-label">{label}</div>}
      {children}
      {controlAble.mask !== false && (
        <span className={"cell-editor-mask"}>
          <Icon type="icon-password-fill" onClick={onLock} />
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
          <span className="cell-editor-button" title="锁定" onClick={onLock}>
            <Icon type="icon-unlock" />
          </span>
        )}
        {/* {controlAble.move !== false && (
        <span className="cell-editor-button" title="上移" onClick={onMoveup}>
          <Icon type="icon-rising" />
        </span>
        )}
        {controlAble.move !== false && (
        <span className="cell-editor-button" title="下移" onClick={onMovedown}>
          <Icon type="icon-falling" />
        </span>
        )} */}
        {controlAble.inline !== false && (
          <span className="cell-editor-button" title={inline ? "行内" : "块级"} onClick={onInline}>
            {inline ? (
              <Icon type="icon-viewgallery" style={{ transform: "scale(1.5) rotateZ(-90deg)" }} />
            ) : (
              <Icon type="icon-column" style={{ transform: "scale(1.5) rotateZ(90deg)" }} />
            )}
          </span>
        )}
        {controlAble.copy !== false && (
          <span className="cell-editor-button" title="复制" onClick={onCopy}>
            <Icon type="icon-copy" />
          </span>
        )}
        {/* {controlAble.replace !== false && (
        <span className="cell-editor-button" title="替换">
          <Icon type="icon-component" />
        </span>
        )} */}
        {controlAble.remove !== false && (
          <span className="cell-editor-button cell-editor-button-danger" title="删除" onClick={onRemove}>
            <Icon type="icon-ashbin" />
          </span>
        )}
      </div>
      {controlAble.resize !== false && (
        <span
          className={clsx("cell-editor-resize", hold && "cell-editor-resize-hold")}
          title="拖拽修改尺寸"
          style={{ transform: `translateX(${offset}px)` }}
          onMouseDown={onMouseDown}
        >
          {sizeChangeLabel && <span className="cell-editor-resize-value">{sizeChangeLabel(changeSize, style?.width)}</span>}
        </span>
      )}
    </div>
  );
}

CellEditor.HANDLE_CLASSNAME = ".cell-editor-handle";
CellEditor.FILTER_CLASSNAME = ".cell-editor-filter";

CellEditor.defaultProps = {
  sizeFormat: (size, full) => Math.round((size / full) * 100),
  sizeChangeLabel: (size, width) => addPercent(width || 100, size),
};

export default CellEditor;
