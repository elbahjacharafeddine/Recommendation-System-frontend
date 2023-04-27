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

import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import GithubSocial from "layouts/authentication/components/Socials/github";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
// import curved9 from "assets/images/curved-images/bg.jpg";

import AuthApi from "../../../api/auth";
import { useAuth } from "../../../auth-context/auth.context";
import { API_SERVER } from "config/constant";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();


  const [error, setError] = useState(false);
  const [errorConnection, setErrorConnection] = useState(false)
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false)


  const [email, setEmail] = useState()


  const handleSubmit = () =>{
    let formData = new FormData()
    formData.append("email",email)
    axios.post("http://localhost:8000/rest-password",formData)
    .then((response) =>{
      console.log(response.data.success);
      if(response.status==200){
        if(response.data.success =="good"){
        setSuccess(true)
        setIsLoading(true)
      }
      else if(response.data.success =="error"){
        setError(true)
        setIsLoading(true)
      }
      else if(response.data.success =="error connection"){
        setErrorConnection(true)
        setIsLoading(true)
      }
      else{
        setNotFound(true)
        setIsLoading(true)
      }
    }
    })
  }




  return (
    <CoverLayout
    //   title=""
    //   description="Login through github or enter your email and password to sign in"
      image={curved9}
    >
      {isLoading && error ?  
              <div class="alert alert-danger" role="alert">
              Nous avons déjà envoyé un lien de réinitialisation de mot de passe par e-mail ! (Vérifier Spam)
            </div>
      : 
        <></>
      }
            {isLoading && errorConnection ?  
              <div class="alert alert-danger" role="alert">
             Problème de connexion Vérifiez la qualité de votre connexion Internet !
            </div>
      : 
        <></>
      }
      {isLoading && success ? 
              <div class="alert alert-success" role="alert">
              Nous avons envoyé un lien de réinitialisation de mot de passe par e-mail ! (Vérifier Spam)
            </div>
        :
      <></>  

      }

{isLoading && notFound ?  
              <div class="alert alert-danger" role="alert">
              Aucun compte trouvé avec cet e-mail. Veuillez vérifier vos informations.
            </div>
      : 
        <></>
      }
          <SoftBox display="flex" flexDirection="column" alignItems="center" mb={2}>
            {/* <GithubSocial /> */}
          </SoftBox>
          {/* <Separator /> */}
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Email
                </SoftTypography>
              </SoftBox>
              <SoftInput type="email" name="email" onChange={(e) =>{setEmail(e.target.value)}} placeholder="Email" />
            </SoftBox>

            <SoftBox display="flex" alignItems="center">
            </SoftBox>
            <SoftBox mt={2} mb={2} textAlign="center">
              <h6
                style={{
                  fontSize: ".8em",
                  color: "red",
                  textAlign: "center",
                  fontWeight: 400,
                  transition: ".2s all",
                }}
              >
                {error}
              </h6>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
              récupérer votre mot de passe
              </SoftButton>
            </SoftBox>
          </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
