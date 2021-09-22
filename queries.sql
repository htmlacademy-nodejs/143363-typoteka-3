-- Cписок всех категорий
SELECT * FROM categories;

-- Cписок категорий для которых создана минимум одна публикация (идентификатор, наименование категории);
SELECT id, name FROM categories
  JOIN articles_categories
  ON category_id = id
  GROUP BY id
  ORDER BY id ASC;

-- Cписок категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории)
SELECT id, name, count(article_id)AS articles_count FROM categories
  JOIN articles_categories ON category_id = id
  GROUP BY id
  ORDER BY id ASC;

-- Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации
SELECT
  articles.id,
  title,
  announce,
  created_at,
  users.name,
  last_name,
  email,
  COUNT(comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
  FROM articles
  LEFT JOIN comments ON articles.id = comments.article_id
  JOIN articles_categories ON articles_categories.article_id = articles.id
  JOIN categories ON articles_categories.category_id = categories.id
  JOIN users ON articles.user_id = users.id
  GROUP BY articles.id, users.id
  ORDER BY created_at DESC;

-- Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
SELECT
  articles.id,
  title,
  announce,
  photo,
  created_at,
  users.name,
  last_name,
  email,
  COUNT(comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
  FROM articles
  LEFT JOIN comments ON articles.id = comments.article_id
  JOIN articles_categories ON articles_categories.article_id = articles.id
  JOIN categories ON articles_categories.category_id = categories.id
  JOIN users ON articles.user_id = users.id
  WHERE articles.id = 1
  GROUP BY articles.id, users.id;

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария);
SELECT comments.id, comments.article_id, users.name, users.last_name, text
  FROM comments
  JOIN users ON comments.user_id = users.id
  ORDER BY comments.created_at DESC
  LIMIT 5;

-- Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT comments.id, comments.article_id, users.name, users.last_name, text
  FROM comments
  JOIN users ON comments.user_id = users.id
  WHERE article_id = 1
  ORDER BY comments.created_at DESC;

-- Обновить заголовок определённой публикации на «Как я встретил Новый год»;
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;
