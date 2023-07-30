import React, { useState } from "react";

import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

function Table({
  head,
  body,
  searchable,
  pagination,
  bodyTrClassConditionIndex,
  bodyTrClassCondition,
  ignoredFields
}) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState(false);
  const [page, setPage] = useState({
    startPage: 0,
    endPage: pagination?.pageSize,
    currentPage: 1,
    size: pagination?.pageSize,
    count: Math.ceil(body.length / pagination?.pageSize),
  });

  const paginatingData = pagination?.paginate && body.length
    ? body.slice(page.startPage, page.endPage)
    : body;

  const filteredData =
    paginatingData &&
    paginatingData
      .filter((items) =>
        items.some((item) => {
          return (item?.key || item)
            .toString()
            .toLocaleLowerCase("TR")
            .includes(search.toLocaleLowerCase("TR"));
        })
      )
      .sort((a, b) => {
        const sortingFist = a[sorting.index]?.key || a[sorting.index];
        const sortingTwo = b[sorting.index]?.key || b[sorting.index];

        if (sorting?.orderBy === "asc") {
          return sortingFist.toString().localeCompare(sortingTwo);
        }

        if (sorting?.orderBy === "desc") {
          return sortingTwo.toString().localeCompare(sortingFist);
        }
      });

  if (!paginatingData || paginatingData.length === 0) {
    return (
      <div className="p-4 text-sm text-yellow-700 bg-yellow-100 rounded">
        Gösterilecek veri bulunmuyor.{" "}
      </div>
    );
  }

  return (
    <>
      {searchable && (
        <div className="flex mb-4 gap-x-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            type="text"
            placeholder="Tabloda ara"
            className="w-full h-10 px-4 text-sm border border-gray-200 rounded outline-none focus:border-black"
          />
          {sorting && (
            <button
              onClick={() => setSorting(false)}
              className="h-10 px-4 text-sm text-red-500 border border-red-500 rounded whitespace-nowrap"
            >
              Sıralayı İptal Et
            </button>
          )}
        </div>
      )}

      <div className="w-full h-full border rounded">
        <table className="w-full h-full ">
          <thead>
            <tr>
              {head.map((h, index) => (
                <th
                  key={index * 99}
                  width={h?.width}
                  className="p-3 text-sm font-semibold text-center text-gray-500 border-b bg-gray-50"
                >
                  <div className="inline-flex items-center gap-x-2">
                    {h.name}
                    {h.sortable && (
                      <button
                        onClick={() => {
                          if (sorting?.index === index) {
                            setSorting({
                              index,
                              orderBy:
                                sorting.orderBy === "asc" ? "desc" : "asc",
                            });
                          } else {
                            setSorting({
                              index,
                              orderBy: "asc",
                            });
                          }
                        }}
                      >
                        {sorting?.index === index &&
                          (sorting.orderBy === "asc" ? (
                            <FaSortDown size="14" />
                          ) : (
                            <FaSortUp size="14" />
                          ))}
                        {sorting?.index !== index && <FaSort size="14" />}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {filteredData &&
              filteredData.map((items, index) => (
                <tr
                  key={index * 999}
                  className={`group ${bodyTrClassCondition && bodyTrClassCondition(items[bodyTrClassConditionIndex])
                    } `}
                >
                  {items.map((item, index) => (
                    <td
                      key={item.id}
                      className="p-2 text-sm text-center group-hover:bg-gray-100"
                    >
                      {Array.isArray(item) ? (
                        <div className="flex gap-x-2.5 ">{item}</div>
                      ) : (
                        item
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {body.length > page.size && (
          <div className="flex justify-between w-full px-5 border-t ">
            <div className="grid items-center">
              Page {page.currentPage} of {page.count} ({body.length} items)
            </div>
            <div className="flex ">
              <button
                onClick={() => {
                  setPage({
                    ...page,
                    startPage: (page.currentPage - 2) * page.size,
                    endPage: page.size * (page.currentPage - 1),
                    currentPage: page.currentPage - 1,
                  });
                }}
                disabled={page.startPage === 0}
                className="px-3 py-1 m-1 rounded "
              >
                <MdOutlineKeyboardArrowLeft
                  size="24"
                  color={page.startPage === 0 && "gray"}
                />
              </button>
              {Array.from(Array(page.count).keys()).map((index) => {
                return (
                  <button
                    onClick={() => {
                      setPage({
                        ...page,
                        startPage: index * page.size,
                        endPage: page.size * (index + 1),
                        currentPage: index + 1,
                      });
                    }}
                    disabled={page.currentPage === index + 1}
                    className={` px-3 py-1 rounded m-1  ${page.currentPage === index + 1 && "bg-slate-200"
                      }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  setPage({
                    ...page,
                    startPage: page.currentPage * page.size,
                    endPage: page.size * (page.currentPage + 1),
                    currentPage: page.currentPage + 1,
                  });
                }}
                disabled={page.endPage === body.length}
                className="px-3 py-1 m-1 rounded "
              >
                <MdOutlineKeyboardArrowRight
                  size="24"
                  color={page.endPage === body.length && "gray"}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Table;
