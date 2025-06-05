import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/app.tsx"),
  route("redux", "routes/redux.tsx"),
  route("zustand", "routes/zustand.tsx"),
  route("jotai", "routes/jotai.tsx"),
] satisfies RouteConfig;
