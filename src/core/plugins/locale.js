import EventEmitter from "eventemitter3";

class Locale extends EventEmitter {
  static events = {
    CHANGE: "change",
  };
  constructor(app, locale) {
    super();

    this.app = app;
    this.language = new Map();
    this.lang = locale.default || null;
    this.set(locale.language);
  }
  set(locale) {
    if (Array.isArray(locale)) {
      locale.forEach(item => this.set(item));
    } else {
      this.language.set(locale.lang, locale.language);
    }
  }
  select(lang) {
    this.lang = lang;
    this.emit(Locale.events.CHANGE, this.lang, this);
  }
  format(key, defaultValue) {
    defaultValue = defaultValue || "UNKOWN";
    if (!key) return defaultValue;
    const locale = this.language.get(this.lang);
    let readLocale = locale[key];
    if (readLocale === void 0) {
      const keys = key.split(".");
      readLocale = locale;
      while (keys.length > 0) readLocale = readLocale[keys.shift()];
    }
    return readLocale || defaultValue;
  }
}

// ant 组件多语言处理
// dayjs 多语言处理
function plugin(app) {
  const name = "i18n-locale";

  const { locale } = app.config;

  // 生命周期 - 安装
  function mount() {
    app.locale = new Locale(app, locale);
  }

  // 生命周期 - 卸载
  function unmount() {
    delete app.locale;
  }

  return { name, mount, unmount };
}

export default plugin;
