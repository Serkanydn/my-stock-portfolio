"use client";
import React, { useState } from "react";

import { RxDashboard, RxArchive } from "react-icons/rx";
import { RiDashboardLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import Link from "next/link";

import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { isShow } = useSelector((state) => state.sidebar);

  const pathName = usePathname();

  const [selectedItem, setSelectedItem] = useState(pathName);

  const items = [
    { icon: <RiDashboardLine />, name: "Dashboard", link: "/" },
    { icon: <RxDashboard />, name: "Portfolio", link: "/portfolios" },
    { icon: <RxArchive />, name: "Archive", link: "/archive" },
    // BiArchiveIn
    // BiArchiveOut
  ];
  return (
    <div
      className="bg-[#F3F4F6] h-screen"
      style={{ width: isShow ? "290px" : "80px" }}
    >
      <div className="text-sm text-[#6B7280] h-[64px]   inline-flex items-center justify-center w-full">
        Admin
      </div>
      <div className=" h-[calc(100vh-4rem)] overflow-y-auto overflow-x-auto ">
        <div className="px-4 pb-4">
          {items.map((item) => (
            <Link
              key={item.name}
              title={!isShow ? item.name : ""}
              href={item.link}
            >
              <button
                onClick={() => {
                  setSelectedItem(item.link);
                }}
                className={`flex w-full items-center h-[40px] rounded-md mb-2 px-3 hover:bg-[#DCDDE1] cursor-poiner ${
                  selectedItem === item.link && "bg-[#DCDDE1]"
                }`}
              >
                <span className={`${isShow && "mr-2"}  text-xl`}>
                  {item.icon}
                </span>
                {isShow && (
                  <span className="font-semibold text-[#4B5563]">
                    {item.name}
                  </span>
                )}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
