import React from "react";
import { Button } from "antd";

function Count() {
  const [count, setCount] = React.useState(0);

  return (
    <Button type="primary" onClick={() => setCount(count => count + 1)}>
      count is {count}
    </Button>
  );
}

export default Count;
