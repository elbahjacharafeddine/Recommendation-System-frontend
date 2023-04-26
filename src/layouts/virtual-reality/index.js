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
import Card from "@mui/material/Card";
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/shapes/deeplearning.jpeg";

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
// import usePredictionsLineChartData from './data/usePredictionsLineChartData';
// import useCommentairesLineChartData from "./data/useCommentairesLineChartData";
// import useUsersLineChartData from "./data/useUsersLineChartData";
// import predictionsByTypes from "./data/predictionsByTypes";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./style.css";
import videoBack from "../../assets/images/curved-images/back-ground.mp4"
function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div class="bloc"style={{ position: "relative" }}>
      <video
        autoPlay
        loop
        muted
        // style={{
        //   position: "fixed",
        //   width: "100%",
        //   height: "100%",
        //   objectFit: "cover",
        //   zIndex: "-1",
        // }}
      >

        <source
          src={videoBack}
          type="video/mp4"
        />
        
      </video>
      <div className="content">
    <h1
      className="text-center"
      style={{
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "#fff",
        textShadow: "2px 2px #000",
      }}
    >
      Application de détection des maladies des plantes
    </h1>
    <p
      style={{
        fontSize: "1.2rem",
        lineHeight: "1.5",
        color: "#fff",
        textShadow: "1px 1px #000",
      }}
    >
      Cette application utilise l'intelligence artificielle pour détecter les maladies des plantes à partir d'images de feuilles.
    </p>
    <p
      style={{
        fontSize: "1.2rem",
        lineHeight: "1.5",
        color: "#fff",
        textShadow: "1px 1px #000",
      }}
    >
      Elle peut aider les agriculteurs à diagnostiquer rapidement les maladies des plantes et à prendre des mesures préventives pour éviter la propagation de la maladie.
    </p>
    <p
      style={{
        fontSize: "1.2rem",
        lineHeight: "1.5",
        color: "#fff",
        textShadow: "1px 1px #000",
      }}
    >
      Essayez-la dès maintenant pour voir comment elle peut améliorer votre production agricole.
    </p>
      </div>
    </div>
    
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
