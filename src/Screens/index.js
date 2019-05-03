import React from "react";
import { inject, observer } from "mobx-react";

import Model from "../geekyframework/Database/Model";
import FirebaseConnection from "../geekyframework/Database/Connection/FirebaseConnection";
import HomeScreen from "./Home";
import PostScreen from "./Post";
import Auth from "../geekyframework/Auth";
class User extends Model {
  static fillable = ["name", "id"];
  static entity = "user";
}
class Router extends React.Component {
  state = {
    currentScreen: "post"
  };
  user;
  users;
  constructor() {
    super();

    // this.user = new User();

    // let firebaseConnection = new FirebaseConnection({
    //   apiKey: "AIzaSyCnRxZIHrZQ9JyXxkp8bR9oPWsI84kNnVg",
    //   authDomain: "geekyframework.firebaseapp.com",
    //   databaseURL: "https://geekyframework.firebaseio.com",
    //   projectId: "geekyframework",
    //   storageBucket: "geekyframework.appspot.com",
    //   messagingSenderId: "1028118111860"
    // });

    // console.log(firebaseConnection, User.entity, "hello here");
    // User.test();
    // User.setConnection(firebaseConnection);
    // this.user.name = "Suraj";
    // this.user.id = 5;

    // console.log(this.user.name, this.user.id, "user $$$");
    // this.user.save();
    //
    this.findUser();
  }

  findUser() {
    // setTimeout(() => {
    // this.setState({});
    // this.user = users[0];
    // console.log(users, "user here");
    // setTimeout(() => {
    //   console.log(this.users, "user here");
    // }, 1000);
    // this.user.name = "something";
    // }, 2000);
  }
  componentWillMount() {
    this.users = User.findById(5);
    this.user = new User();
  }

  insertUser = () => {
    this.user.name = "Suraj";
    this.user.id = 5;
    console.log("save here");
    this.user.save();
  };
  render() {
    console.log(this.users, "hello");
    // this.users = User.findById(5);

    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <a class="navbar-brand" href="#">
              Geekyframework{" "}
            </a>{" "}
            <button class="navbar-toggler" type="button">
              <span class="navbar-toggler-icon" />
            </button>{" "}
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
                    Home <span class="sr-only"> (current) </span>{" "}
                  </a>{" "}
                </li>{" "}
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={() => this.setState({ currentScreen: "post" })}
                  >
                    Post{" "}
                  </a>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
          </div>{" "}
        </nav>{" "}
        <div style={{ height: "20px" }} />{" "}
        <div>
          {this.users ? this.users.loading + "__loading" : "maarsse jaane"}{" "}
        </div>
        <div>
          {this.user && this.user.saving
            ? "saving"
            : "user saved _ " + this.user.name}
        </div>
        <button onClick={this.insertUser}>insert user</button>
        {this.state.currentScreen == "home" ? <HomeScreen /> : null}{" "}
        {this.state.currentScreen == "post" ? <PostScreen /> : null}{" "}
      </>
    );
  }
}

export default inject("app")(observer(Router));
