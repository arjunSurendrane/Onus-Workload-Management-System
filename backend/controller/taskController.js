import Task from "../models/taskModal";

const getAllTask = async (req, res) => {
  const tasks = await Task.aggregate.group({ _id: $ });
};
