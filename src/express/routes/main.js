'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/register`, (req, res) => res.send(`/register`));
mainRouter.get(`/login`, (req, res) => res.send(`/login`));
mainRouter.get(`/categories`, (req, res) => res.send(`/categories`));
mainRouter.get(`/search`, (req, res) => res.send(`/search`));
mainRouter.get(`/add`, (req, res) => res.send(`/add`));
mainRouter.get(`/`, (req, res) => res.send(`/`));

module.exports = mainRouter;
