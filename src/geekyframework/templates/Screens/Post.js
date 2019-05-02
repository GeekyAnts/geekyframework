import React from "react";
import { inject } from "mobx-react";

//import PostModel from "../Models/remote/Post";

class Post extends React.Component {
  constructor() {
    super();
    //this.result = PostModel.find();
  }

  render() {
    return (
      <div className="container">
        <h1>Post Screen</h1>
        <p>
          Demo to show how to fetch a <code>Post</code> from a remote server in
          the front-end
        </p>
      </div>
    );
  }
}

export default inject("app")(Post);
