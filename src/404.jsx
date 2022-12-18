import app from "@/core";

function Page() {
  return (
    <div>
      <h1>404</h1>
      <p>{app.locale.format("404")}</p>
    </div>
  );
}

export default <Page />;
