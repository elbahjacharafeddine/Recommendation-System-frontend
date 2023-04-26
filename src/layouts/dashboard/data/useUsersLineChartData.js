import { useState, useEffect } from 'react';

function useUsersLineChartData() {
  const [users, setUsers] = useState([]);
  const [usersnumber, setUsersNumber] = useState("");
  const [commentarynumber, setCommentariesNumber] = useState("");
  const [predictionsnumber, setPredictionsNumber] = useState("");


  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('http://127.0.0.1:8000/api/usersbymonth/');
      const response1 = await fetch('http://127.0.0.1:8000/api/nbofusers/');
      const response2 = await fetch('http://127.0.0.1:8000/api/nbofcommentary/');
      const response3 = await fetch('http://127.0.0.1:8000/api/nbofpredictions/');
      const data = await response.json();
      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();

      console.log("hhhhh");
      console.log(data.users_par_mois);
      setUsers(data.users_par_mois);
      setUsersNumber(data1.number_of_users);
      setCommentariesNumber(data2.number_of_commentaires);
      setPredictionsNumber(data3.number_of_predictions);
    }
    fetchUsers();
  }, []);

//   const lineChartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//     datasets: [
//       {
//         label: "Commentaire",
//         color: "red",
//         data: users,
//         type: "bar",
//       }
//     ],
//   };

  const lineChartData = {
    chart: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: { label: "Number of users", data: users },
    },
    items: [
      {
        icon: { color: "primary", component: "library_books" },
        label: "users",
        progress: { content: usersnumber, percentage: parseInt(usersnumber)/0.1 },
      },
      {
        icon: { color: "info", component: "touch_app" },
        label: "predictions",
        progress: { content: predictionsnumber, percentage: parseInt(predictionsnumber)/0.1 },
      },
      {
        icon: { color: "warning", component: "payment" },
        label: "commentaires",
        progress: { content: commentarynumber, percentage: parseInt(commentarynumber)/0.1 },
      },
    ],
  };
  


  return lineChartData;
}

export default useUsersLineChartData;