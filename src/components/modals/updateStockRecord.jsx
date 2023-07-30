"use client";
import React, { useState } from "react";
import toaserService from "@/services/toaster";
import { useDispatch } from "react-redux";
import { updateStockRecord } from "@/store/portfolios";
const { v4: uuidv4 } = require("uuid");
import Header from "./components/header";
import Footer from "./components/footer";

import Input from "@/components/formElements/input";
import SelectBox from "@/components/formElements/selectBox";

import { Formik } from "formik";

import StockRecordSchema from "@/validations/stockRecordValidation";

function UpdateStock({ data: record, close }) {
  // const [portfolio, setPortfolio] = useState("");
  const selectBoxData = [
    { id: "Buy", name: "Buy" },
    { id: "Sell", name: "Sell" },
  ];

  const dispatch = useDispatch();
  const update = (values) => {
    try {
      dispatch(updateStockRecord(values));
      close();
      toaserService.toast(`${record.name} Updated.`);
    } catch (error) {
      toaserService.toast(error.message, "error");
    }
  };

  return (
    <div>
      <Formik
        initialValues={record}
        validationSchema={StockRecordSchema}
        onSubmit={(values) => {
          // same shape as initial values
          update(values);
        }}
        validateOnChange={false}
        validateOnBlur={true}
        enableReinitialize={true}
      >
        {({ values, handleSubmit, handleChange }) => (
          <>
            <Header title="Update Record" />
            <div className="p-3 grid grid-cols-2 w-[600px]  ">
              <Input
                containerClass="col-span-2"
                disabled
                title="Hisse Adı"
                name="name"
                value={values.name}
                onChange={handleChange("name")}
              />
              <SelectBox
                data={selectBoxData}
                title="İşlem"
                name="action"
                value={values.action}
                onChange={handleChange("action")}
              />

              <Input
                title="Adet"
                type="number"
                name="piece"
                value={values.piece}
                onChange={handleChange("piece")}
              />

              <Input
                title="Fiyat"
                type="number"
                name="cost"
                value={values.cost}
                onChange={handleChange("cost")}
              />

              <Input
                title="Komisyon"
                type="number"
                name="commission"
                value={values.commission}
                onChange={handleChange("commission")}
              />


              <Input
                title="Tarih"
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange("date")}
              />

              <Input
                title="Saat"
                type="time"
                name="time"
                value={values.time}
                onChange={handleChange("time")}
              />
            </div>
            <Footer action={handleSubmit} actionButtonTitle={"Update"} />
          </>
        )}
      </Formik>
    </div>
  );
}

export default UpdateStock;
