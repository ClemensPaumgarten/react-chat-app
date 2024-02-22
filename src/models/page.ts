import { FunctionComponent } from "react";
import { RouteProps } from "react-router-dom";

export type Page<T = unknown> = FunctionComponent<T> & {
  path: RouteProps["path"];
  action?: RouteProps["action"];
  loader?: RouteProps["loader"];
};
