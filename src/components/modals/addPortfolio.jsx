"use client";
import React, { useState } from "react";
import toaserService from "@/services/toaster";
import { useDispatch } from "react-redux";
import { addPortfolio } from "@/store/portfolios";
const { v4: uuidv4 } = require("uuid");
import Header from "./components/header";
import Footer from "./components/footer";
import Input from "@/components/formElements/input";

import PortfolioSchema from "@/validations/portfolioValidation";


import { Formik } from "formik";

function AddPortfolio({ data, close }) {
  const dispatch = useDispatch();

  const initialValue = {
    name: "eregl",
  };

  const add = (values) => {
    try {
      const id = uuidv4();
      const portfolio = { id, totalCost: 0, profitAndLoss: 0, stocks: [], ...values };
      dispatch(addPortfolio(portfolio));
      toaserService.toast(`${values.name} Added.`);
      close();
    } catch (error) {
      toaserService.toast(error.message, "error");
    }
  };
  return (
    <div>
      <Formik
        initialValues={initialValue}
        validationSchema={PortfolioSchema}
        onSubmit={(values) => {
          add(values);
        }}
        validateOnChange={false}
        validateOnBlur={true}
        enableReinitialize={true}
      >
        {({ values, handleSubmit, handleChange }) => (
          <>
            <Header title="Add Portfolio" />
            <div className="w-full px-3 py-5 ">
              <div className="grid mb-6 -mx-3 grid-col-2">
                <Input
                  name="name"
                  value={values.name}
                  title="Add Portfolio"
                  onChange={handleChange("name")}
                />
              </div>
            </div>
            <Footer action={handleSubmit} actionButtonTitle={"Add"} />
          </>
        )}
      </Formik>
    </div>
  );
}

export default AddPortfolio;
