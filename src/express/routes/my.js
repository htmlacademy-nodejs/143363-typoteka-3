'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/comments`, (req, res) => res.render(`comments`));
myRouter.get(`/`, (req, res) => res.render(`my`, {admin: true}));

module.exports = myRouter;
