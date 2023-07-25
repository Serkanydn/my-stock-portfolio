import React, { useState } from "react";

function Tab({ children, activeTab }) {
  const [active, setActiveTab] = useState(activeTab);

  const changeActiveTab = (index) => {
    setActiveTab(index);
  };
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-200 p-1">
        <nav className=" flex items-center gap-2 text-sm font-medium ">
          {children.map((tab, index) => (
            <button
              onClick={() => changeActiveTab(index)}
              className={
                active === index
                  ? "text-gra relative flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 shadow hover:bg-white hover:text-gray-700"
                  : "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
              }
              key={index}
            >
              {tab.props.title}
            </button>
          ))}
        </nav>
      </div>
      {children[active]}
    </>
  );
}

Tab.Panel = function ({ children, title }) {
  return <div className="">{children}</div>;
};

export default Tab;
