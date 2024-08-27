const zod = require("zod");

const createTodo = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
});

const ComDelTodo = zod.object({
  index: zod.number(),
});

const updateTodo = zod.object({
  id: zod.string(),
  title: zod.string().min(1),
  description: zod.string().min(1),
});

module.exports = {
  createTodo,
  ComDelTodo,
  updateTodo,
};
