import { Application } from "./geekyframework";

const app = new Application();

app.get("config").set(require("./config").default());
app.boot();
