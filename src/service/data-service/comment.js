'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  findAll(article) {
    return article.comments;
  }

  findOne(article, id) {
    const comment = article.comments.find((c) => c.id === id);
    return comment || null;
  }

  drop(article, id) {
    const droppedComment = this.findOne(article, id);
    article.comments = article.comments.filter((c) => c.id !== id);
    return droppedComment;
  }

  create(article, comment) {
    const newComment = {id: nanoid(MAX_ID_LENGTH), ...comment};
    article.comments.push(newComment);
    return newComment;
  }
}

module.exports = CommentService;
