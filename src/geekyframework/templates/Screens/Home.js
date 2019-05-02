import React from "react";
import { inject } from "mobx-react";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Home Screen</h1>
        <p>
          I wanted to demo how you can inject <code>app</code> in the{" "}
          <code>props</code> and use it with{" "}
          <code>this.props.app.shared.user.name</code> which results in{" "}
          <strong>{this.props.app.shared.user.name}</strong>
        </p>
      </div>
    );
  }
}

export default inject("app")(Home);
