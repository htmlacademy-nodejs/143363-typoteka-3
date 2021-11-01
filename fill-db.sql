INSERT INTO users(avatar, name, last_name,email, password_hash) VALUES 
('photo01.jpg', 'Василий', 'Орлов', 'orlov@test.ru', '5f4dcc3b5aa76523d61d8327deb882cf13'),
('photo02.jpg', 'Иван', 'Ульянченко', 'ivan@test.ru', '5f4dcc3b125aa76523d61d8327deb2cf13');

INSERT INTO categories(name) VALUES 
('Деревья'),
('За жизнь'),
('Без рамки'),
('Разное'),
('IT'),
('Музыка'),
('Кино'),
('Программирование'),
('Железо');

ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(title, announce, full_text, photo, user_id) VALUES 
('Как собрать камни бесконечности', 'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Он написал больше 30 хитов. Просто добавлю предложение сюда, требуется по заданию', 'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Простые ежедневные упражнения помогут достичь успеха. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Это один из лучших рок-музыкантов. Ёлки — это не просто красивое дерево. Это прочная древесина. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Как начать действовать? Для начала просто соберитесь. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.', 'photo-0.jpg', 2);
ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories(article_id, category_id) VALUES 
(1, 9),
(1, 8),
(1, 2),
(1, 6),
(1, 1);
ALTER TABLE articles_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(user_id, article_id, text) VALUES 
(2, 1, 'Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-) Плюсую, но слишком много буквы!'),
(1, 1, 'Это где ж такие красоты? Планируете записать видосик на эту тему? Согласен с автором! Плюсую, но слишком много буквы!'),
(2, 1, 'Мне кажется или я уже читал это где-то? Хочу такую же футболку :-) Плюсую, но слишком много буквы! Совсем немного...'),
(1, 1, 'Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.'),
(1, 1, 'Это где ж такие красоты? Совсем немного... Планируете записать видосик на эту тему? Согласен с автором!');
ALTER TABLE comments ENABLE TRIGGER ALL;