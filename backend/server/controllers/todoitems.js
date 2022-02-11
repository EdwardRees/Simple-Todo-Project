const TodoItem = require("../models").TodoItem;

module.exports = {

  /**
   * Create a new todo item
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns 200 with the todo or 400 with the error message
   */
  create(req, res) {
    return TodoItem.create({
      content: req.body.content,
      todoId: req.params.todoId,
    })
      .then((todoItem) => res.status(201).send(todoItem))
      .catch((err) => res.status(400).send(err));
  },

  /**
   * Update a given todo item
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns 200 with the todo or 400 with the error message or 404 if no todo is found
   */
  update(req, res) {
    return TodoItem.findOne({
      where: { id: req.params.todoItemId, todoId: req.params.todoId },
    })
      .then((todoItem) => {
        if (!todoItem) {
          return res.status(404).send({ message: "Todo item not found!" });
        }
        return todoItem
          .update({
            content: req.body.content || todoItem.content,
            complete: req.body.complete || todoItem.complete,
          })
          .then(() => res.status(200).send(todoItem))
          .catch((err) => res.status(400).send(err));
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  /**
   * Delete the given todo item
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns 200 with the todo item deleted or 400 with the error message or 404 if no todo is found
   */
  delete(req, res){
    return TodoItem.findOne({
      where: { id: req.params.todoItemId, todoId: req.params.todoId },
    })
      .then((todoItem) => {
        if (!todoItem) {
          return res.status(404).send({ message: "Todo item not found!" });
        }
        return todoItem
          .destroy()
          .then(() => res.status(200).send({ message: "Todo item deleted!" }))
          .catch((err) => res.status(400).send(err));
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};
