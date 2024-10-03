import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import useBearStore from "@/store/useBearStore";

const NavigationLayout = ({ children }) => {
  const router = useRouter();
  const appName = useBearStore((state) => state.appName);

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: "linear-gradient(45deg, #ff7eb9, #ff65a3, #cd51f0)", // Added gradient
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Slight shadow for depth
        }}>
        <Toolbar>
          <Link href={"/region"}>
            <ExploreTwoToneIcon 
              sx={{ 
                color: "#ffffff", 
                fontSize: "34px", 
                transition: "transform 0.3s ease-in-out", // Smooth hover effect
                "&:hover": {
                  transform: "rotate(20deg)", // Rotating icon on hover
                } 
              }} 
            />
          </Link>
          <Typography
            variant="h6"
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#ffffff",
              padding: "0 15px",
              fontFamily: "Prompt",
            }}>
            Thailand Attractions
          </Typography>

          {/* Navigation Links */}
          <NavigationLink href="/region" label="Region" />
          <NavigationLink href="/place" label="Places" />
          <NavigationLink href="/place_detail" label="Dashboard" />

          <Box sx={{ flexGrow: 1 }} />

          {/* Register / Profile Button */}
          <Button
            sx={{
              backgroundColor: "#ffffff",
              color: "#cd51f0",
              borderRadius: "30px", 
              padding: "8px 16px",
              transition: "background-color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#f50057",
                color: "#ffffff",
              },
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => router.push("/register")}
          >
            <PersonIcon sx={{ marginRight: "8px" }} />
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      <main>{children}</main>
    </>
  );
};

const NavigationLink = ({ href, label }) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Typography
        variant="body1"
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#fff",
          padding: "0 15px", 
          fontFamily: "Prompt",
          textTransform: "capitalize",
          transition: "color 0.3s ease-in-out",
          "&:hover": {
            color: "#ffeb3b", // Highlighted color on hover
          },
        }}>
        {label}
      </Typography>
    </Link>
  );
};

export default NavigationLayout;
