import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "mobx-react";
import Screens from "../Screens";

import ServiceProvider from "geekyframework/Support/ServiceProvider";
import { app } from "geekyframework/helpers";

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
