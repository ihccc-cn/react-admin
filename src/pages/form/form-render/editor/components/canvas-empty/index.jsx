import Icon from "@/common/components/icon";
import "./index.css";

function CanvasEmpty({ icon, title, extra }) {
  return (
    <div className="form-editor-canvas-empty">
      <p className="form-editor-canvas-empty-title">
        <Icon type={icon} />
        <span>{title}</span>
      </p>
      {extra}
    </div>
  );
}

export default CanvasEmpty;
