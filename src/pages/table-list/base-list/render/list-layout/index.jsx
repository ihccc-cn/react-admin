import clsx from "clsx";
import "./index.css";

const StyleType = {
  background: true,
  border: true,
  shadow: true,
};

function ListLayout({ styleType, head, neck, children }) {
  return (
    <div className={clsx("list-layout", StyleType[styleType] && styleType)}>
      {head && <div className={clsx("list-layout-head")}>{head}</div>}
      {neck && <div className={clsx("list-layout-neck")}>{neck}</div>}
      <div className={clsx("list-layout-body")}>{children}</div>
    </div>
  );
}

ListLayout.defaultProps = {
  styleType: "shadow",
};

export default ListLayout;
