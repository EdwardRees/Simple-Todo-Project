const Todo = require("../models").Todo;
const TodoItem = require("../models").TodoItem;

module.exports = {
  /**
   * Create a new todo list
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns 201 with the created todo or 400 with the error message
   */
  create(req, res) {
    return Todo.create({ title: req.body.title })
      .then((todo) => res.status(201).send(todo))
      .catch((error) => res.status(400).send(error));
  },

  /**
   * List all of the todo lists
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns 200 with the list of todos or 400 with the error message
   */
  list(req, res) {
    return Todo.findAll({
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    })
      .then((todo) => res.status(200).send(todo))
      .catch((err) => res.status(400).send(err));
  },

  /**
   * Retrieve or get a specific todo list
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns 200 with the todo or 400 with the error message or 404 if no todo list is found
   */
  retrieve(req, res) {
    return Todo.findByPk(req.params.todoId, {
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    })
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({ message: "Todo not found!" });
        }
        return res.status(200).send(todo);
      })
      .catch((err) => res.status(400).send(err));
  },

  /**
   * Update a specific todo list
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns 200 with the updated todo or 400 with the error message or 404 if no todo list is found
   */
  update(req, res) {
    return Todo.findByPk(req.params.todoId, {
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    })
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({ message: "Todo not found!" });
        }
        return todo
          .update({ title: req.body.title || todo.title })
          .then(() => res.status(200).send(todo))
          .catch((err) => res.status(400).send(err));
      })
      .catch((err) => res.status(400).send(err));
  },

  /**
   * Delete the given todo list
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns 200 with the message of Todo deleted successfully or 400 with the error message or 404 if no todo list is found
   */
  delete(req, res){
    return Todo.findByPk(req.params.todoId)
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({ message: "Todo not found!" });
        }
        return todo
          .destroy()
          .then(() => res.status(200).send({ message: "Todo deleted successfully!" }))
          .catch((err) => res.status(400).send(err));
      })
      .catch((err) => res.status(400).send(err));
  }
};
