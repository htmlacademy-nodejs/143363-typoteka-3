'use strict';

const {Cli} = require(`./cli`);
const {USER_ARGV_INDEX, DEFAULT_USER_COMAND, ExitCodes} = require(`../constants`);

const userCommands = process.argv.slice(USER_ARGV_INDEX);
const [command, ...rest] = userCommands;

if (userCommands.length === 0 || !Cli[command]) {
  Cli[DEFAULT_USER_COMAND].run();
  process.exit(ExitCodes.ERROR);
} else {
  Cli[command].run(rest);
}
