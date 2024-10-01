import React from "react";
import { Box } from "@mui/material";
import styles from "./region.module.css"
export default function region() {
  return <Box>
  <div className={styles.container}>
    <h1 className={styles.title}>Beautiful List of Items</h1>
    <ul className={styles.beautifulList}>
      <li><span className={styles.number}>1.</span> Explore new technologies</li>
      <li><span className={styles.number}>2.</span> Build awesome projects</li>
      <li><span className={styles.number}>3.</span> Learn continuously</li>
      <li><span className={styles.number}>4.</span> Collaborate with others</li>
      <li><span className={styles.number}>5.</span> Stay curious and innovative</li>
    </ul>
  </div></Box>;
}
