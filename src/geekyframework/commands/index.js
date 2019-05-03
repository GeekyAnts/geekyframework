// import yeoman from 'yeoman-environment';
// @ts-ignore
const _ = require("lodash");
const fs = require("fs-extra");
const ora = require("ora");
const path = require("path");
// const env = yeoman.createEnv();

// const reazyGenerators = '../reazy-generator/generators';

// env.register(require.resolve(`${reazyGenerators}/mobile-app`), 'reazy:mobile-app');
// env.register(require.resolve(`${reazyGenerators}/web-app`), 'reazy:web-app');
// env.register(require.resolve(`${reazyGenerators}/plugin`), 'reazy:plugin');
// env.register(require.resolve(`${reazyGenerators}/add-plugin`), 'reazy:add-plugin');
// env.register(require.resolve(`${reazyGenerators}/remove-plugin`), 'reazy:remove-plugin');

const generatorOptions = {
  disableNotifyUpdate: true
};

function requireFromString(src, filename) {
  var m = new module.constructor();
  m.paths = module.paths;
  m._compile(src, filename);
  return m.exports;
}

const processArgv = _.clone(process.argv);

module.exports = function(vorpal) {
  vorpal
    .command("init", "initialize Geekyframework in your project")
    .action(function(args, callback) {
      // console.log("awdwdwd wdadaw adwawd");
      var spinner = ora("Copying templates").start();

      const directoryPath = path.join(__dirname, "../templates");
      const destinationPath = path.join(process.cwd(), "src");
      //passsing directoryPath and callback function
      fs.readdir(directoryPath, function(err, files) {
        //handling error
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        //listing all files using forEach
        files.forEach(function(file) {
          // Do whatever you want to do with the file
          // console.log(file, "file");
          fs.copySync(
            path.join(directoryPath, file),
            path.join(destinationPath, file)
          );
        });
        spinner.succeed("Templates copied");
      });
    });

  vorpal
    .command("add <plugin>")
    .description("add a new plugin")
    .autocomplete(["native-config"])
    .action(function(args, callback) {
      env.run("reazy:add-plugin", args);
    });

  vorpal
    .command("remove <plugin>")
    .description("remove a plugin completely")
    .autocomplete(["native-config"])
    .action(function(args, callback) {
      env.run("reazy:remove-plugin", args);
    });

  // vorpal
  //   .catch('[words...]', 'Catches incorrect commands')
  //   .action(function (args, callback) {
  //     require('babel-register');
  //     const localProjectCli = require(process.cwd() + '/src/cli');
  //     localProjectCli.run(processArgv, vorpal);
  //   });
};

// export { env };
