"use client";
import React from "react";
import PieChart from "@/components/charts/pieChart";
import DoughnutChart from "@/components/charts/doughnutChart";
import { useSelector } from "react-redux";

function Dashboard() {
  const { data: portfolios } = useSelector((state) => state.portfolios);
  const labels = portfolios.map((portfolio) => portfolio.name);
  function getRandomColor(count = 1) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.push(color);
    }

    return colors.length === 1 ? colors[0] : colors;
  }

  const costDatasets = [
    {
      label: "Maliyet",
      data: portfolios.map((portfolio) => portfolio.totalCost),
      backgroundColor: getRandomColor(portfolios.length),
      hoverOffset: 10,
      borderDashOffset: 10,
    },
  ];
  const profitDatasets = [
    {
      label: "Kar / Zarar",
      data: portfolios.map((portfolio) => portfolio.profitAndLoss),
      backgroundColor: getRandomColor(portfolios.length),
      hoverOffset: 10,
      borderDashOffset: 10,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 ">
      <div className="p-5 border rounded-md shadow ">
        <div class="flex items-center justify-between mb-5">
          <h4 className="text-xl font-semibold">{`Portfolyoların Toplam Maliyeti 
 : ${portfolios.reduce((acc, portfolio) => acc + portfolio.totalCost, 0).toFixed(2)}`}</h4>

        </div>
        <div className="inline-flex flex-col items-center justify-center w-full">
          <DoughnutChart labels={labels} datasets={costDatasets} />
        </div>
      </div>
      <div className="p-5 border rounded-md shadow ">
        <div class="flex items-center justify-between mb-5">
          <h4 className="text-xl font-semibold">{`Portfolyoların Toplam Kar / Zararı
          : ${portfolios.reduce((acc, portfolio) => acc + portfolio.profitAndLoss, 0).toFixed(2)}`}</h4>

        </div>
        <div className="inline-flex items-center justify-center w-full">
          <DoughnutChart labels={labels} datasets={profitDatasets} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

/*

"use client";
import React from "react";
import Chart from "@/components/chart";
import { useSelector } from "react-redux";

function Dashboard() {

  console.log("portfolios", portfolios);
  const labels = portfolios.map((portfolio) => portfolio.name);
  const datasets = [
    {
      label: "Portfolio Name",
      data: portfolios.map((portfolio) => portfolio.totalCost),
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
      hoverOffset: 10,
      borderDashOffset: 10,
    },
  ];

  console.log("labels", labels);
  console.log("datasets", datasets);

  return (
    <div className="bg-red-100 ">
      <Chart type="pie" labels={labels} datasets={datasets} />
    </div>
  );
}

export default Dashboard;


*/
