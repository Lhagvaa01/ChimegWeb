import React, { useState } from "react";
import { AiOutlineUnorderedList, AiOutlineDownload } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";

const Tab = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoading, setIsLoading] = useState(false);
  const [dtlDrivers, setDtlDrivers] = useState([]);

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  const handleClick = (url) => {
    window.location.href = url;
  };

  function groupByCategory(specifications) {
    // Check if specifications is defined and is an array
    if (!specifications || !Array.isArray(specifications)) {
      console.error("Invalid specifications data:", specifications);
      return {};
    }

    return specifications.reduce((acc, spec) => {
      const category = spec.category?.name || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(spec);
      return acc;
    }, {});
  }
  const groupedSpecifications = groupByCategory(tabs.hardware_specifications);

  return (
    <div className="">
      <div className="px-5 py-4 md:py-6  border border-opacity-70  md:mx-32 ">
        <div className="grid grid-flow-col auto-cols-max md:justify-center justify-evenly  md:font-medium md:text-xl text-gray-600">
          {tabs.tabInfo != null
            ? tabs.tabInfo.map((tab) => (
                <h2
                  key={tab.title}
                  onClick={() => changeTab(tab)}
                  className={`${
                    tab.title === "Үзүүлэлт"
                      ? "border-x border-opacity-70 md:mx-12 md:px-12 px-3"
                      : ""
                  } hover:text-green-800 cursor-pointer`}
                >
                  {tab.title}
                </h2>
              ))
            : ""}
        </div>
      </div>
      <div className="md:mx-32">
        <div className="md:p-10 p-3 ">
          <h1 className="text-lg font-semibold">{activeTab.title}</h1>
          <div>
            {activeTab.title === "Татах" ? (
              activeTab.content != null && activeTab.content.length > 0 ? (
                activeTab.content.map((dtl) => (
                  <div
                    key={dtl.pk}
                    className="flex border-b mt-2 justify-between mr-32 py-2"
                  >
                    <div>{dtl.TCFileName}</div>
                    <button
                      className="flex items-center justify-evenly bg-green-800 rounded-md w-20 text-white"
                      onClick={() => handleClick(dtl.TCFileUrl)}
                    >
                      <HiDownload />
                      <div>Татах</div>
                    </button>
                  </div>
                ))
              ) : (
                <div>Холбоос олдсонгүй</div>
              )
            ) : activeTab.title === "Үзүүлэлт" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100 rounded-xl shadow-lg">
                {Object.entries(groupedSpecifications).length > 0 ? (
                  Object.entries(groupedSpecifications).map(
                    ([category, specs]) => (
                      <div
                        key={category}
                        className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <h3 className="text-lg font-bold text-gray-700 uppercase mb-4 tracking-wide border-b pb-2 border-gray-200">
                          {category}
                        </h3>
                        <div className="space-y-3">
                          {specs.map((spec) => (
                            <div
                              key={spec.id}
                              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-sm"
                            >
                              <h4 className="text-sm font-medium text-gray-600">
                                {spec.name}
                              </h4>
                              {spec.detail && (
                                <span className="text-gray-900 font-semibold text-xs bg-gray-200 px-2 py-1 rounded-full">
                                  {spec.detail}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="col-span-2 text-center text-gray-500 text-base font-semibold">
                    No hardware specifications available.
                  </div>
                )}
              </div>
            ) : (
              <span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: activeTab.content,
                  }}
                />
              </span>
            )}
          </div>
          {/* <div className="md:w-full md:ml-12 md:mx-0 mx-10">
            <div>
              <div className="flex text-lg items-center ">
                <AiOutlineDownload className="fill-green-800 mr-3" size={30} />
                <div>Холбоосууд</div>
              </div>
              {isLoading ? (
                <div>Loading...</div>
              ) : dtlDrivers.length > 0 ? (
                dtlDrivers.map((dtl) => (
                  <div
                    key={dtl.dId}
                    className="flex border-b mt-2 justify-between mr-32 py-2"
                  >
                    <div>{dtl.dUrl}</div>
                    <button className="flex items-center justify-evenly bg-green-800 rounded-md w-20 text-white">
                      <HiDownload />
                      <div>Татах</div>
                    </button>
                  </div>
                ))
              ) : (
                ""
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Tab;
