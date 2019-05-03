// real-import:import { env } from "geekyframework";
import { env } from "../geekyframework/helpers";

export default {
  default: env("DB_CONNECTION", "firebase"),
  connections: {
    firebase: {
      apiKey: env("apiKey", "AIzaSyCnRxZIHrZQ9JyXxkp8bR9oPWsI84kNnVg"),
      authDomain: env("authDomain", "geekyframework.firebaseapp.com"),
      databaseURL: env("databaseURL", "https://geekyframework.firebaseio.com"),
      projectId: env("projectId", "geekyframework"),
      storageBucket: env("storageBucket", "geekyframework.appspot.com"),
      messagingSenderId: env("messagingSenderId", "1028118111860")
    }
  }
};
