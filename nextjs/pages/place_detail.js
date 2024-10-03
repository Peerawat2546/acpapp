import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

export default function BasicBars() {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    handleClick();
  }, []);

  async function handleClick() {
    try {
      const response = await axios.get(`http://localhost:8000/place`);
      setMessages(response.data); // Update state with fetched messages
      setError(null); // Reset any errors
    } catch (error) {
      console.log(error)
    } 
  }
  console.log(messages)
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: messages.map(message=>message.name) }]}
      series={[ { data: messages.map(message=>message.avg_star) }]}
      width={2400}
      height={300}
/>
  );
}
