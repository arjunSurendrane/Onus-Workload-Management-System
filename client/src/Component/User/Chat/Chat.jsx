import React from "react";
const chat = [
  {
    heading: "Workspace",
    Message: [
      {
        chatName: "WorkspaceName",
        latestMessage: "new message",
        unreadMessages: 3,
      },
    ],
  },
  {
    heading: "Department",
    Message: [
      {
        chatName: "DepartmentName",
        latestMessage: "new message",
        unreadMessages: 3,
      },
      {
        chatName: "DepartmentName 2",
        latestMessage: "new message",
        unreadMessages: 4,
      },
    ],
  },
];
export default function ChatScreen() {
  return (
    <div>
      {chat.map((data, key) => (
        <>
          <div key={key} className="my-8">
            <div className="mx-5 my-5">
              <p className="text-xl font-bold text-gray-400">{data.heading}</p>
            </div>
            {data.Message.map((msg, key) => (
              <div
                className="md:mx-14 py-5 mx-5 mt-10  md:w-[70vw] w-[87vw]  flex justify-between px-2 border border-t-4 border-t-[#7b68ee] shadow-lg rounded"
                key={key}
              >
                <div>
                  <div className="px-5 font-medium">
                    <div>
                      <p>{msg.chatName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {msg.latestMessage}
                      </p>
                    </div>
                  </div>
                </div>
                <div>{msg.unreadMessages}</div>
              </div>
            ))}
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}
