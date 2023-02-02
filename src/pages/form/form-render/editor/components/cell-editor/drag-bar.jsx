import React from "react";
import clsx from "clsx";
import { stopPropagationEvent } from "../../../utils";
import "./drag-bar.css";

function DragBar({ className, offset, showLabel, onStart, onChange, onEnd, style, ...restProps }) {
  const startRef = React.useRef(0);
  const [hold, setHold] = React.useState(false);

  const onMouseDown = React.useCallback(e => {
    startRef.current = e.clientX;
    setHold(true);
    onStart();
  }, []);

  const onMouseMove = React.useCallback(
    e => {
      if (hold) {
        const offset = e.clientX - startRef.current;
        onChange && onChange(offset);
      }
    },
    [hold]
  );

  const onMouseUp = () => {
    if (hold) {
      onEnd && onEnd(offset);
      setHold(false);
      onChange && onChange(0);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div
      className={clsx("drag-bar", hold && "drag-bar-hold", className)}
      style={{ transform: `translateX(${offset}px)`, ...style }}
      onMouseDown={stopPropagationEvent(onMouseDown)}
      {...restProps}
    >
      {showLabel && <span className="drag-bar-label">{showLabel(offset)}</span>}
    </div>
  );
}

DragBar.defaultProps = {
  showLabel: value => value,
};

export default DragBar;
