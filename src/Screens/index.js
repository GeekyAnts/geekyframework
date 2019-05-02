import React from "react";
import { inject } from "mobx-react";

import HomeScreen from "./Home";
import PostScreen from "./Post";

class Router extends React.Component {
  state = {
    currentScreen: "post"
  };

  render() {
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <a class="navbar-brand" href="#">
              Geekyframework
            </a>
            <button class="navbar-toggler" type="button">
              <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse">
              <ul class="navbar-nav">
                <li
                  class={
                    "nav-item" +
                    (this.state.currentScreen == "home" ? " active" : "")
                  }
                >
                  <a
                    class={
                      "nav-link" +
                      (this.state.currentScreen == "home" ? " active" : "")
                    }
                    href="#"
                    onClick={() => this.setState({ currentScreen: "home" })}
                  >
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={() => this.setState({ currentScreen: "post" })}
                  >
                    Post
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div style={{ height: "20px" }} />

        {this.state.currentScreen == "home" ? <HomeScreen /> : null}
        {this.state.currentScreen == "post" ? <PostScreen /> : null}
      </>
    );
  }
}

export default inject("app")(Router);
