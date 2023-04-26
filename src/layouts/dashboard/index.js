/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import PieChart from "examples/Charts/PieChart";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import usePredictionsLineChartData from './data/usePredictionsLineChartData';
import useCommentairesLineChartData from "./data/useCommentairesLineChartData";
import useUsersLineChartData from "./data/useUsersLineChartData";
import predictionsByTypes from "./data/predictionsByTypes";
import { useState, useEffect } from 'react';
import { Pie } from "react-chartjs-2";
function Dashboard() {
  const { size } = typography;
  // const { chart, items } = reportsBarChartData;
  const usersLineChartData =useUsersLineChartData();
  const { chart, items } = usersLineChartData;
  const predictionsLineChartData = usePredictionsLineChartData();
  const commentairesLineChartData = useCommentairesLineChartData();
  const usepredictionsByTypes=predictionsByTypes();
  const [todayusersnumber, setUsersNumber] = useState("");
  const [todaycommentarynumber, setCommentariesNumber] = useState("");
  const [todaypredictionsnumber, setPredictionsNumber] = useState("");


  useEffect(() => {
    async function fetchData() {
      const response1 = await fetch('http://127.0.0.1:8000/api/nbofTodaysUsers/');
      const response2 = await fetch('http://127.0.0.1:8000/api/nbofTodaysCommentaries/');
      const response3 = await fetch('http://127.0.0.1:8000/api/nbofTodaysPredictions/');
      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();

      console.log("hhhhh");
      setUsersNumber(data1.number_of_todays_users);
      setCommentariesNumber(data2.number_of_todays_commentaires);
      setPredictionsNumber(data3.number_of_todays_predictions);
    }
    fetchData();
  }, []);


  useEffect(() => {

    // Récupérer une valeur à partir de localStorage
    const myValue = localStorage.getItem('user');
    // console.log(myValue);
    // if(myValue != null){
    // Afficher la valeur récupérée
    const jsonObj = JSON.parse(myValue);

    if(myValue != null){
      console.log("Side Nav Bar");
      console.log(jsonObj.username);
      console.log(jsonObj.role);
      console.log(jsonObj.token)
      console.log("Side Nav Bar");
      // setTest("Hello Ensaj")
      if(jsonObj.role == false){
        // setRolle("admin")
        // navigate("/profile-test");
        window.location.href = "/profile";
      }
      else {
        // setRolle("user")
      }
    }

}, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "les utilisateurs d'aujourd'hui" }}
                count={todayusersnumber}
                percentage={{ color: "success", text: `+${((parseInt(todayusersnumber) / parseInt(items[0].progress.content)) * 100).toFixed(2)}%` }}
                icon={{ color: "info", component: "people" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "les commentaires d'aujourd'hui" }}
                count={todaycommentarynumber}
                percentage={{ color: "success", text: `+${((parseInt(todaycommentarynumber) / parseInt(items[2].progress.content)) * 100).toFixed(2)}%` }}
                icon={{ color: "info", component: "comment" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "les predictions d'aujourd'hui" }}
                count={todaypredictionsnumber}
                percentage={{ color: "success", text: `+${((parseInt(todaypredictionsnumber) / parseInt(items[1].progress.content)) * 100).toFixed(2)}%` }}
                icon={{ color: "info", component: "multiline_chart" }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid> */}
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Predictions Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2023
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={predictionsLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            {/* <Projects /> */}
            <GradientLineChart
                title="Nombre de commmentaire par mois"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2023
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={commentairesLineChartData}
              />
          </Grid>
          <Grid item xs={14} md={5} lg={5}>
            <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "1rem", }}>
              <h6>Nombre des predictions par type</h6>
            <Pie data={usepredictionsByTypes} />
            </div>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
