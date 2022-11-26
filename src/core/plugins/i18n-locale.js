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

    locale.language.forEach(lang => {
      this.set(lang);
    });
  }
  set(locale) {
    this.language.set(locale.lang, locale.language);
  }
  select(lang) {
    this.lang = lang;
    this.emit(Locale.events.CHANGE, this.lang, this);
    this.app.update();
  }
  format(key) {
    const locale = this.language.get(this.lang);
    return locale[key];
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
