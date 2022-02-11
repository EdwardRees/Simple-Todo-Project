const todosController = require("../controllers").todos;
const todoItemsController = require("../controllers").todoItems;

module.exports = (app) => {

  /**
   * @desc Initial entrance point for the application
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns 200 with the message of "Welcome to the Todos API"
   */
  app.get("/api", (req, res) => res.status(200).send({ message: "Welcome to the Todos API" }));

  /**
   * @desc Get all todo lists
   * @method GET
   */
  app.get("/api/todos", todosController.list);

  /**
   * @desc Get a specific todo list
   * @method GET
   */
  app.get("/api/todos/:todoId", todosController.retrieve);

  /**
   * @desc Create a new todo list
   * @method POST
   */
  app.post("/api/todos", todosController.create);

  /**
   * @desc Update a given todo list
   * @method PUT
   */
  app.put("/api/todos/:todoId", todosController.update);

  /**
   * @desc Delete a given todo list
   * @method DELETE
   */
  app.delete("/api/todos/:todoId", todosController.delete);

  /**
   * @desc Create a new todo item for a given todo list
   * @method POST
   */
  app.post("/api/todos/:todoId/items", todoItemsController.create);

  /**
   * @desc Update a given todo item for a given todo list
   * @method PUT
   */
  app.put("/api/todos/:todoId/items/:todoItemId", todoItemsController.update);

  /**
   * @desc Delete a given todo item for a given todo list
   * @method DELETE
   */
  app.delete(
    "/api/todos/:todoId/items/:todoItemId",
    todoItemsController.delete
  );

  /**
   * @desc Any method called on this route will return a 405 error
   * @method *
   */
  app.all("/api/todos/:todoId/items", (req, res) =>
    res.status(405).send({ message: "Method not allowed" })
  );
};
