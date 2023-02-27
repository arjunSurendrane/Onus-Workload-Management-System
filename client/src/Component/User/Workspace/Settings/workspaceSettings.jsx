import {
  TabPanel,
  TabsBody,
  TabsHeader,
  Tab,
  Tabs,
} from "@material-tailwind/react";
import React from "react";

export default function WorkspaceSettings() {
  const data = [
    {
      label: "Invite",
      value: "html",
      desc: (
        <>
          <div className=" flex place-content-center mt-10">
            <div className="grid place-content-center">
              <p className="font-medium text-md">Enter the mail id</p>
            </div>
            <div className="ml-5 grid place-content-center">
              <input
                id="email"
                name="email"
                type="email"
                className="relative mt-5 block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="email"
              />
            </div>
          </div>
        </>
      ),
    },
    {
      label: "Peoples",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Settings",
      value: "settings",
      desc: (
        <>
          <h1>hello</h1>
        </>
      ),
    },
  ];
  return (
    <div className="w-[79vw]">
      <Tabs value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="font-bold text-lg">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
