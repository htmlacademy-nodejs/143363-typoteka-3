'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_USER_COMAND = `--help`;
const DEFAULT_COUNT = 1;
const MAX_ANNOUNCE_LENGTH = 5;
const MAX_COUNT = 1000;
const PERIOD_MONTH = 3;
const DEFAULT_PORT = 3000;
const PUBLIC_DIR = `public`;
const MAX_ID_LENGTH = 5;
const API_PREFIX = `/api`;

const FILE_NAME = `mocks.json`;

const ExitCodes = {
  SUCCESS: 0,
  ERROR: 1,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  API_PREFIX,
  PERIOD_MONTH,
  USER_ARGV_INDEX,
  PUBLIC_DIR,
  DEFAULT_USER_COMAND,
  DEFAULT_COUNT,
  MAX_ANNOUNCE_LENGTH,
  MAX_COUNT,
  MAX_ID_LENGTH,
  FILE_NAME,
  ExitCodes,
  HttpCode,
  DEFAULT_PORT,
};
