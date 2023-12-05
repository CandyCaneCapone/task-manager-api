const Tasks = require("../db/Tasks");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.find({});
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Tasks.findOne({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ status: 404, message: `no task with id ${taskId}` });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    await Tasks.create({
      title: req.body.title,
      desc: req.body.desc,
      completed: req.body.completed,
    });
    res.status(201).json({ status: 201, message: "created" });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const task = await Tasks.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res
        .status(404)
        .json({ status: 404, message: `no task with id ${taskId}` });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Tasks.findOneAndDelete({ _id: taskId });

    if (!task) {
      return res
        .status(404)
        .json({ status: 404, message: `no task with id ${taskId}` });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
