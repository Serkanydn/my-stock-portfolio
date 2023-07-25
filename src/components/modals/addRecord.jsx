"use client";
import React, { useEffect, useState } from "react";
import toaserService from "@/services/toaster";
import { useDispatch } from "react-redux";
import { addRecord } from "@/store/portfolios";
const { v4: uuidv4 } = require("uuid");
import Header from "./components/header";
import Footer from "./components/footer";

import Input from "@/components/formElements/input";
import SelectBox from "@/components/formElements/selectBox";

import StockRecordSchema from "@/validations/stockRecordValidation";

import { getDate } from "@/utils/toolkit";
import { Formik } from "formik";

function AddRecord({ data: { portfolioId, stockId, name, action }, close }) {
  const dispatch = useDispatch();
  const selectBoxData = [
    { id: "Buy", name: "Buy" },
    { id: "Sell", name: "Sell" },
  ];

  const initialValue = {
    name,
    action,
    cost: 25,
    piece: 2,
    commission: 5,
    date: getDate().date,
    time: getDate().time,
  };
  const add = (values) => {
    try {
      const id = uuidv4();
      const totalCost = values.cost * values.piece - values.commission;
      const record = {
        id,
        portfolioId,
        stockId,
        totalCost,
        profitAndLossPercent: "-",
        profitAndLoss: "-",
        ...values,
      };
      dispatch(addRecord(record));
      close();
      toaserService.toast(`${values.name} Added.`);
    } catch (error) {
      toaserService.toast(error.message, "error");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValue}
        validationSchema={StockRecordSchema}
        onSubmit={(values) => {
          add(values);
        }}
        validateOnChange={false}
        validateOnBlur={true}
        enableReinitialize={true}
      >
        {({ values, handleSubmit, handleChange }) => (
          <>
            <Header title="Add Record" />
            <div className="flex flex-wrap p-3 -mx-3 ">
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
                disabled
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
            <Footer action={handleSubmit} actionButtonTitle={"Add"} />
          </>
        )}
      </Formik>
    </div>
  );
}

export default AddRecord;
