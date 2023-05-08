import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Modal } from "@mui/material";
import { Close } from '@mui/icons-material';
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from '@material-ui/core/IconButton';
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Link, useNavigate } from "react-router-dom";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBadge from "components/SoftBadge";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import myImage from '../../assets/images/bg.jpg';
import etape1 from '../../assets/images/guide-images/etape1-1.png';
import etape2 from '../../assets/images/guide-images/etape2-2.png';
import etape3 from '../../assets/images/guide-images/etape3-3.png';
import etape4 from '../../assets/images/guide-images/etape4-4.png';
import etape5 from '../../assets/images/guide-images/etape5-5.png';
import etape6 from '../../assets/images/guide-images/etape6-6.png';
import etape7 from '../../assets/images/guide-images/etape7-7.png';
import etape8 from '../../assets/images/guide-images/etape8-8.png';
import etape9 from '../../assets/images/guide-images/etape9-9.png';
import etape10 from '../../assets/images/guide-images/etape10-10.png';
import etape11 from '../../assets/images/guide-images/etape11-11.png';



const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
   {
    label: 'ETAPE 1',
    imgPath:
      etape1,
    description:'Consulter la page de prédiction'}, 
  {
    label: 'ETAPE 2',
    imgPath:
      etape3,
    description:'Sélectionnez le type de la plante '
  },
  {
    label: 'ETAPE 3',
    imgPath:
      etape4,
    description:'Par Exemple : vous choisissez le type: pomme de terre'},
     {
    label: 'ETAPE 4',
    imgPath:
      etape5,
    description:'Le chargement de l\'image à prédire '
  },{
    label: 'ETAPE 5',
    imgPath:
      etape6,
    description:'Cliquez sur le bouton prédiction pour intérroger le modèle et obtenir une prédiction'},
     {
    label: 'ETAPE 6',
    imgPath:
      etape7,
    description:'Vous recevez une réponse qui contient la classe d\'appartence et la confidence de la prédiction '
  },{
    label: 'ETAPE 7',
    imgPath:
      etape8,
    description:'Écrivez un commentaire'}, 
    {
    label: 'ETAPE 8',
    imgPath:
      etape9,
    description:'Exemple d\'un commentaire'
  },{
    label: 'ETAPE 9',
    imgPath:
      etape10,
    description:'Progression de l\'envoie du commentaire'},
     {
    label: 'ETAPE 10',
    imgPath:
      etape11,
    description:'Vous pouvez voir votre historique des prédictions effectuées'
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    // setActiveStep(step);
    console.log("hhh");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
    {isModalOpen && (
            <Modal open={isModalOpen} onClose={handleClose}>
                 <div className="container my-4" style={{ backgroundColor: "white", padding: "20px",maxWidth: "1000px", border: "solid #87CEEB",
                borderRadius: "10px",
                backgroundColor: "#f7f7f7",
                  }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-5px" }}>
                  <IconButton onClick={handleClose}>
                    <Close />
                  </IconButton>
                </div>
    <Box sx={{ maxWidth: 1200, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
          borderRadius: "10px"
        }}
      >
        <Typography><AutoStoriesIcon style={{color:"green"}}/> <SoftBadge variant="gradient" badgeContent="Guide d'utilisation" color="success" size="xl" container/></Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
            //   <Box
            //     component="img"
            //     sx={{
            //       height: 655,
            //       display: 'block',
            //       maxWidth: 1200,
            //       overflow: 'hidden',
            //       width: '100%',
            //     }}
            //     src={step.imgPath}
            //     alt={step.label}
            //   />
            // ) : null}
            <Box
          sx={{
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 1200,
            overflow: 'hidden',
            width: '100%',
          
          }}
        >
          <Box
            component="img"
            sx={{
              maxHeight: 450,
              maxWidth: '100%',
              objectFit: 'cover',
            }}
            src={step.imgPath}
            alt={step.label}
          />
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            <SoftBadge variant="gradient" badgeContent={step.label} color="primary" size="xl" container/>  :    
            {step.description}  
          </Typography>
        </Box>
      ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="large"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="large" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
    </div>
    </Modal>
          )}
    <Footer />
</DashboardLayout>
  );
}

export default SwipeableTextMobileStepper;

