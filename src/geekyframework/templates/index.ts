// real-import:import { Application } from "geekyframework";
import Application from "./geekyframework/Foundation/Application";

const app = new Application();

app.get("config").set(require("./config").default());
app.boot();
