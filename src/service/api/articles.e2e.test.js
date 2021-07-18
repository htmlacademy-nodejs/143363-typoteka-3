'use strict';
const express = require(`express`);
const {ArticleService, CommentService} = require(`../data-service`);
const articles = require(`./articles`);
const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);

const mocks = [{"id": `Op_Np`, "title": `Борьба с прокрастинацией`, "createdDate": `5/25/2021, 21:46:59`, "announce": `Простые ежедневные упражнения помогут достичь успеха. Просто добавлю предложение сюда, требуется по заданию`, "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`, "category": [`Разное`, `IT`], "comments": [{"id": `wOgk7`, "text": `Плюсую, но слишком много буквы!`}, {"id": `cp-d0`, "text": `Мне кажется или я уже читал это где-то?`}, {"id": `E4gPW`, "text": `Это где ж такие красоты?`}, {"id": `uwvpX`, "text": `Планируете записать видосик на эту тему?`}]}, {"id": `ERRKu`, "title": `Самый лучший музыкальный альбом этого года`, "createdDate": `4/29/2021, 22:36:41`, "announce": `Как начать действовать? Для начала просто соберитесь. Это один из лучших рок-музыкантов.`, "fullText": `Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Он написал больше 30 хитов. Программировать не настолько сложно, как об этом говорят. Ёлки — это не просто красивое дерево. Это прочная древесина. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Просто добавлю предложение сюда, требуется по заданию Золотое сечение — соотношение двух величин, гармоническая пропорция. Это один из лучших рок-музыкантов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`, "category": [`Разное`, `Без рамки`, `Музыка`, `Программирование`, `Железо`, `Кино`, `Деревья`, `IT`], "comments": [{"id": `nHccW`, "text": `Планируете записать видосик на эту тему?`}, {"id": `B16L0`, "text": `Мне кажется или я уже читал это где-то?`}, {"id": `ux0kz`, "text": `Плюсую, но слишком много буквы!`}, {"id": `bDZu1`, "text": `Хочу такую же футболку :-)`}, {"id": `KkImX`, "text": `Это где ж такие красоты?`}, {"id": `5A1Ax`, "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`}]}];

const createApp = () => {
  const app = express();
  app.use(express.json());
  articles(app, new ArticleService(mocks), new CommentService());
  return app;
};

describe(`returns list of articles`, () => {
  let response;

  beforeAll(async () => {
    const app = createApp();
    response = await request(app).get(`/articles`);
  });

  test(`200 code`, ()=> expect(response.statusCode).toBe(HttpCode.OK));
  test(`returns 2 acticles`, ()=> expect(response.body.length).toBe(2));
});

describe(`returns an article with a given id`, () => {
  let response;
  const id = `ERRKu`;
  beforeAll(async () => {
    const app = createApp();
    response = await request(app).get(`/articles/${id}`);
  });

  test(`200 code`, ()=> expect(response.statusCode).toBe(HttpCode.OK));
  test(`returns article with id ${id}`, ()=> expect(response.body.id).toBe(id));
});

test(`returns 404 if  article with given id is not exist`, () => {
  const app = createApp();

  return request(app).get(`/articles/lalala`).expect(HttpCode.NOT_FOUND);
});

/** kek */

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    title: `Новая публикация`,
    announce: `Просто текст и т.д. и т.п.`,
    fullText: `Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    category: [`За жизнь`, `Программирование`]
  };

  let api;
  let response;

  beforeAll(async () => {
    api = createApp();
    response = await request(api).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => {
    return expect(response.statusCode).toBe(HttpCode.CREATED);
  });

  test(`Returns article created`, () => {
    return expect(response.body).toEqual(expect.objectContaining(newArticle));
  });

  test(`Articles count is changed`, () => {
    return request(api).get(`/articles`).expect((res) => expect(res.body.length).toBe(3));
  });
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    title: `Новая публикация`,
    announce: `Просто текст и т.д. и т.п.`,
    fullText: `Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    category: [`За жизнь`, `Программирование`]
  };

  test(`Without any required property response code is 400`, async () => {
    const api = createApp();
    for (const key in Object.keys(newArticle)) {
      if ({}.hasOwnProperty.call(newArticle, key)) {
        const badArticle = {...newArticle};
        delete badArticle[key];
        await request(api).post(`/articles`).send(badArticle).expect(HttpCode.BAD_REQUEST);
      }
    }
    return;
  });
});

describe(`API changes existent article`, () => {
  const id = `ERRKu`;
  const articleUpdates = {
    title: `Новая публикация`,
    announce: `Просто текст и т.д. и т.п.`,
    fullText: `Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    category: [`За жизнь`, `Программирование`]
  };

  let response;

  beforeAll(async () => {
    const app = createApp();
    response = await request(app).put(`/articles/${id}`).send(articleUpdates);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(articleUpdates)));
  test(`Article is really changed`, () => expect(response.body.title).toBe(articleUpdates.title));
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const articleUpdates = {
    title: `Новая публикация`,
    announce: `Просто текст и т.д. и т.п.`,
    fullText: `Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    category: [`За жизнь`, `Программирование`]
  };
  return request(createApp()).put(`/articles/nonExistingId`).send(articleUpdates).expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, async () => {
  const id = `ERRKu`;
  const articleUpdates = {
    title: `Новая публикация`,
    announce: `Просто текст и т.д. и т.п.`,
    fullText: `Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    category: [`За жизнь`, `Программирование`]
  };

  const app = createApp();
  for (const key in articleUpdates) {
    if ({}.hasOwnProperty.call(articleUpdates, key)) {
      const badArticleUpdates = {...articleUpdates};
      delete badArticleUpdates[key];
      await request(app).put(`/articles/${id}`).send(badArticleUpdates).expect(HttpCode.BAD_REQUEST);
    }
  }
  return;
});

describe(`API correctly deletes an article`, () => {
  let response;
  const app = createApp();
  const id = `ERRKu`;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/${id}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body.id).toBe(id));
  test(`Article count is 1 now`, async () => {
    const res = await request(app).get(`/articles`);
    return expect(res.body.length).toBe(2);
  });

});

test(`API refuses to delete non-existent article`, () => request(createApp()).delete(`/articles/notExistingId`).expect(HttpCode.NOT_FOUND));

test(`API refuses to create a comment to non-existent article and returns status code 404`, async () => {
  const api = createApp();
  const newComment = {test: `hop hey la-la-lay`};
  const response = await request(api).post(`/articles/RANDOM_ID/comments`).send(newComment);
  return expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
});

test(`API refuses to delete non-existent comment`, () => {
  const api = createApp();
  return request(api).delete(`/articles/NwsA4/comments/NOT_EXISTING_COMMENT`).expect(HttpCode.NOT_FOUND);
});
