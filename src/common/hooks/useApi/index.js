import React from "react";

const ApiConfig = new Map();

const defaultConfig = {
  auto: false,
  format: response => response,
  initialData: {},
  verify: response => response.code === "0",
};

function useApi(api, config) {
  const apiConfig = React.useMemo(() => {
    if (typeof config === "string") {
      return Object.assign(defaultConfig, ApiConfig.get("dessert")[config]);
    }
    if (typeof config === "object") {
      return Object.assign(defaultConfig, config);
    }
    return defaultConfig;
  }, [config]);

  // console.log("apiConfig: ", apiConfig);

  const update = React.useState({})[1];
  const stateDependencies = React.useRef({}).current;
  const stateRef = React.useRef({
    params: apiConfig.params,
    data: apiConfig.initialData,
    loading: false,
  }).current;

  console.log("stateDependencies: ", stateDependencies);
  // console.log("stateRef: ", stateRef);

  const mutate = React.useCallback(data => {
    stateRef.data = data;
    update({});
  }, []);

  const request = React.useCallback(async () => {
    if (stateRef.loading) return;
    const onMessage = ApiConfig.get("onMessage");
    try {
      const { verify, format, message } = apiConfig;
      stateRef.loading = true;
      if (stateDependencies.loading) update({});
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
      update({});
    } catch (error) {
      onMessage && onMessage(2, error);
    }
  }, []);

  const run = React.useCallback(async () => {
    return await request();
  }, [request]);

  const refresh = React.useCallback(async () => {
    return await request();
  }, [request]);

  React.useEffect(() => {
    if (apiConfig.auto) run();
  }, []);

  return {
    mutate,
    run,
    refresh,
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
    console.log(key);
    ApiConfig.set(key, value);
  });
  console.log(ApiConfig);
}

useApi.config = setApiConfig;

export default useApi;
