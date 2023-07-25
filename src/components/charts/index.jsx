import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import * as Charts from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ type, datasets, labels, options, ...props }) {
  const el = Charts[type];
  console.log("Charts[type]", Charts[type]);
  return (
    <div className="bg-red-100 w-96">
      <h1>Total Cost </h1>
      <el data={{ labels, datasets }} />
    </div>
  );
}

export default Chart;
