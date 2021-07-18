'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const {ensureArray} = require(`../../utils`);

const path = require(`path`);

const {UPLOAD_DIR} = require(`../../constants`);

const uploadDirAbsolute = path.resolve(__dirname, `../${UPLOAD_DIR}/img/`);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

const articlesRouter = new Router();
const api = getAPI();

articlesRouter.get(`/edit/:id`, async (req, res) =>{
  try {
    const {id} = req.params;
    const [article, categories] = await Promise.all([api.getArticle(id), api.getCategories()]);

    return res.render(`new-post`, {article, categories});
  } catch (e) {
    return res.send(e);
  }
});

articlesRouter.get(`/add`, async (req, res) => {
  try {
    const categories = await api.getCategories();
    return res.render(`new-post`, {categories});
  } catch (e) {
    return res.send(e);
  }
});

articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;

  const newArticle = {
    picture: file ? file.filename : ``,
    title: body.title,
    announce: body.announcement,
    fullText: body[`full-text`],
    createdDate: new Date(body.date).toLocaleString(`ru`),
    category: ensureArray(body.category),
  };

  try {
    await api.createArticle(newArticle);
    return res.redirect(`/my`);
  } catch (e) {
    const categories = await api.getCategories();
    return res.render(`new-post`, {categories, article: newArticle});
  }

});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

articlesRouter.get(`/:id`, async (req, res) => {
  try {
    const {id} = req.params;
    const article = await api.getArticle(id);
    return res.render(`post`, {article});
  } catch (e) {
    return res.send(e);
  }
});

module.exports = articlesRouter;
