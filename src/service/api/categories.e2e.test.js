'use strict';

const express = require(`express`);
const {CategoryService} = require(`../data-service`);
const categories = require(`./categories`);
const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);

const mocks = [{"id": `Op_Np`, "title": `Борьба с прокрастинацией`, "createdDate": `5/25/2021, 21:46:59`, "announce": `Простые ежедневные упражнения помогут достичь успеха. Просто добавлю предложение сюда, требуется по заданию`, "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`, "сategory": [`Разное`, `IT`], "comments": [{"id": `wOgk7`, "text": `Плюсую, но слишком много буквы!`}, {"id": `cp-d0`, "text": `Мне кажется или я уже читал это где-то?`}, {"id": `E4gPW`, "text": `Это где ж такие красоты?`}, {"id": `uwvpX`, "text": `Планируете записать видосик на эту тему?`}]}, {"id": `ERRKu`, "title": `Самый лучший музыкальный альбом этого года`, "createdDate": `4/29/2021, 22:36:41`, "announce": `Как начать действовать? Для начала просто соберитесь. Это один из лучших рок-музыкантов.`, "fullText": `Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Он написал больше 30 хитов. Программировать не настолько сложно, как об этом говорят. Ёлки — это не просто красивое дерево. Это прочная древесина. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Просто добавлю предложение сюда, требуется по заданию Золотое сечение — соотношение двух величин, гармоническая пропорция. Это один из лучших рок-музыкантов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`, "сategory": [`Разное`, `Без рамки`, `Музыка`, `Программирование`, `Железо`, `Кино`, `Деревья`, `IT`], "comments": [{"id": `nHccW`, "text": `Планируете записать видосик на эту тему?`}, {"id": `B16L0`, "text": `Мне кажется или я уже читал это где-то?`}, {"id": `ux0kz`, "text": `Плюсую, но слишком много буквы!`}, {"id": `bDZu1`, "text": `Хочу такую же футболку :-)`}, {"id": `KkImX`, "text": `Это где ж такие красоты?`}, {"id": `5A1Ax`, "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`}]}];

const createApp = () => {
  const app = express();
  app.use(express.json());
  categories(app, new CategoryService(mocks));
  return app;
};

describe(`categories test`, () => {
  let response;
  let app;
  beforeAll(async () => {
    app = createApp();
    response = await request(app).get(`/categories`);
  });

  test(`request returns 200 status code`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`request returns 8 categories`, () => expect(response.body.length).toBe(8));
  test(`request returns right categories`, async () => {
    const expected = [`Разное`, `Без рамки`, `Музыка`, `Программирование`, `Железо`, `Кино`, `Деревья`, `IT`];
    return expect(response.body).toEqual(expect.arrayContaining(expected));
  });
});
