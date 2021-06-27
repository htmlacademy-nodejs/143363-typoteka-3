'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {DEFAULT_PORT, API_PREFIX} = require(`../../constants`);
const apiRouter = require(`../api`);

module.exports = {
  name: `--server`,
  run: (args) => {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());
    app.use(API_PREFIX, apiRouter);

    app.listen(port, () => console.info(chalk.green(`Server listening on port ${port}: http://localhost:${port}`)));
  }
};
