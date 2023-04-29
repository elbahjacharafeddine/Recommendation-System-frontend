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
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftPagination from "components/SoftPagination";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { Close } from '@mui/icons-material';
import IconButton from '@material-ui/core/IconButton';
// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import UsersTable from "layouts/tables/data/UsersTable";
import projectsTableData from "layouts/tables/data/projectsTableData";
import React, { useState, useEffect } from "react";
import { Padding } from "@mui/icons-material";
import { Modal } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Checkbox from "@mui/material/Checkbox";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import GithubSocial from "layouts/authentication/components/Socials/github";
import Separator from "layouts/authentication/components/Separator";
import SoftButton from "components/SoftButton";
import AuthApi from "../../api/auth";
import { useAuth } from "auth-context/auth.context";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

// import AuthApi from "../../../api/auth";

// import { useAuth } from "auth-context/auth.context";
function Tables() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedRole, setSelectedRole] = useState("");
  // const [is_superuser, setRole] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleRegister = () => {
    setIsModalOpen(true);
  };

  const [agreement, setAgremment] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [open, setOpen] = React.useState(false);

  const { user } = useAuth();

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const showError = (message) => {
    setError(message);
    setIsErrorVisible(true);
    setTimeout(() => {
      setError("");
      setIsErrorVisible(false);
    }, 2000);
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(user);
  //   AuthApi.Register(formData)
  //     .then((response) => {
  //       if (response.data.success) {
  //         console.log("registration made with success");
  //         setIsModalOpen(false);
  //         navigate("/utilisateurs");
  //         window.location.reload();
          
  //       } else {
  //         showError("Une erreur s'est produite.Veuillez vérifier vos entrées");
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         return showError("Une erreur s'est produite.Veuillez vérifier vos entrées");
  //       }
  //       return showError("Une erreur s'est produite.Veuillez vérifier vos entrées");
  //     });
      
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    AuthApi.Register({ ...formData})
      .then((response) => {
        if (response.data.success) {
          console.log("registration made with success");
          setIsModalOpen(false);
          navigate("/utilisateurs");
          console.log(user);
          window.location.reload();
        } else {
          showError("Une erreur s'est produite.Veuillez vérifier vos entrées");
        }
      })
      .catch((error) => {
        if (error.response) {
          return showError("Une erreur s'est produite.Veuillez vérifier vos entrées");
        }
        return showError("Une erreur s'est produite.Veuillez vérifier vos entrées");
      });
  };








  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
      <button type="submit" class="btn btn-primary" style={{paddingLeft: "15px",marginBottom:"10px"}} onClick={() => handleRegister()}>Nouveau utilisateur</button>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Tableau des utilisateurs
              </SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              
            </SoftBox>
            <UsersTable />
            
          </Card>
        </SoftBox>
        
      </SoftBox>
      {isModalOpen && (
            <Modal open={isModalOpen} onClose={handleClose}>
              <div className="container my-4" style={{  padding: "20px",maxWidth: "600px" }}>
                <Card>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-5px" }}>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </div>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Ajouter un nouveau utilisateur
            </SoftTypography>
          </SoftBox>
         
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form">
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  name="username"
                  placeholder="Nom"
                  onChange={handleFormData}
                
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="email"
                  name="email"
                  onChange={handleFormData}
                  placeholder="Email"
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  name="password"
                  onChange={handleFormData}
                  placeholder="Password"
                />
              </SoftBox>
             
            <center><SoftBox mb={2}>
              <select name="is_superuser" onChange={handleFormData} style={{ 
                padding: "8px", 
                fontSize: "1rem",
                border: "1px solid #87CEEB",
                borderRadius: "4px",
                backgroundColor: "#f7f7f7",
                backgroundImage: "linear-gradient(to bottom, #87CEEB, #f7f7f7)"
              }}>
                <option value="">-- Sélectionner le role--</option>
                <option value="1">Admin</option>
                <option value="0">Utilisateur normal</option>
              </select>
            </SoftBox></center>

            
              <SoftBox mt={4}  mb={2} textAlign="center">
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
                <SoftButton variant="gradient" color="dark"  onClick={handleSubmit} fullWidth>
                  <span style={{color: "white"}}>Enregistrer</span>
                </SoftButton>
              </SoftBox>
              
            </SoftBox>
          </SoftBox>
        </Card>
              </div>

            </Modal>
          )}
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
