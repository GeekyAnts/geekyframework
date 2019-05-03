import React from "react";
import { inject, observer } from "mobx-react";

import Model from "../geekyframework/Database/Model";
import FirestoreConnection from "../geekyframework/Database/Connection/Firestore";
import HomeScreen from "./Home";
import PostScreen from "./Post";
import Auth from "../geekyframework/Auth";
class User extends Model {
  static fillable = ["name"];
  entity = "user";
}
class Router extends React.Component {
  state = {
    currentScreen: "post"
  };
  user;
  constructor() {
    super();

    this.user = new User();

    let firebaseConnection = new FirestoreConnection({
      apiKey: "AIzaSyCnRxZIHrZQ9JyXxkp8bR9oPWsI84kNnVg",
      authDomain: "geekyframework.firebaseapp.com",
      databaseURL: "https://geekyframework.firebaseio.com",
      projectId: "geekyframework",
      storageBucket: "geekyframework.appspot.com",
      messagingSenderId: "1028118111860"
    });

    this.user.setConnection(firebaseConnection);
    this.user.name = "Suraj";

    setTimeout(() => {
      this.user.name = "something";
      this.user.save();
    }, 2000);
  }

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
        <div> {this.user.name}</div>
        {this.state.currentScreen == "home" ? <HomeScreen /> : null}
        {this.state.currentScreen == "post" ? <PostScreen /> : null}
      </>
    );
  }
}

export default inject("app")(observer(Router));
