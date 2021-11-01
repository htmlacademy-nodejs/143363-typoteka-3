'use strict';

const express = require(`express`);
const {DEFAULT_PORT, API_PREFIX, HttpCode} = require(`../../constants`);
const getAPIRouter = require(`../api`);
const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);


module.exports = {
  name: `--server`,
  run: async (args) => {
    const logger = getLogger({name: `api`});
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const app = express();
    app.use((req, res, next) => {
      logger.debug(`Request route ${req.url}`);
      res.on(`finish`, () => logger.info(`Response statusCode ${res.statusCode}`));
      next();
    });
    app.use(express.json());
    const apiRouter = await getAPIRouter();
    app.use(API_PREFIX, apiRouter);

    // логируем запрос на несуществующий маршрут
    app.use((req, res) => {
      logger.error(`Route ${req.url} not-found`);
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occured: ${err.message}`);
    });

    app.listen(port, () =>
      logger.info(`Server listening on port ${port}: http://localhost:${port}`)
    ).on(`error`, (err) => {
      logger.error(`An error occured: ${err}`);
    });
  }
};
