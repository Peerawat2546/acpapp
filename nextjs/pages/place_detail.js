import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars() {
  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: ["Item Availability"] }]}
      series={[
        { data: [4] },
        { data: [1] },
        { data: [2] },
        { data: [3] }
      ]}
      width={600}
      height={300}
    />
  );
}
