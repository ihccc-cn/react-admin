import EventEmitter from "eventemitter3";
import Plugins from "./plugins";

import access from "./plugins/access";
import locale from "./plugins/locale";
import reactRender from "./plugins/react-render";
import reactRoute from "./plugins/react-router";
import reactSlot from "./plugins/react-slot";
import request from "./plugins/request";

/**
 * 1、可以动态加载插件、只有在启用的地方才会引用相应的模块
 * 2、不可以动态卸载插件
 * 3、可以动态启用与禁用插件
 * 4、插件ui显示
 * 5、插件间通信
 *
 * 应用举例：
 * 1、根据异步配置信息，动态启用禁用插件
 * 2、根据设置状态，动态启用禁用插件
 */

class Application extends EventEmitter {
  static init(config) {
    return new Application(config);
  }
  constructor(config) {
    super();

    this.version = config.version || "0.0.0";
    this.name = config.name || "系统暂未命名";
    this.config = config;
    this.active = false;
    this.unLoadPlugins = [];

    this.plugins = new Plugins(this);

    this.use(access);
    this.use(locale);
    this.use(reactRender);
    this.use(reactRoute);
    this.use(reactSlot);
    this.use(request);
  }
  // --------------------- app plugins -----------------
  use(plugin, config) {
    if (this.active) {
      let _plugin = plugin;
      if (typeof plugin === "function") _plugin = plugin.call(this, this, config);
      this.plugins.use(_plugin);
    } else {
      this.unLoadPlugins.unshift([plugin, config]);
    }
  }
  // --------------------- app plugins -----------------
  // --------------------- app lifeCycle -----------------
  mount() {
    this.active = true;
    while (this.unLoadPlugins.length > 0) {
      this.use.apply(this, this.unLoadPlugins.pop());
    }
    this.printVersion();
    this.emit("mount");
  }
  unmount() {
    this.active = false;
    this.emit("unmount");
    this.removeAllListeners();
    this.plugins.clear();
  }
  // --------------------- app lifeCycle -----------------
  printVersion() {
    console.log(
      "%c✨ 欢迎使用 " + this.name + " %c" + this.version,
      ["color: #6f6af8"].join(";"),
      ["padding: 0 6px", "background: #6f6af8", "border-radius: 2px", "color: #e5e5e5"].join(";")
    );

    // console.log("APP: ", this);
    window.wowon = () => {
      return (window._app = this);
    };
  }
}

export default Application;
