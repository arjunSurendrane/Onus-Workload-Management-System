import axios from "./index";

export const urls = {
  addMember: "/workspace/member/",
  createWorkspace: "/workspace",
  createTask: "/workspace/task",
  createProject: "/workspace/project",
  sendInvitation: "/workspace/invitation/",
  addDepartment: "/workspace/department/",
  changeTaskStatus: "/workspace/task/status/",
  changePriority: "/workspace/task/priority/",
  taskUpdate: "/workspace/task/",
  assignTask: "/workspace/task/assign",
  deleteTask: "/workspace/task/",
  workspace: "/workspace",
  groupAllTasks: "/workspace/tasks/:id/list",
  getOneTask: "/workspace/task/:id",
  projects: "/workspace/projects/",
  addSubTask: "/workspace/task/subtask/:id",
  deleteSubtask: "/workspace/task/:id/:subtaskId",
};

export const sendRequest = async ({
  link,
  id = null,
  data = null,
  cookies: token,
  subtaskId = null,
  operation,
}) => {
  let url = urls[link];
  if (id) url = url.replace(":id", id);
  if (operation == "get") {
    const res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log({ responseFromFetch: res });
    return res;
  }
  if (operation == "post") {
    const res = await axios.post(url, data, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
  if (operation == "patch") {
    const res = await axios.patch(url, data, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
  if (operation == "delete") {
    if (subtaskId) url = url.replace(":subtaskId", subtaskId);
    console.log(url);
    const res = await axios.delete(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  }
};
