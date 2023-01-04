// import {  } from 'react-router-dom';
import { Popconfirm, Button } from "antd";
import Icon from "@/common/components/icon";

export function Back(props) {
  return (
    <Button
      danger
      icon={<Icon type="icon-arrow-left" />}
      // onClick={() => history.goBack()}
      {...props}
    >
      返回
    </Button>
  );
}

function stopPropagationEvent(event) {
  return function (e) {
    e.stopPropagation();
    event && event(e);
  };
}

const DisabledA = props => <a {...props} style={{ color: "#c9c9c9", cursor: "not-allowed" }} />;

export const A = ({ disabled, onClick, children, ...props }) => {
  if (disabled === true) return <DisabledA>{children}</DisabledA>;
  return (
    <a {...props} onClick={stopPropagationEvent(onClick)}>
      {children}
    </a>
  );
};

export function Confirm(props) {
  const { title, className, disabled, onConfirm, onCancel, children } = props;

  return disabled === true ? (
    <DisabledA>{children}</DisabledA>
  ) : (
    <Popconfirm title={title} onConfirm={stopPropagationEvent(onConfirm)} onCancel={stopPropagationEvent(onCancel)}>
      <A className={className}>{children}</A>
    </Popconfirm>
  );
}
