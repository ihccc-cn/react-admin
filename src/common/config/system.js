import loading from "@/loading";
import components from "./components";
import routes from "./routes.json";
import zhCN from "../locale/zh-CN.json";
import enUS from "../locale/en-US.json";

export default {
  version: "0.0.1",
  name: "Wowon Admin Pro",
  env: "dev",
  // 国际化配置
  locale: {
    language: [zhCN, enUS],
    default: "zh-CN",
    antd: true,
    dayjs: true,
  },
  // 权限配置
  access: {
    authority: [
      { key: "allow", seed: "userInfo", type: "in", value: "id" },
      { key: "admin", seed: "roles", type: "in-item", seedKey: "key", value: "admin" },
      { key: "guest", seed: "roles", type: "in-item", seedKey: "key", value: "guest" },
    ],
    judgment: {},
  },
  // 路由配置
  router: {
    type: "browser",
    routes: routes,
    components: components,
    loading: loading,
    context: {
      // title: "Wowon Admin Pro",
      // shortTitle: "Wowon",
      logo: "/logo.png",
      float: true,
    },
  },
  // 服务地址配置
  request: {
    server: {
      debug: {
        base: "http://localhost:7000",
      },
      dev: {
        base: "/base-server",
      },
      pre: {
        base: "http://localhost:5000/base-server",
      },
    },
  },
};
