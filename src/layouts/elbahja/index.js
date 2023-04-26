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
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { useEffect,useState } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import axios from "axios";


function Overview() {
 
    
  // const [test,setTest] = useState("")
  const [nom,setNom]= useState("")
  const [prenom,setPreNom]= useState("")
  const [email,setEmail]= useState("")
  const [addresse,setAddresse]= useState("")
  const [naissance, setNaissance]= useState("")
  const [telephone, setTelephone]= useState("0663153919")

  const handleSubmit = () =>{
     // Récupérer une valeur à partir de localStorage
     const myValue = localStorage.getItem('user');
     // console.log(myValue);
     // if(myValue != null){
     // Afficher la valeur récupérée
     const jsonObj = JSON.parse(myValue);
 
     if(myValue != null){
        setToken(jsonObj.token)
        setEmail(jsonObj.email)
     }
     let formData = new FormData()
     formData.append('firstName', prenom)
     formData.append("lastName",nom)
     formData.append("address",addresse)
     formData.append("date_naissance",naissance)
     formData.append("telephone",telephone)
     formData.append("email",email)
    //  console.log(formData);
     axios.post("http://localhost:8000/edit-profile",formData)
     .then((response) =>{
      if(response.status==200){
        setPreNom(response.data["firstName"]);
        setNom(response.data["lastName"])
        setAddresse(response.data["address"])
        setTelephone(response.data["telephone"])
        setNaissance(response.data["dateNaissance"])
        setEmail(response.data["email"])

        // toast.success('votre profile a été modifié avec succès !', {
        //   position: toast.POSITION.BOTTOM_RIGHT
        // });
        alert('votre profile a été modifié avec succès !')
      }
      else{
        console.log("Bad Request");
      }
     })
    
  }

  const [token, setToken] = useState()




  useEffect(() => {

    // Récupérer une valeur à partir de localStorage
    const myValue = localStorage.getItem('user');
    // console.log(myValue);
    // if(myValue != null){
    // Afficher la valeur récupérée
    const jsonObj = JSON.parse(myValue);

    if(myValue != null){
      setToken(jsonObj.token)
      setEmail(jsonObj.email)
   }
   let formData = new FormData()
   formData.append("email",jsonObj.email)
   axios.post("http://localhost:8000/user-profile",formData)
   .then((response) =>{
    if(response.status ==200){
      setEmail(response.data.success['email'])
      setAddresse(response.data.success['address'])
      setTelephone(response.data.success['telephone'])
      setNaissance(response.data.success['naissance'])
      setNom(response.data.success['lastName'])
      setPreNom(response.data.success['firstName'])
    }
   })

}, []);





  return (

      <DashboardLayout>
        <Header/>
        <div class="container-xl px-4 mt-4">
    {/* <!-- Account page navigation--> */}

    <hr class="mt-0 mb-4"/>
    <div class="row">
        <div class="col-xl-4">
            {/* <!-- Profile picture card--> */}
            <div class="card mb-4 mb-xl-0">
                <div class="card-header">Image de profile</div>
                <div class="card-body text-center">
                    {/* <!-- Profile picture image--> */}
                    <img class="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                    {/* <!-- Profile picture help block--> */}
                    {/* <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div> */}
                    {/* <!-- Profile picture upload button--> */}
                    <button class="btn btn-primary" type="button">Charger une nouvelle image</button>
                </div>
            </div>
        </div>
        <div class="col-xl-8">
            {/* <!-- Account details card--> */}
            <div class="card mb-4">
                <div class="card-header">Détails du compte</div>
                <div class="card-body">
                    {/* <form> */}
                        {/* <!-- Form Row--> */}
                        <div class="row gx-3 mb-3">
                            {/* <!-- Form Group (first name)--> */}
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputFirstName">Nom </label>
                                <input class="form-control" id="inputFirstName" type="text" placeholder="Entrez votre nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                            </div>
                            {/* <!-- Form Group (last name)--> */}
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputLastName">Prénom </label>
                                <input class="form-control" id="inputLastName" type="text" placeholder="Entrez votre prénom" value={prenom} onChange={(e) => setPreNom(e.target.value)}/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="small mb-1" for="inputEmailAddress">Email </label>
                            <input class="form-control" id="inputEmailAddress" type="email" placeholder="Entrez votre email" value={email} readOnly />
                        </div>
                        <div class="mb-3">
                                <label class="small mb-1" for="inputLocation">Addresse</label>
                                <input class="form-control" id="inputLocation" type="text" placeholder="Entrez votre addresse" value={addresse} onChange={(e) => setAddresse(e.target.value)}/>
                        </div>
                        <div class="row gx-3 mb-3">
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputPhone">Téléphone</label>
                                <input class="form-control" id="inputPhone" type="tel" placeholder="Entrez votre téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)}/>
                            </div>
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputBirthday">Date de naissance</label>
                                <input class="form-control" id="inputBirthday" type="date" name="birthday" placeholder="Entrez votre date de naissance" value={naissance} onChange={(e) => setNaissance(e.target.value)} />
                            </div>
                        </div>
                        <button class="btn btn-primary" type="button" onClick={handleSubmit}>Enregistrer</button>
                    {/* </form> */}
                </div>
            </div>
        </div>
    </div>
</div>
    <Footer/>
      </DashboardLayout>
  );
}

export default Overview;
