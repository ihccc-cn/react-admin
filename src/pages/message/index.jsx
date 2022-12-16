import React from "react";
import { query } from "./services";

function Page() {
  const [data, setData] = React.useState(null);

  async function fetch() {
    const result = await query({ name: "124" });
    setData(result);
  }

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}

export default Page;
