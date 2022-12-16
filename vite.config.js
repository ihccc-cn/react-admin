import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import react from "@vitejs/plugin-react";

// [配置文档 vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md)
const mockConfig = { supportTs: false };

// [配置文档 vite](https://cn.vitejs.dev/config)
export default defineConfig({
  plugins: [react(), viteMockServe(mockConfig)],
  resolve: {
    alias: {
      "@": "/src/",
    },
  },
  server: {
    proxy: {
      // string shorthand
      // "/api-mock": "http://localhost:7000",
      // with options
      // "/api": {
      //   target: "http://jsonplaceholder.typicode.com",
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/api/, ""),
      // },
    },
  },
});
