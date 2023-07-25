import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ title, datasets, labels, options, ...props }) {
  return (
    <div className="w-96  ">
      <Doughnut data={{ labels, datasets }} />
    </div>
  );
}

export default DoughnutChart;
