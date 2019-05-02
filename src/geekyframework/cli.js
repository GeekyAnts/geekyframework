const vorpal = require("vorpal");
const fs = require("fs");
require("babel-register");

const app = vorpal();

require(`./commands`)(app);
// if (fs.existsSync(`${process.cwd()}/src/cli.js`)) {
//   require(`${process.cwd()}/src/cli`).default(app);
// }

module.exports = {
  run: () => {
    if (process.argv.length > 2) {
      // one and done
      app.parse(process.argv);
    } else {
      // interactive shell
      app.log(`Welcome to the Geekyframework command line.`);
      app.log('Type "exit" to quit, "help" for a list of commands.');

      app.delimiter("geek$").show();
    }
  },

  init: root => {
    app.parse([process.argv[0], process.argv[1], "init"]);
  }
};
