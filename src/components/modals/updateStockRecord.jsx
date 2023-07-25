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
            <div className="p-3 flex flex-wrap -mx-3  ">
              <Input
                disabled
                title="Hisse Adı"
                name="name"
                position="2"
                value={values.name}
                onChange={handleChange("name")}
              />
              <SelectBox
                data={selectBoxData}
                title="İşlem"
                position="2"
                name="action"
                value={values.action}
                onChange={handleChange("action")}
              />

              <Input
                title="Fiyat"
                type="number"
                position="2"
                name="cost"
                value={values.cost}
                onChange={handleChange("cost")}
              />

              <Input
                title="Komisyon"
                type="number"
                position="2"
                name="commission"
                value={values.commission}
                onChange={handleChange("commission")}
              />
              <Input
                title="Adet"
                type="number"
                position="2"
                name="piece"
                value={values.piece}
                onChange={handleChange("piece")}
              />

              <Input
                title="Tarih"
                type="date"
                position="3"
                name="date"
                value={values.date}
                onChange={handleChange("date")}
              />

              <Input
                title="Saat"
                type="time"
                position="3"
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
