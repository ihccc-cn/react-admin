import "./index.css";
import app from "./core";
import { ConfigProvider } from "antd";
import "./plugins";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";

dayjs.locale("zh-cn");

// mock + 代理请求 [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md)
// 处理请求的方案 request
// 处理插件的方案
// 处理菜单、页面组件权限的方案
// 处理缓存、状态管理的方案
// 处理布局的方案 类似 ant-pro
// 处理样式的方案 [tailwind](https://www.tailwindcss.cn)
// 处理打包的方案 vite
// 处理主题的方案 [tailwind]
// 基础业务逻辑

/**
 * ## 布局组件
 * [ ] 用户头像组件
 * [ ] 顶部布局组件
 * [ ] 二级布局组件
 */
app.on("mount", async function () {
  this.plugins.apply("react-router", {}, dom => (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6f6af8",
          radiusBase: 0,
        },
      }}
    >
      {dom}
    </ConfigProvider>
  ));
});

app.mount();
