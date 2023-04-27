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
import { useParams } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const { token } = useParams();
// const [token, setToken] = useState("b'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImVsYmFoamEgY2hhcmFmZWRkaW5lIiwiZW1haWwiOiJlbGJhaGphY2hhcmFmZWRkaW5lMjAyMEBnbWFpbC5jb20ifQ.VGWPkmzmW1QS1Puj4NtGcLzz6anFgSuboNOBH1TM1eE'")


  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false)
  const [change, setChange] = useState(false)

  const [message, setMessage] = useState("")

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [newPassword, setNewPassword] = useState()

  const handleSubmit = () =>{
    let formData = new FormData()
    formData.append("token",token)
    formData.append("password",password)
    if(password == newPassword && password !="")
    {
        axios.post("http://localhost:8000/change-password",formData)
        .then((response) =>{
            console.log(response.data);
            if(response.data.success=="password changed with success"){
                setChange(true)
                setTimeout(() => {
                   navigate("/authentication/sign-in");
                  }, 2000);
            }
            else{
                setError(true)
            }
        })
    }
    else{
        setErrorMessage(true)
        setMessage("Veuillez entrer à nouveau votre mot de passe et confirmer que les deux champs sont identiques.")
    }
  }




  return (
    <CoverLayout
    //   title=""
    //   description="Login through github or enter your email and password to sign in"
      image={curved9}
    >
        {change ? 
            <div class="alert alert-success" role="alert">
            Votre mot de passe a été changé avec succès
            </div>
            :
            <></>
        }
        {error ? 
            <div class="alert alert-danger" role="alert">
            Il y a un problème réessayez !
            </div>
            :
            <></>
        }
        {errorMessage ?
            <div class="alert alert-danger" role="alert">
            {message}
            </div>
            :
            <></>
        }
          <SoftBox display="flex" flexDirection="column" alignItems="center" mb={2}>
            {/* <GithubSocial /> */}
          </SoftBox>
          {/* <Separator /> */}
          <SoftBox component="form" role="form">
            {/* <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Email
                </SoftTypography>
              </SoftBox>
              <SoftInput type="email" name="email" onChange={(e) =>{setEmail(e.target.value)}} placeholder="Email" />
            </SoftBox> */}
            
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                Nouveau mot de passe
                </SoftTypography>
              </SoftBox>
              <SoftInput type="password" name="password" onChange={(e) =>{setPassword(e.target.value)}}  placeholder="Nouveau mot de passe" />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Confirmez votre mot de passe
                </SoftTypography>
              </SoftBox>
              <SoftInput type="password" name="confirm_password" onChange={(e) =>{setNewPassword(e.target.value)}}  placeholder="Confirmez votre mot de passe" />
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
              Changer le mot de passe
              </SoftButton>
            </SoftBox>
          </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
