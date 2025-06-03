import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/app.tsx"),
  route("redux", "routes/redux.tsx"),
] satisfies RouteConfig;
