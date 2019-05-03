import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "mobx-react";
import Screens from "../Screens";

import { ServiceProvider } from "geekyframework";
import { app } from "geekyframework";

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
