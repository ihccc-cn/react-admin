import app from "@/core";

const { locale } = app;

function Page() {
  return (
    <div>
      <h1>404</h1>
      <p>{locale.format("404")}</p>
    </div>
  );
}

export default <Page />;
