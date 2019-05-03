import Application from "../Foundation/Application";

export function env(key: any, defaultValue: any) {
  return window["GEEKYFRAMEWORK_CONFIG"] && window["GEEKYFRAMEWORK_CONFIG"][key]
    ? window["GEEKYFRAMEWORK_CONFIG"][key]
    : defaultValue;
}

export function app() {
  if (Application.instances.length !== 0) return Application.instances[0];
  return undefined;
}

export function config(key: any, val: any) {
  var appInstance = app();
  if (!appInstance) return null;

  if (val) return appInstance.get("config").set(key, val);
  else return appInstance.get("config").get(key);

  //app().get('config')
}
