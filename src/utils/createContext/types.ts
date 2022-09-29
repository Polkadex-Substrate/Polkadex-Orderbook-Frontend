import { Context, Provider } from "react";

export type CreateContextOptions = {
  errorMessage?: string;
  contextName?: string;
};

export type CreateContextReturn<T> = [Provider<T>, () => T, Context<T>];
