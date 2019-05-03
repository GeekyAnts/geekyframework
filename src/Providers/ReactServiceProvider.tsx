import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "mobx-react";
// @ts-ignore
import Screens from "../Screens";
// real-import:import { ServiceProvider } from "geekyframework";
import ServiceProvider from "../geekyframework/Support/ServiceProvider";
// real-import:import { app } from "geekyframework";
import { app } from "../geekyframework/helpers";

export default class ReactServiceProvider extends ServiceProvider {
  /**
   * Register any application services.
   *
   * @return void
   */
  public register() { }

  /**
   * Bootstrap any application services.
   *
   * @return void
   */
  public boot() {
    ReactDOM.render(
      <Provider app={app()}>
        <Screens />
      </Provider>,
      document.getElementById("root")
    );
  }
}
