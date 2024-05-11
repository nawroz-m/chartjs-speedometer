"use client";
import Chart, { Legend, Tooltip, Plugin } from "chart.js/auto";
import { useEffect } from "react";

const chartData = {
  labels: ["red", "hhhhhh", "green", "yellow", "purple", "black"],

  datasets: [
    {
      label: "Weekly Sales",

      data: [20, 20, 20, 20, 20, 100],
      backgroundColor: [
        "#ff8888",
        "#FF5656",
        "#fee114",
        "#d1d80f",
        "#84bd32",
        "#3ad43",
      ],
      borderWidth: 0,

      cutout: "90%",
      needleValue: 50,
    },
  ],
};

const chartOptions = {
  aspectRatio: 1.8,
  layout: {
    padding: {
      top: 20,
    },
  },

  plugins: {
    // tooltip: {
    //   enabled: false,
    // },

    legend: {
      display: false,
    },
  },
};
let myChart: any;

const doughnutText = {
  id: "doughnutText",
  afterDraw(chart: any, args: any, options: any) {
    const { ctx } = chart;

    ctx.save();
    const activePoint = chart.tooltip?._active[0];
    const dataPoint = activePoint?.index;
    const datasetIndex = activePoint?.datasetIndex;

    const tooltipPositionX =
      chart.getDatasetMeta(datasetIndex).data[dataPoint]?.x;
    const tooltipPositionY =
      chart.getDatasetMeta(datasetIndex).data[dataPoint]?.y;
    const bcolor =
      chart.getDatasetMeta(datasetIndex)?._dataset?.backgroundColor[dataPoint];
    const bgcolor = "#ffffff";

    const textNumber =
      chart.getDatasetMeta(datasetIndex).data[dataPoint]?.$context?.raw;
    const lableText = `${chart.config._config.data.labels[dataPoint]} : ${textNumber}`;

    const textWidth = ctx.measureText(lableText).width;
    // chart.getDatasetMeta(datasetIndex)?.iScale?._labelItems[dataPoint].label

    // console.log(chart.getDatasetMeta(datasetIndex).data[dataPoint]);
    // chart.getDatasetMeta(datasetIndex).data[dataPoint]?.outerRadius
    // ctx.fillStyle = "red";

    // ctx.translate(0, 0);

    // ctx.rotate(Math.PI * 200);
    /// Drow connector line

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.moveTo(tooltipPositionX, tooltipPositionY);
    ctx.lineTo(tooltipPositionX, tooltipPositionY - 10);
    //Drow
    ctx.stroke();

    // Drow the square
    ctx.lineWidth = 1;
    ctx.strokeStyle = bcolor;
    ctx.fillStyle = bgcolor;
    ctx.fillRect(
      tooltipPositionX - textWidth / 2,
      tooltipPositionY - 10,
      textWidth + 50,
      -20
    );
    ctx.strokeRect(
      tooltipPositionX - textWidth / 2,
      tooltipPositionY - 10,
      textWidth + 50,
      -20
    );
    ctx.restore();

    // Drow text
    ctx.font = "bolder 12px Arial";
    ctx.fillStyle = "#666";
    ctx.textAlign = "center";
    ctx.moveTo(0, 0, 40);
    // ctx.translate(0, 2);

    // Rotate the Needle
    ctx.rotate(Math.PI * 90);

    ctx.fillText(lableText, tooltipPositionX, tooltipPositionY - 20);

    ctx.restore();
  },
  // afterDatasetsDraw(chart: any, args: any, plugins: any) {
  //   console.log({ chart });
  //   const {
  //     ctx,
  //     data,
  //     options,
  //     _active,
  //     // tooltip,

  //     chartArea: { top, bottom, left, right, width, height },
  //   } = chart;

  // const tooltipValue = chart.tooltip;
  // console.log(chart.);

  // save all varaible
  // ctx.save();

  // set text on hover
  // if (_active.length) {
  //   const datasetIndexValue = _active[0].index;
  //   console.log({ data }, datasetIndexValue);
  //   const dataLabel = data.labels[datasetIndexValue];
  //   ctx.fillText(dataLabel, 20, 20);
  //   console.log("===========", _active);
  // }

  // Drow text
  // ctx.font = "bold 30px sans-serif";
  // },
};

const DoughnutChart = () => {
  useEffect(() => {
    const ctx = document.getElementById("myDoughnutChart") as HTMLCanvasElement;
    if (ctx) {
      if (myChart) {
        myChart.destroy();
      }
      myChart = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: chartOptions,
        plugins: [doughnutText],
      });
    }
  }, [chartData, chartOptions]);

  return (
    <div
      style={{
        width: "400px",
        height: "260px",
        border: "1px solid orange",
        margin: "10% 0 10% 30%",
      }}
    >
      <canvas id="myDoughnutChart" />
    </div>
  );
};
export default DoughnutChart;
