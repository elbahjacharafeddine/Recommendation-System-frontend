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

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { useEffect, useState } from "react";
import axios from "axios";

function Billing() {
  const invoicesData = [
    { id: 1, date: '2022-03-15', amount: 100.0 },
    { id: 2, date: '2022-03-20', amount: 200.0 },
    { id: 3, date: '2022-03-25', amount: 300.0 },
  ];
  const [responseData, setResponseData] = useState()
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   // Récupérer une valeur à partir de localStorage
  //   const myValue = localStorage.getItem('user');
  //   // Afficher la valeur récupérée
  //   const jsonObj = JSON.parse(myValue);
  //   // console.log(jsonObj.token);
  //   setToken(jsonObj.token)
  //   submitData()
  // });

  // const submitData= async() => {
  //   let formData = new FormData()
  //   formData.append("token", token)
  //   axios.post("http://localhost:8000/prediction-user",formData)
  //   .then((response) =>{
  //     setResponseData(response.data.predictions);
  //   })

  //   // const fetchData = async () => {
  //   //   const response = await axios.post("http://localhost:8000/prediction-user",formData)
  //   //   .then((response) =>{
  //   //     console.log(response.data);
  //   //     setResponseData(response.data.predictions);
  //   //   })
  //   // };

  //   // fetchData();
  // }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  {/* <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" /> */}
                </Grid>
                {/* <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices invoices={responseData}/>
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              {/* <BillingInformation /> */}
            </Grid>
            <Grid item xs={12} md={5}>
              {/* <Transactions /> */}
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
