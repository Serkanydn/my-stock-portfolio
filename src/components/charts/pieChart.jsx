import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ title, datasets, labels, options, ...props }) {
  return (
    <div className="w-96  ">
      <Pie data={{ labels, datasets }} />
    </div>
  );
}

export default PieChart;
