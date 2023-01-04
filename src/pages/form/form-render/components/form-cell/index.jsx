import React from "react";
import clsx from "clsx";
import Icon from "@/common/components/icon";
import "./index.css";

function FormCell({ chosen, className, children, onLock, onMoveup, onMovedown, onInline, onResize, onRemove, ...restProps }) {
  const cellRef = React.useRef(null);
  const startRef = React.useRef(0);

  const [fullSize, setFullSize] = React.useState(0);
  const [hold, setHold] = React.useState(false);
  const [offset, setOffset] = React.useState(0);

  const onMouseDown = React.useCallback(e => {
    startRef.current = e.clientX;
    setHold(true);
  }, []);

  const onMouseMove = React.useCallback(
    e => {
      if (hold) {
        const offset = e.clientX - startRef.current;
        setOffset(offset);
      }
    },
    [hold]
  );

  const onMouseUp = React.useCallback(() => {
    if (hold) {
      setHold(false);
      setOffset(0);
      const changeSize = Math.ceil((offset / fullSize) * 100) / 100;
      onResize && onResize(changeSize);
    }
  }, [hold, offset, fullSize]);

  React.useEffect(() => {
    if (fullSize > 0) {
      document.body.addEventListener("mousemove", onMouseMove, false);
      document.body.addEventListener("mouseup", onMouseUp, false);
    } else {
      const parentElement = cellRef.current.parentElement;
      if (parentElement) setFullSize(parentElement.offsetWidth);
    }
    return () => {
      document.body.removeEventListener("mousemove", onMouseMove, false);
      document.body.removeEventListener("mouseup", onMouseUp, false);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div ref={cellRef} className={clsx("form-cell", chosen && "form-cell-chosen", className)} {...restProps}>
      <span className="form-cell-button form-cell-handle" title="拖拽交换位置">
        <Icon type="icon-move" />
      </span>
      <span
        className={clsx("form-cell-resize", hold && "form-cell-resize-hold")}
        title="拖拽修改尺寸"
        style={{ transform: `translateX(${offset}px)` }}
        onMouseDown={onMouseDown}
      ></span>
      <div className="form-cell-actions">
        <span className="form-cell-button" title="锁定" onClick={onLock}>
          <Icon type="icon-password" />
        </span>
        <span className="form-cell-button" title="上移" onClick={onMoveup}>
          <Icon type="icon-rising" />
        </span>
        <span className="form-cell-button" title="下移" onClick={onMovedown}>
          <Icon type="icon-falling" />
        </span>
        <span className="form-cell-button" title="行内" onClick={onInline}>
          <Icon type="icon-return" />
        </span>
        <span className="form-cell-button" title="替换">
          <Icon type="icon-CurrencyConverter" />
        </span>
        <span className="form-cell-button form-cell-button-danger" title="删除" onClick={onRemove}>
          <Icon type="icon-ashbin" />
        </span>
      </div>
      {children}
    </div>
  );
}

FormCell.HANDLE_CLASSNAME = ".form-cell-handle";

export default FormCell;
