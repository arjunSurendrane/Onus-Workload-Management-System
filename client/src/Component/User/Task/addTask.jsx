import React from "react";
import { useForm } from "react-hook-form";

export default function AddTask({ setShowModal }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
        <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center  justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h1 className="font-bold text-lg">Create Task</h1>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowModal()}
              >
                x
              </button>
            </div>
            <div className="relative p-6 flex-auto mb-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email-address"
                    className="mt-3 text-sm font-medium"
                  >
                    Task Name
                  </label>
                  <input
                    id="email-address"
                    name="TaskName"
                    type="text"
                    required
                    autoComplete="email"
                    className="relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Task Name "
                    {...register("TaskName")}
                  />
                  <label
                    htmlFor="dueDate"
                    className=" text-sm mt-3 font-medium"
                  >
                    Due Date
                  </label>

                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    required
                    className="relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Due Date "
                    {...register("dueDate")}
                  />
                  <label
                    htmlFor="dueDate"
                    className=" text-sm mt-3 font-medium"
                  >
                    Discription
                  </label>
                  <textarea
                    id="Discription"
                    name="Discription"
                    type="text"
                    required
                    className="relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Add Description"
                    {...register("Discription")}
                  />
                  <label htmlFor="" className=" text-sm mt-3 font-medium">
                    Attachments
                  </label>
                  <input
                    name="file"
                    type="file"
                    className="relative text-center mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    {...register("file")}
                  />
                  <p className="text-red-500 text-sm font-medium"></p>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#7b68ee] py-2 px-4 text-sm font-medium text-white hover:bg-[#3b3171] focus:outline-none focus:ring-2 focus:ring-[#231e43] focus:ring-offset-2"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
