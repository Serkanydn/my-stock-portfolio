import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

import { TbDotsVertical } from "react-icons/tb";

export default function Dropdown({ items, title }) {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-white bg-indigo-300 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {title ? (
              <span className="mx-2 text-sm font-medium text-gray-600">{title}</span>
            ) : (
              <TbDotsVertical size="18" className="text-gray-600" style={{ strokeWidth: "3" }} />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-30 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {items.map(({ title, onClick, icon }, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      onClick={onClick}
                      className="flex items-center w-full gap-1 px-2 py-2 text-sm text-black rounded-md hover:bg-violet-500 hover:text-white group "
                    >
                      {active && icon ? <span className="text-white ">{icon}</span> : <span className="text-violet-500 ">{icon}</span>}
                      {title}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
