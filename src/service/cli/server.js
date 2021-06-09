'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, HttpCode, FILE_NAME} = require(`../../constants`);

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
    <html lang="ru">
      <head>
        <title>Typoteka</title
      </head>
      <body>
        ${message}
      </body>
    </html>`.trim();

  res.writeHead(statusCode, {'Content-Type': `text/html; charset=UTF-8`});
  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = `<ul>${mocks.map(({title}) => (`<li>${title}</li>`)).join(``)}</ul`;
        sendResponse(res, HttpCode.OK, message);
      } catch (e) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundText);
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundText);
      break;
  }
};

module.exports = {
  name: `--server`,
  run: (args) => {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, () => console.info(chalk.green(`Server listening on port: ${port}`)))
      .on(`error`, (err) => {
        console.error(chalk.red(`Creation server error: ${err}`));
      });
  }
};
