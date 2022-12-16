import React from "react";

const ApiConfig = new Map();

function useApi(api, config) {
  const apiConfig = React.useMemo(() => {
    const defaultConfig = {
      auto: false,
      format: response => response,
      initialData: {},
      verify: response => response.code === "0",
    };
    if (typeof config === "string") {
      return Object.assign(defaultConfig, ApiConfig.get("dessert")[config]);
    }
    if (typeof config === "object") {
      return Object.assign(defaultConfig, config);
    }
    return defaultConfig;
  }, [config]);

  console.log("apiConfig: ", apiConfig);

  const stateDependencies = React.useRef({}).current;
  const stateRef = React.useRef({
    data: apiConfig.initialData,
    loading: false,
  }).current;

  console.log("stateDependencies: ", stateDependencies);
  console.log("stateRef: ", stateRef);

  const mutate = React.useCallback(() => {}, []);

  const run = React.useCallback(() => {}, []);

  const refresh = React.useCallback(() => {}, []);

  return {
    mutate,
    get data() {
      stateDependencies.data = true;
      return stateRef.data;
    },
    get loading() {
      stateDependencies.loading = true;
      return stateRef.loading;
    },
    get run() {
      stateDependencies.run = true;
      return run;
    },
    get refresh() {
      stateDependencies.refresh = true;
      return refresh;
    },
  };
}

function setApiConfig(config) {
  console.log(ApiConfig);
  Object.entries(config).forEach(([key, value]) => {
    console.log(key);
    ApiConfig.set(key, value);
  });
}

useApi.config = setApiConfig;

export default useApi;
