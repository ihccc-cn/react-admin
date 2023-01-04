import React from "react";
import { useUpdate } from "ahooks";

const ApiConfig = new Map([
  // ["onData", (data) => {}],
  [
    "dessert",
    {
      query: {
        auto: true,
        initialData: {},
        page: { pageNumber: 1, pageSize: 10 },
        verify: res => res.code === "0",
        message: (pass, response) => !pass && (response.message || "失败！"),
        format: response => response.data || {},
      },
    },
  ],
]);

const defaultConfig = {
  auto: false,
  format: response => response,
  initialData: {},
  verify: response => response.code === "0",
};

function useApi(api, config) {
  const apiConfig = React.useMemo(() => {
    if (typeof config === "string" || typeof config === "undefined") {
      const dessert = config || api.name;
      return Object.assign(defaultConfig, ApiConfig.get("dessert")[dessert]);
    }
    if (typeof config === "object") {
      return Object.assign(defaultConfig, config);
    }
    return defaultConfig;
  }, [config]);

  console.log("apiConfig: ", apiConfig);

  const update = useUpdate();
  const stateDependencies = React.useRef({
    data: false,
    loading: false,
  }).current;
  const stateRef = React.useRef({
    params: apiConfig.params,
    data: apiConfig.initialData,
    loading: false,
  }).current;

  // console.log("stateDependencies: ", stateDependencies.loading, stateDependencies.data);
  // console.log("stateRef: ", stateRef);

  // const mutate = React.useCallback(data => {
  //   stateRef.data = data;
  //   update();
  // }, []);

  const request = React.useCallback(async () => {
    if (stateRef.loading) return;
    const onMessage = ApiConfig.get("onMessage");
    try {
      const { verify, format, message } = apiConfig;
      stateRef.loading = true;
      if (stateDependencies.loading) update();
      const payload = Object.assign({}, stateRef.params);
      const response = await api(payload);
      stateRef.loading = false;
      const pass = !verify ? false : verify(response);
      if (pass) {
        const result = !format ? response : format(response);
        stateRef.data = result;
      }
      const tipInfo = !message ? false : message(pass, response, payload);
      if (tipInfo) {
        onMessage && onMessage(pass ? 0 : 1, tipInfo);
      }
      update();
    } catch (error) {
      onMessage && onMessage(2, error);
    }
  }, []);

  const run = React.useCallback(async () => {
    return await request();
  }, [request]);

  // const refresh = React.useCallback(async () => {
  //   return await request();
  // }, [request]);

  React.useEffect(() => {
    if (apiConfig.auto) run();
  }, []);

  return {
    // mutate,
    run,
    // refresh,
    get data() {
      stateDependencies.data = true;
      return stateRef.data;
    },
    get loading() {
      stateDependencies.loading = true;
      return stateRef.loading;
    },
  };
}

function setApiConfig(config) {
  Object.entries(config).forEach(([key, value]) => {
    const conf = ApiConfig.get(key);
    ApiConfig.set(key, typeof conf === "object" ? Object.assign(conf, value) : value);
  });
  console.log(ApiConfig);
}

useApi.config = setApiConfig;

export default useApi;
