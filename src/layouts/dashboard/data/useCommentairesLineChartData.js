import { useState, useEffect } from 'react';

function useCommentairesLineChartData() {
  const [commentaires, setCommentaires] = useState([]);

  useEffect(() => {
    async function fetchCommentaires() {
      const response = await fetch('http://127.0.0.1:8000/api/commentarybymonth/');
      const data = await response.json();
      console.log("hhhhh");
      console.log(data.commentaires_par_mois);
      setCommentaires(data.commentaires_par_mois);
    }
    fetchCommentaires();
  }, []);

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Commentaire",
        color: "red",
        data: commentaires,
        type: "bar",
      }
    ],
  };


  return lineChartData;
}

export default useCommentairesLineChartData;