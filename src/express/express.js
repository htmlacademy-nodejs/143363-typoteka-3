'use strict';

const express = require(`express`);
const {green} = require(`chalk`);

const articlesRouter = require(`./routes/articles`);
const myRouter = require(`./routes/my`);
const mainRouter = require(`./routes/main`);

const PORT = 8080;

const app = express();

app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);


app.listen(PORT, () => console.info(green(`Front server is running on port ${PORT}: http://localhost:${PORT}`)));
