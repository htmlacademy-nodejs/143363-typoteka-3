'use strict';

const express = require(`express`);
const {resolve} = require(`path`);
const {green} = require(`chalk`);
const {PUBLIC_DIR, UPLOAD_DIR} = require(`../constants`);

const articlesRouter = require(`./routes/articles`);
const myRouter = require(`./routes/my`);
const mainRouter = require(`./routes/main`);

const PORT = 8080;

const app = express();

app.use(express.static(resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(resolve(__dirname, UPLOAD_DIR)));

app.set(`views`, resolve(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);


app.listen(PORT, () => console.info(green(`Front server is running on port ${PORT}: http://localhost:${PORT}`)));
