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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { FormControl,Box, CircularProgress , InputLabel, Select, MenuItem} from "@mui/material";
import axios from "axios";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import ListGroup from 'react-bootstrap/ListGroup';

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";
import { useState, useEffect } from "react";
import { DropzoneArea } from 'material-ui-dropzone';
import './style.css'

import { Button, Modal } from 'react-bootstrap';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import Modal from 'react-modal';

function PaymentMethod() {

  const { borderWidth, borderColor } = borders;

  const [bottomModal, setBottomModal] = useState(false);

  const toggleShow = () => setBottomModal(!bottomModal);

  const [image, setImage] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [clickButton, setClickButton] = useState(false)

  const handleChange = (event) => {
    // Get the selected options from the event object
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    // Update the state with the selected values
    setSelectedValues(selectedOptions);
    setValide(true)
  };


  const [selectedOption, setSelectedOption] = useState([]);
  const [valide, setValide] = useState(false)
  const [isOpen,setIsOpen] =useState(false)

  const [loading, setLoading] =useState(false)
  const [classe,setClasse] = useState("")
  const [confidence, setConfidence]= useState("")
  const [errorReponse, setErrorResponse] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    setClickButton(true)
    setLoading(true)

    const formData = new FormData();
    formData.append('image', image);
    formData.append('type',selectedValues)
    formData.append('token',token)
    axios.post('http://127.0.0.1:8000/upload', formData)
      .then((response) => {
        // handle response
        // console.log(response.data.class);
        // setClasse(response.data.class)
        // setConfidence(response.data.confidence)
        // setLoading(false)
        // setIsVisiblePrediction(false)
        // setIsVisibleClear(true)

        // console.log(response.data.error);
        // setErrorResponse(response.data.error)
        console.log(response.data);
        

        if(response.data.class!=undefined){
          console.log(response.data.class);
          setClasse(response.data.class)
          setConfidence(response.data.confidence)
          setLoading(false)
          setIsVisiblePrediction(false)
          setIsVisibleClear(true)
        //   setErrorResponse(response.data.error)
        }
        else{
          console.log(response.data.error);
          setErrorResponse(response.data.error)
          
          setLoading(false)
          setIsVisiblePrediction(false)
          setIsVisibleClear(true)
        }
        
      })
      .catch((error) => {
        // handle error
      });
  }

  const [comment, setComment] = useState("")
  const handleChangeComment = (e) =>{
    setComment(e.target.value)
  }
  
  const handleSendComment = (e) =>{
    e.preventDefault()
    const formData = new FormData();
    formData.append('content',comment);
    formData.append('token',token)
    axios.post('http://127.0.0.1:8000/save-commentaire',formData)
    .then((response) =>{
      console.log(response.data);
      setShowModal(false)
      toast.success('votre commentaire a été envoyé avec succès !', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    })
    .catch((error) =>{
      console.log(error);
      toast.error('Il y a eu un problème lors de l\'envoi de votre commentaire, veuillez réessayer plus tard', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    })
  }

  const [preview, setPreview ] =useState()

  const handleFileChange = async(e) => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };

    setIsVisibleClear(false)
    setIsVisiblePrediction(true)
  }

  const handleClear = (event) =>{
    setPreview("")
    setClickButton(false)
    setErrorResponse("")
  }

  
  const [isVisiblePrediction, setIsVisiblePrediction] = useState(true);
  const [isVisibleClear, setIsVisibleClear] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Récupérer une valeur à partir de localStorage
    const myValue = localStorage.getItem('user');
    // Afficher la valeur récupérée
    const jsonObj = JSON.parse(myValue);
    // console.log(jsonObj.token);
    setToken(jsonObj.token)
  });


  const [isChecked, setIsChecked] = useState(false);


  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setIsChecked(false)
  }
  const handleShow = () =>{
     setShowModal(true);
     setIsChecked(true)
  }


  return (
    <>
<Card id="delete-account">
          <div className="form-group" style={{ marginTop: 10}}>
            <select  className="form-control select2 select2-hidden-accessible"  tabindex="-1" aria-hidden="true"  onChange={handleChange}>
                <option selected="selected" disabled>Selectionnez le type de votre image</option>
                <option value="potatoes">pomme de terre</option>
                <option value="tomatoes">tomate</option>
                <option value="apple">pomme</option>
            </select> 
          </div>

      {image && (
        <Box mb={2} style={{ marginTop: 10}}>
          <img src={preview} alt="uploaded" width="100%" height="500px" style={{ borderRadius: '10px' }} />
        </Box>
      )}
  <SoftBox p={2}>
  </SoftBox>
  {!preview ?
  <SoftBox p={2} display="flex" justifyContent="center">
  
    { valide == true ?
    <SoftBox
      component="label"
      htmlFor="image-upload"
      border={`${borderWidth[1]} solid ${borderColor}`}
      borderRadius="lg"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={3}
      sx={{ cursor: "pointer" }}
    >
      <Icon fontSize="large">cloud_upload</Icon>
      <SoftTypography variant="h6" fontWeight="medium" mx={2}>
      Charger votre image
      </SoftTypography>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
        // onChange={(event) => {setImage(event.target.files[0]);console.log("good ellbahja");handleSubmit()}}
      />
    </SoftBox>
      :
      <SoftBox
      component="label"
      htmlFor="image-upload"
      border={`${borderWidth[1]} solid ${borderColor}`}
      borderRadius="lg"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={3}
      sx={{ cursor: "pointer" }}
    >
      <Icon fontSize="large">cloud_upload</Icon>
      <SoftTypography variant="h6" fontWeight="medium" mx={2} >
      Charger votre image
      </SoftTypography>
      <input
        disabled
        id="image-upload"
        type="file"
        accept="image/*"
        style={{ display: "none"}}
        onChange={handleFileChange}
        
      />
    </SoftBox>
  }
  
  
  
  </SoftBox>:
  <></>
}
{preview && isVisiblePrediction ? 
  <button isVis className="btn btn-success" style={{marginTop:"-40px"}} onClick={handleSubmit}>Prédiction</button>
  : <></>
}
  {preview && isVisibleClear ?
  <button className="btn btn-danger" style={{marginTop:"-40px"}} onClick={handleClear}>Effacer</button>
  :
  <></>
  }

{errorReponse =="" ? <>
  
{!clickButton ? <p></p> :<>
        {loading == true && errorReponse=="" ?
  <Box style={{marginTop:"10px"}} mb={2} display="flex" justifyContent="center">
          <CircularProgress  />
  </Box>
  :
    <ListGroup variant="flush">
    <ListGroup.Item></ListGroup.Item>
    <ListGroup.Item>La Classe : {classe}</ListGroup.Item>
    <ListGroup.Item>La Confidence : {confidence}</ListGroup.Item>
    {/* <ListGroup.Item></ListGroup.Item> */}

  </ListGroup>

  
  }
  </>
  }
  </>
  :
  <p className="text-danger">{errorReponse}</p>
}

{!clickButton ? <></>
  : 
  <>
        {loading == true && errorReponse=="" ?
<></>
  :
<>
  <span>Avez-vous un commentaire ?</span>

  <label className="toggle-switch">
    <input type="checkbox" checked={isChecked} onChange={handleShow}/> 
    <span className="toggle-slider"></span>
  </label>
  </>
  }
  </>  
}
  

</Card>


{ isChecked ? 
  <Modal show={showModal} onHide={handleClose} style={{marginTop:"150px"}}>
  <Modal.Header closeButton>
    <Modal.Title>Commentaire</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <textarea rows="4" cols="45" placeholder="Entrez votre commentaire ici..." onChange={handleChangeComment}></textarea>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Fermer
    </Button>
    <Button variant="primary" onClick={handleSendComment}>
      Enregistrer
    </Button>
  </Modal.Footer>
</Modal>

  : 
  <></>

}

      <ToastContainer />
</>
  );
}
export default PaymentMethod;
