import Application from "./application";
import reactRender from "./plugins/react-render";
import reactRoute from "./plugins/react-router";
import reactSlot from "./plugins/react-slot";
import request from "./plugins/request";
import access from "./plugins/access";
import i18n from "./plugins/i18n-locale";
import systemConfig from "@/common/config/system";

const app = Application.init(systemConfig);

app.use(reactRender);
app.use(reactRoute);
app.use(reactSlot);
app.use(request);
app.use(access);
app.use(i18n);

export default app;
