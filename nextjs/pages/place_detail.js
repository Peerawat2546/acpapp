import React, { useState, useEffect } from "react";
import {
  Box, Typography, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Card, CardContent, Grid, Rating, Button
} from "@mui/material";
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone';
import PlaceIcon from '@mui/icons-material/Place';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

export default function Dashboard() {
  const [places, setPlaces] = useState([]);
  const router = useRouter(); // For navigation

  useEffect(() => {
    fetchPlaces();
  }, []);

  async function fetchPlaces() {
    try {
      const response = await axios.get(`http://localhost:8000/place`);
      setPlaces(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <Link href="/region" passHref>
              <ListItem button>
                <ExploreTwoToneIcon sx={{ marginRight: "10px" }} />
                <ListItemText primary="Region" />
              </ListItem>
            </Link>

            <Link href="/place" passHref>
              <ListItem button>
                <PlaceIcon sx={{ marginRight: "10px" }} />
                <ListItemText primary="Places" />
              </ListItem>
            </Link>

            <Link href="/place_detail" passHref>
              <ListItem button>
                <DashboardIcon sx={{ marginRight: "10px" }} />
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />

        {/* Place Cards Section */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            List of Places
          </Typography>

          <Grid container spacing={3}>
            {places.map((place, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    {/* Place Name */}
                    <Typography variant="h6" gutterBottom>
                      {place.name}
                    </Typography>

                    {/* Description Below the Name */}
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {place.description || "No description available."}
                    </Typography>

                    {/* Star Rating */}
                    <Typography variant="body1">
                      Average Rating:
                    </Typography>
                    <Rating value={place.avg_star} precision={0.5} readOnly />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Additional Info */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6">Data Overview</Typography>
          <Typography variant="body1">
            Total Places: {places.length}
          </Typography>
        </Box>

        {/* Refresh Button */}
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" onClick={fetchPlaces}>
            Refresh Data
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
