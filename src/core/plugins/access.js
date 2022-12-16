class Access {
  static defaultJudgment = {
    in: function (data, value) {
      if (Array.isArray(data)) return data.includes(data);
      return value in data;
    },
    "in-item": function (data, value, seedKey) {
      for (const key in data) {
        if (data[key][seedKey] === value) return true;
      }
      return false;
    },
  };
  constructor(access) {
    this.data = {};
    this.authority = access.authority || [];
    this.access = {};
    this.judgment = Object.assign(Access.defaultJudgment, access.judgment);

    access.authority.forEach(item => (this.access[item.key] = false));
  }
  // 保存判断依据的数据，如：用户信息，角色信息等
  setSeed(key, data) {
    this.data[key] = data;
    this.changeAuthority(key);
  }
  // 获取当前权限
  get(key) {
    if (!key) return this.access || false;
    return this.access[key] || false;
  }
  changeAuthority(key) {
    this.authority.forEach(judge => {
      if (judge.seed !== key) return;
      if (this.judgment[judge.type]) {
        this.access[judge.key] = this.judgment[judge.type](this.data[judge.seed], judge.value, judge.seedKey);
      }
    });
  }
}

// 组件权限校验、路由权限校验
// 获取当前权限
function plugin(app) {
  const name = "access";

  // 生命周期 - 安装
  function mount() {
    // console.log("安装了 access 插件");
    app.access = new Access(app.config.access);
  }

  // 生命周期 - 卸载
  function unmount() {
    console.log("卸载了 access 插件");
    delete app.access;
  }

  return { name, mount, unmount };
}

export default plugin;
