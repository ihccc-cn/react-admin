import app from "@/core";

// export const pluginCount = async () => (await import("@/common/plugins/plugin-count")).default;

app.on("mount", async () => {
  const config = { useCount: true };
  if (config.useCount) {
    // app.use(await pluginCount());
    // app.plugins.remove("count");
  }
});
