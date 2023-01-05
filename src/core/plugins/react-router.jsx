import React from "react";
import { BrowserRouter, HashRouter, Routes, Route, Outlet } from "react-router-dom";

const RouterContext = React.createContext({});

function renderSuspense(loading, children) {
  return <React.Suspense fallback={React.createElement(loading)}>{children}</React.Suspense>;
}

function renderRoutes(routes, context, loading, parentPath = "/") {
  // console.log(routes);
  return routes.map(route => {
    const currentPath = (parentPath === "/" ? route.path : parentPath + route.path) || "*";
    if (!route.component) return null;
    return !route.children ? (
      <Route path={currentPath} element={renderSuspense(loading, React.createElement(route.component))} key={currentPath} />
    ) : (
      <Route
        path={currentPath}
        element={renderSuspense(
          loading,
          React.createElement(route.component, Object.assign({}, context, { routes: route.children.filter(item => !!item.path) }), <Outlet />)
        )}
        key={currentPath}
      >
        {renderRoutes(route.children, context, loading, currentPath)}
      </Route>
    );
  });
}

function RoutesRender({ type, routes, loading, context }) {
  const Router = React.useMemo(() => (type === "hash" ? HashRouter : BrowserRouter), [type]);

  return (
    <RouterContext.Provider value={context}>
      <Router>
        <Routes>{renderRoutes(routes, context, loading)}</Routes>
      </Router>
    </RouterContext.Provider>
  );
}

function plugin(app) {
  const name = "react-router";

  function run(params, wrapper) {
    const { type, routes, components, loading, context } = app.config.router;

    function parseAccessRoutes(routes) {
      if (!routes) return [];
      return routes
        .map(route => {
          const routeParams = {};
          if (route.name) routeParams.name = app.locale.format("routes." + route.name, route.name);
          if (route.component) routeParams.component = components[route.component];
          if (Array.isArray(route.children)) routeParams.children = parseAccessRoutes(route.children);
          return Object.assign({}, route, routeParams);
        })
        .filter(route => {
          if (typeof route.access === "string") {
            return app.access.get(route.access);
          }
          if (Array.isArray(route.access)) {
            return route.access.some(key => app.access.get(key));
          }
          return true;
        });
    }

    const routesRender = (
      <RoutesRender
        type={type}
        routes={parseAccessRoutes ? parseAccessRoutes(routes) : routes}
        loading={loading}
        context={Object.assign({}, context, params)}
      />
    );

    app.plugins.apply("react-render", !wrapper ? routesRender : wrapper(routesRender), "root", false);
  }

  return { name, context: RouterContext, run };
}

export default plugin;
