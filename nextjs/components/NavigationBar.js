import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  ListItemIcon,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import useBearStore from "@/store/useBearStore";

const NavigationLayout = ({ children }) => {
  const router = useRouter();
  const appName = useBearStore((state) => state.appName);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#ff5e15" }}>
        <Toolbar>
          <Link href={"/"}>
            <AssuredWorkloadIcon sx={{ color: "#ffffff" }} fontSize="large" />
          </Link>
          <Typography
            variant="body1"
            sx={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#ffffff",
              padding: "0 10px",
              fontFamily: "Prompt",
            }}>
            Him
          </Typography>
          <NavigationLink href="/region" label="region" />
          <NavigationLink href="/place" label="place" />
          <NavigationLink href="/place_detail" label="place_detail" />
          <div style={{ flexGrow: 1 }} />
          <Button
            color="#ffffff"
            onClick={() => {
              router.push("/register");
            }}>
            <PersonIcon/>
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
          fontSize: "14px",
          fontWeight: 500,
          // textTransform: "uppercase",
          color: "#fff",
          padding: "0 10px", // Add padding on left and right
        }}>
        {label}
      </Typography>{" "}
    </Link>
  );
};

export default NavigationLayout;
