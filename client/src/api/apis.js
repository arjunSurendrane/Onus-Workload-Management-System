import axios from "./index";

export const addDepartment = async (id, cookie, data) => {
  try {
    console.log(id);
    const res = await axios.patch(
      `/workspace/department/${id}`,
      { name: data },
      {
        headers: {
          authorization: `Bearer ${cookie}`,
        },
      }
    );
    return res.data.status;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchTask = async ({ id, cookies }) => {
  console.log("fetch task called");
  try {
    const res = await axios.get(`/workspace/tasks/${id}/list`, {
      headers: { authorization: `Bearer ${cookies}` },
    });
    console.log(res);
    localStorage.setItem("Tasks", JSON.stringify({ ...res.data.tasks }));
    return res.data.tasks;
  } catch (error) {
    return error;
  }
};

export const userAuthorization = async (data) => {
  try {
    const res = await axios.get("/user/isUserValid", {
      headers: {
        authorization: `Bearer ${data}`,
      },
    });
    console.log({ res: res.data.user });
    localStorage.setItem("User", JSON.stringify({ ...res.data.user }));
    return true;
  } catch (error) {
    localStorage.clear();
    return false;
  }
};

export const addTask = async ({ cookie, data }) => {
  try {
    console.log(cookie, data);
    const formData = new FormData();
    formData.append("taskName", data.taskName);
    formData.append("projectId", data.projectId);
    formData.append("description", data.Description);
    formData.append("dueDate", data.dueDate);
    formData.append("attachedFile", data.file[0]);
    const res = await axios.post("/workspace/task", formData, {
      headers: { authorization: `Bearer ${cookie}` },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchData = (namess) => {
  console.log(namess);
  return { name: "workspace", namess };
};

export const fetchTaskData = async ({ id, cookie }) => {
  const res = await axios.get(`/workspace/task/${id}`, {
    headers: { authorization: `Bearer ${cookie}` },
  });
  console.log(res);
  if (res.data.status == "success") {
    console.log({ task: res.data.task });
    return res.data.task;
  }
};

export const changeStatus = async (id, status, cookie) => {
  const res = await axios.patch(
    `/workspace/task/status/${id}`,
    { status },
    { headers: { authorization: `Bearer ${cookie}` } }
  );
  if (res.data.status == "success") {
    return res.data.status;
  }
  console.log({ changeStatusError: res });
};

export const deleteTask = async (id, cookie) => {
  const res = await axios.delete(`/workspace/task/${id}`, {
    headers: { authorization: `Bearer ${cookie}` },
  });
  console.log({ responseInApi: res });
  if (res.status == 204) {
    return res;
  }
};

export const changeTaskPrioriy = async (id, priority, cookie) => {
  const res = await axios.patch(
    `/workspace/task/priority/${id}`,
    { priority },
    { headers: { authorization: `Bearer ${cookie}` } }
  );
  console.log({ priority: res });
  if (res.data.status == "success") {
    return res;
  }
};

export const sendInvitationApi = async (email, role, cookie, workspaceId) => {
  try {
    console.log({ email, role, cookie, workspaceId });
    const res = await axios.post(
      `/workspace/invitation/${workspaceId}`,
      { memberEmail: email, role },
      {
        headers: {
          authorization: `Bearer ${cookie}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const addUserIntoWorkspace = async (id) => {
  return await axios.patch(`/workspace/member/${id}`);
};

export const AssignTask = async (taskId, userId, cookie) => {
  return await axios.patch(
    `/workspace/task/assign`,
    { taskId, userId },
    { headers: { authorization: `Bearer ${cookie}` } }
  );
};
