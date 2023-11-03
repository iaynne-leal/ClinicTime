import Chart from "chart.js/auto";
import React from "react";

function CustomChart({ config, id="myChart" }) {
  const ctx = document.getElementById(id);
  const myChart = new Chart(ctx, config);
  return (
    <div>
      <canvas id={id}></canvas>
    </div>
  );
}