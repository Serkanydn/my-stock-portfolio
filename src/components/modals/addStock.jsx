"use client";
import React, { useEffect, useState } from "react";
import toaserService from "@/services/toaster";
import { useDispatch } from "react-redux";
import { addStock } from "@/store/portfolios";
const { v4: uuidv4 } = require("uuid");
import Header from "./components/header";
import Footer from "./components/footer";

import data from "@/stock.data.json";

import Input from "@/components/formElements/input";
import SelectBox from "@/components/formElements/selectBox";

import StockRecordSchema from "@/validations/stockRecordValidation";
import stockData from "@/stock.data.json";

import { getDate } from "@/utils/toolkit";
import { Formik } from "formik";
import localStorageService from "@/services/localStorageService";


function AddStock({ data: portfolioId, close }) {
  const dispatch = useDispatch();
  const initialValue = {
    name: "ACSEL",
  };
  const add = (values) => {
    try {
      const id = uuidv4();

      const stock = {
        portfolioId,
        id,
        totalCost: 0.00,
        totalPiece: 0.00,
        profitAndLoss: 0.00,
        averageCost: 0.00,
        records: [],
        ...values,
      };

      dispatch(addStock(stock));
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
        // validationSchema={StockRecordSchema}
        onSubmit={(values) => {
          add(values);
        }}
        validateOnChange={false}
        validateOnBlur={true}
        enableReinitialize={false}
      >
        {({ values, handleSubmit, handleChange }) => (
          <>
            <Header title="Add Stock" />
            <div className="flex flex-wrap p-3 -mx-3 ">
              <SelectBox
                data={stockData}
                title="İşlem"
                position="full"
                name="name"
                value={values.name}
                onChange={handleChange("name")}
              />
            </div>
            <Footer action={handleSubmit} actionButtonTitle={"Add"} />
          </>
        )}
      </Formik>
    </div>
  );
}

export default AddStock;
