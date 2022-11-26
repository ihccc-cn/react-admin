import React from "react";
import { BrowserRouter, HashRouter, Routes, Route, Outlet } from "react-router-dom";

const RouterContext = React.createContext({});

function renderSuspense(loading, children) {
  return <React.Suspense fallback={React.createElement(loading)}>{children}</React.Suspense>;
}

function renderRoutes(routes, components, context, loading, parentPath = "/") {
  return routes.map(route => {
    let currentPath = parentPath === "/" ? route.path : parentPath + route.path;
    currentPath = currentPath || "*";
    let element = components[route.component];
    if (!element) return null;
    return !route.children ? (
      <Route path={currentPath} element={renderSuspense(loading, React.createElement(element))} key={currentPath} />
    ) : (
      <Route
        path={currentPath}
        element={renderSuspense(
          loading,
          React.createElement(element, Object.assign({}, context, { routes: route.children.filter(item => !!item.path) }), <Outlet />)
        )}
        key={currentPath}
      >
        {renderRoutes(route.children, components, context, loading, currentPath)}
      </Route>
    );
  });
}

function RoutesRender({ app, type, wrapper, routes, components, loading, context }) {
  const update = React.useState({})[1];

  let Router = type === "hash" ? HashRouter : BrowserRouter;

  React.useEffect(() => {
    app.update = () => update({});
  }, []);

  const children = (
    <RouterContext.Provider value={context}>
      <Router>
        <Routes>{renderRoutes(routes, components, context, loading)}</Routes>
      </Router>
    </RouterContext.Provider>
  );

  return !wrapper ? children : wrapper(children);
}

function plugin(app) {
  const name = "react-router";

  function run(params, wrapper) {
    const { type, routes, components, loading, context } = app.config.router;

    const { parseAccessRoutes } = app.plugins.get("access") || {};

    app.plugins.apply(
      "react-render",
      <RoutesRender
        app={app}
        wrapper={wrapper}
        type={type}
        routes={parseAccessRoutes ? parseAccessRoutes(routes) : routes}
        components={components}
        loading={loading}
        context={Object.assign({}, context, params)}
      />
    );
  }

  return { name, context: RouterContext, run };
}

export default plugin;
