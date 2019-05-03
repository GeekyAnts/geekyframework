import Application from "./Foundation/Application";
import ServiceProvider from "./Support/ServiceProvider";
import { app, config, env } from "./helpers";
import Model from "./Database/Model";
import FirebaseConnection from "./Database/Connection/FirebaseConnection";
console.log(env, "env 178523");
export {
  Application,
  env,
  ServiceProvider,
  app,
  config,
  Model,
  FirebaseConnection
};

module.exports = {
  hello: "world"
};
