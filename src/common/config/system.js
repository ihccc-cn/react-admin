import components from "./components";
import routes from "./routes.json";
import loading from "@/loading";
import zhCN from "../locale/zh-CN.json";
import enUS from "../locale/en-US.json";

export default {
  version: "0.0.1",
  name: "Wowon Admin Pro",
  logo: "http://localhost:7000/logo.png",
  env: "dev",
  // 多语言配置
  locale: {
    language: [zhCN, enUS],
    default: "zh-CN",
    antd: true,
    dayjs: true,
  },
  // 服务地址配置
  request: {
    server: {
      dev: {
        defaultServer: "/base-server",
      },
      pre: {
        defaultServer: "http://localhost:5000/base-server",
      },
    },
  },
  // 权限配置
  access: {
    admin: ({}) => false,
    common: ({}) => true,
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
      float: false,
    },
  },
};
