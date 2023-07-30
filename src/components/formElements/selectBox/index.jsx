import { useField } from "formik";

import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

import { HiSelector, HiCheck } from "react-icons/hi";

function SelectBox({
  onChange,
  data,
  value,
  title,
  position,
  disabled,
  containerClass,
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  const { error } = meta;

  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? data
      : data?.filter((stock) =>
        stock.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  return (
    <div
      className={`inline-block relative  px-3 max-sm:w-full mb-6 ${containerClass} `}
    >
      <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ">
        {title}
      </label>

      <Combobox value={value} disabled={disabled} onChange={onChange}>
        <div className="relative mt-1">
          <div className="relative w-full overflow-hidden text-left bg-white rounded cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              {...props}
              disabled={disabled}
              className={`block appearance-none w-full bg-gray-200 border border-gray-200  focus:bg-white py-3 px-4  pr-8 rounded shadow leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline ${disabled ? "bg-red-100" : "bg-gray-200"
                }`}
              displayValue={(data) => data}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiSelector
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople?.length === 0 && query !== "" ? (
                <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                  Nothing found.
                </div>
              ) : (
                filteredPeople?.map((data) => (
                  <Combobox.Option
                    key={data.id}
                    className={`relative cursor-default select-none py-2 pl-10 pr-4  hover:bg-teal-600 hover:text-white text-gray-900}`}
                    value={data.name}
                  >
                    {({ selected, active }) => {
                      return (
                        <>
                          <span
                            className={`block truncate ${selected ? "font-medium" : "font-normal"
                              }`}
                          >
                            {data.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                                }`}
                            >
                              <HiCheck className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      );
                    }}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {!!error && <p className="text-sm italic text-red-500">{error}</p>}
    </div>
  );
}

export default SelectBox;
