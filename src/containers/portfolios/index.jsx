"use client";
import React from "react";
import { useSelector } from "react-redux";

import PortfolioCard from "@/components/portfolioCard";

import Tab from "@/components/tab";

function Home() {
  const { data: portfolios } = useSelector((state) => state.portfolios);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-5 ">
        {portfolios.map((portfolio, index) => (
          <PortfolioCard key={index} portfolio={portfolio} />
        ))}
      </div>
    </>
  );
}

export default Home;
