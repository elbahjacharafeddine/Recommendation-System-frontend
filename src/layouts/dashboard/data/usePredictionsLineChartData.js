import { useState, useEffect } from 'react';

function usePredictionsLineChartData() {
  const [precisions, setPrecisions] = useState([]);

  useEffect(() => {
    async function fetchPrecisions() {
      const response = await fetch('http://127.0.0.1:8000/api/predictionsbymonth/');
      const data = await response.json();
      console.log("hhhhh");
      console.log(data.precisions_par_mois);
      setPrecisions(data.precisions_par_mois);
    }
    fetchPrecisions();
  }, []);

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Precision",
        color: "info",
        data: precisions,
      }
    ],
  };

  return lineChartData;
}

export default usePredictionsLineChartData;