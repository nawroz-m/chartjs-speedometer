"use client";
import Chart from "chart.js/auto";
import { useEffect } from "react";

const chartData = {
  labels: ["#ff8888", "#FF5656", "#fee114", "#d1d80f", "#84bd32", "#3ad43"],
  datasets: [
    {
      label: "# of Votes",
      data: [20, 100, 20, 20, 20, 20],
      borderWidth: 9,
      circumference: 180,
      rotation: 270,
      cutout: "92%",
      needleValue: 50,
    },
  ],
};

const chartOptions = {
  aspectRatio: 1.8,

  events: [],
  plugins: {
    tooltip: {
      enabled: false,
    },

    legend: {
      display: false,
    },
  },
};
let myChart: any;

const gaugeNeedle = {
  id: "gaugeNeedle",
  afterDatasetsDraw(chart: any, args: any, plugins: any) {
    const { ctx, data } = chart;
    // Save all varaible
    ctx.save();

    const getDatasetMetaData = chart.getDatasetMeta(0).data[0];
    const xCenter = getDatasetMetaData.x;
    const yCenter = getDatasetMetaData.y;
    const outerRadius = getDatasetMetaData.outerRadius - 30;

    // crate angle
    const angle = Math.PI;

    // Position the needle ---> zero in the call back is the starting point of needle
    const dataTotal = data.datasets[0].data.reduce(
      (a: any, b: any) => a + b,
      0
    );
    // Needle value
    const needleValue = data.datasets[0].needleValue;
    // Calculate Needle value
    let circumference =
      (getDatasetMetaData.circumference / angle / data.datasets[0].data[0]) *
      needleValue;

    const needleValueAngle = circumference + 1.5;
    // Scale the needle to start from 0 Position
    ctx.translate(xCenter, yCenter);

    // Rotate the Needle
    ctx.rotate(angle * needleValueAngle);

    // Style the shape
    ctx.strokeStyle = "#323232";
    ctx.fillStyle = "#323232";
    // Needle Position
    ctx.beginPath();
    // Move Needle to the center
    ctx.moveTo(0 - 8, -20);
    // Create the Needle item
    ctx.lineTo(0, -outerRadius);
    ctx.lineTo(0 + 8, -20);
    //Drow the shape
    ctx.stroke();
    ctx.fill();

    // Create dot
    ctx.beginPath();
    // Create arc for dot
    ctx.arc(0, 0, 12, angle * 0, angle * 2, false);

    // Fill up the dot
    ctx.fill();

    // Rstore the chart to
    ctx.restore();
  },
};
const CustomChart = () => {
  useEffect(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    if (ctx) {
      if (myChart) {
        myChart.destroy();
      }
      myChart = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: chartOptions,
        plugins: [gaugeNeedle],
      });
    }
  }, [chartData, chartOptions]);

  return (
    <div
      style={{
        width: "400px",
        height: "260px",
        border: "1px solid orange",
        margin: "10% auto",
      }}
    >
      <canvas id="myChart" />
    </div>
  );
};
export default CustomChart;
