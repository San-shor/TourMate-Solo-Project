import "./home.css";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

const AdminHome = () => {
  const [data, setData] = useState([]);

  const fetchdata = () => {
    fetch("http://localhost:4000/get-overal-data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const tipssChartDAta = {
    labels: data.trips ? data.trips.map((item) => item.placeName) : [],
    datasets: [
      {
        data: data.trips ? data.trips.map((item) => item.bookingCount) : [],
        backgroundColor: data.trips
          ? data.trips.map((_) => generateRandomColor())
          : [],
      },
    ],
  };
  const chartDataForRequestedTips = {
    labels: data.requestedTips ? data.requestedTips.map((tip) => tip._id) : [],
    datasets: [
      {
        label: "Total Requested Seats",
        data: data.requestedTips
          ? data.requestedTips.map((tip) => tip.toatlRequestedSeats)
          : [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Count",
        data: data.requestedTips
          ? data.requestedTips.map((tip) => tip.toalCount)
          : [],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const requestedTipsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="p-5">
      <div className="flex flex-col justify-center items-center ">
        <h2 className="w-full text-left font-bold text-lg">
          Trips Booked overview
        </h2>
        <div className="chart-container w-96">
          <Pie id="pie-chart" data={tipssChartDAta} />;
        </div>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <h2 className="w-full text-left  font-bold text-lg">
          Requested Trips overview
        </h2>
        <div className="w-2/3 h-96">
          <Bar
            id="bar-chart"
            data={chartDataForRequestedTips}
            options={requestedTipsOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
