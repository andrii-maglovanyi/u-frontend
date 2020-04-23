import yargs = require("yargs");

import { name, description } from "../../package.json";

import { DEFAULT_PATH } from "../constants";

import builder from "../builder";

export default yargs
  .option("s", {
    alias: "source",
    demandOption: false,
    default: DEFAULT_PATH,
    describe: "lookup source",
    type: "string",
  })
  .option("t", {
    alias: "type",
    demandOption: true,
    describe: "microfrontend vendor",
    type: "string",
  })
  .command(
    "build",
    "Generate microfrontend manifest file",
    () => {},
    ({ source, type }: { source: string; type: string }) => {
      builder(type, { source });
    }
  )
  .fail(function (msg, err, yargs) {
    if (err) throw err; // preserve stack
    console.error("You broke it!");
    console.error(msg);
    console.error("You should be doing", yargs.help());
    process.exit(1);
  })

  // version
  .alias("v", "version")
  .version()
  .describe("v", "show version information")

  // help
  .alias("h", "help")
  .help()

  .epilogue(`${name}\n${description}`).argv;
