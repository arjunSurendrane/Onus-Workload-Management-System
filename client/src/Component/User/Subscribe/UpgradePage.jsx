import React from "react";

export default function UpgradePage() {
  return (
    <div className="md:mx-14 mx-5 mt-10  md:w-[70vw] w-[87vw]  flex justify-between px-2  text-center rounded">
      <div className="w-full">
        <div className="w-full">
          <h1 className="w-full text-3xl font-bold text-[#75337d] my-2">
            Pricing
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4 my-10">
          <div className="p-5">
            <div className=" bg-gray-100 mx-auto   shadow-2xl py-10 border-y-[#00b884]">
              <p className="uppercase font-bold text-[#00b884] py-1">
                free forever
              </p>
              <p className="text-sm  py-1">Best for personal use</p>
              <h1 className=" py-1 font-bold text-5xl text-[#00b884]">Free</h1>
              <p className="  py-1 text-xs font-bold text-gray-400 uppercase">
                Forever
              </p>
              <button
                className="  mt-2 rounded-md bg-[#00b884] text-white w-[150px] h-[40px] "
                onClick={() => {
                  props.page == "landing"
                    ? history("/signup")
                    : history("/workspace");
                }}
              >
                Free Forever
              </button>
              <p className="py-1 mt-5 text-md">50 tasks</p>
              <p className="py-1 text-md">Add 10 memebers into workspace</p>
              <p className="py-1 text-md">Two-Factor Authentication</p>
              <p className="py-1 text-md">Real time chat</p>
              <p className="py-1 text-md">In app video recording</p>
              <p className="py-1 text-md">24/7 support</p>
            </div>
          </div>
          <div className="p-5">
            <div className=" bg-gray-100  mx-auto shadow-2xl  py-10">
              <p className="uppercase font-bold text-[#49ccf9] py-1">
                Business
              </p>
              <p className="text-sm  py-1">Best for mid sized teams</p>
              <h1 className=" py-1 font-bold text-5xl text-[#49ccf9]">₹499</h1>
              <p className="  py-1 text-xs font-bold text-gray-400 uppercase">
                Per member per month
              </p>
              <button
                className="  mt-2 rounded-md bg-[#49ccf9] text-white w-[150px] h-[40px]"
                onClick={() => {
                  props.page == "landing"
                    ? history("/signup")
                    : history("/home");
                }}
              >
                Get Started
              </button>
              <p className="py-1 mt-5 text-md">100 tasks</p>
              <p className="py-1 text-md">Add 20 memebers into workspace</p>
              <p className="py-1 text-md">Two-Factor Authentication</p>
              <p className="py-1 text-md">Real time chat</p>
              <p className="py-1 text-md">In app video recording</p>
              <p className="py-1 text-md">24/7 support</p>
            </div>
          </div>
          <div className="p-5">
            <div className=" bg-gray-100  mx-auto shadow-2xl py-10">
              <p className="uppercase font-bold text-[#7b68ee] py-1">
                Business Plus
              </p>
              <p className="text-sm  py-1">Best Multiple Teams</p>
              <h1 className=" py-1 font-bold text-5xl text-[#7b68ee]">₹699</h1>
              <p className="  py-1 text-xs font-bold text-gray-400 uppercase">
                per member per month
              </p>
              <button
                className="  mt-2 rounded-md bg-[#7b68ee] text-white w-[150px] h-[40px]"
                onClick={() => {
                  props.page == "landing"
                    ? history("/signup")
                    : history("/home");
                }}
              >
                Get Started
              </button>
              <p className="py-1 mt-5 text-md">unlimited tasks</p>
              <p className="py-1 text-md">
                Add unlimited memebers into workspace
              </p>
              <p className="py-1 text-md">Two-Factor Authentication</p>
              <p className="py-1 text-md">Real time chat</p>
              <p className="py-1 text-md">In app video recording</p>
              <p className="py-1 text-md">24/7 support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
