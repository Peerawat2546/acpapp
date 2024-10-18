import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Grid from "@mui/material/Grid2";
import { Box, Typography, Button, TextField } from "@mui/material";
import useBearStore from "@/store/useBearStore";
import { styled } from "@mui/material/styles";

// Custom styles for buttons
const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "1.2rem",
  padding: "12px 24px",
  margin: "10px",
  borderRadius: "8px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
}));

// Custom styles for the container box
const ContainerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundImage: "linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)",
  padding: theme.spacing(4),
}));

// Custom styles for the title
const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "#fff",
  marginBottom: theme.spacing(4),
  fontSize: "2.5rem",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
}));

function Home() {
  return (
    <ContainerBox>
      <TitleTypography variant="h4" gutterBottom>
        Welcome to the Home Page
      </TitleTypography>
      
      
      
      <StyledButton variant="contained" color="primary" href="/region">
        Explore Regions
      </StyledButton>
      <StyledButton variant="contained" color="secondary" href="/place">
        Discover Places
      </StyledButton>
      <StyledButton variant="contained" color="success" href="/place_detail">
        Go to Dashboard
      </StyledButton>
    </ContainerBox>
  );
}

export default Home;
