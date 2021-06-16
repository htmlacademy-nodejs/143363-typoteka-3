'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/comments`, (req, res) => res.render(`comments`, {noBg: true}));
myRouter.get(`/`, (req, res) => res.render(`my`, {admin: true, noBg: true}));

module.exports = myRouter;
