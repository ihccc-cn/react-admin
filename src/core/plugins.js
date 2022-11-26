import EventEmitter from "eventemitter3";

class Plugins extends EventEmitter {
  constructor(app) {
    super();

    this.app = app;
    this.plugins = new Map();
  }
  has(name) {
    return this.plugins.has(name);
  }
  use(plugin) {
    if (plugin.name && this.has(plugin.name) === false) {
      this.plugins.set(plugin.name, plugin);
      if (plugin.mount) plugin.mount.call(this.app);
      this.emit("mount", plugin);
    }
  }
  get(name) {
    return this.plugins.get(name);
  }
  apply(name) {
    if (this.has(name)) {
      const plugin = this.get(name);
      return plugin.run.apply(plugin, Array.prototype.slice.call(arguments, 1));
    }
  }
  remove(name) {
    if (this.has(name)) {
      const plugin = this.get(name);
      this.emit("unmount", plugin);
      if (plugin.unmount) plugin.unmount.call(this.app);
      this.plugins.delete(name);
    }
  }
  clear() {
    this.removeAllListeners("mount");
    this.removeAllListeners("unmount");
    this.plugins.clear();
  }
}

export default Plugins;
