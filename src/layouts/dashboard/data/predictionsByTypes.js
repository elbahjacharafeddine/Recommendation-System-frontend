import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

const predictionsByTypes = () => {
  const [chartData, setChartData] = useState({});

  const fetchChartData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/nbofPredictionsbyType");
      const data = await res.json();
      const labels = data.map((item) => item.type);
      const values = data.map((item) => item.count);
      setChartData({
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#D8BFD8",
              "#66CDAA",
              "#BA55D3",
              "#E6E6FA",
              "#FFD700",
              "#FFA07A",
              "#FFB6C1",
              "#C0C0C0",
              "#90EE90",
              "#CD5C5C",
              "#F0E68C",
              "#6495ED",
              "#FA8072",
              "#BDB76B",
              "#FF69B4",
              "#ADD8E6",
              "#7B68EE",
              "#00FFFF",
              "#FFE4C4",
              "#FFA500",
              "#1E90FF",
              "#8FBC8F",
              "#FFC0CB",
              "#9400D3",
              "#FF00FF",
              "#32CD32",
              "#F5DEB3",
              "#A0522D",
              "#FF4500",
              "#0000FF",
            ],
            options : {
                legend: {
                  display: true,
                  position: "right",
                  labels: {
                    fontSize: 4,
                    usePointStyle: true,
                  },
                },
              },
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return chartData;
};

export default predictionsByTypes;
