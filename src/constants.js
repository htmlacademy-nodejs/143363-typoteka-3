'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_USER_COMAND = `--help`;
const DEFAULT_COUNT = 1;
const MAX_ANNOUNCE_LENGTH = 5;
const MAX_COUNT = 1000;
const PERIOD_MONTH = 3;

const FILE_NAME = `mocks.json`;

const ExitCodes = {
  SUCCESS: 0,
  ERROR: 1,
};

module.exports = {
  PERIOD_MONTH,
  USER_ARGV_INDEX,
  DEFAULT_USER_COMAND,
  DEFAULT_COUNT,
  MAX_ANNOUNCE_LENGTH,
  MAX_COUNT,
  FILE_NAME,
  ExitCodes,
};
