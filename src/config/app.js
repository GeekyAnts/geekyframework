import { env } from "geekyframework";
import AppServiceProvider from "../Providers/AppServiceProviders";
import ReactServiceProvider from "../Providers/ReactServiceProvider";

export default function() {
  return {
    name: env("APP_NAME", "Geekyframework"),
    env: env("APP_ENV", "production"),
    debug: env("APP_DEBUG", false),
    timezone: "UTC",
    locale: "en",
    providers: [AppServiceProvider, ReactServiceProvider],
    aliases: {}
  };
}
