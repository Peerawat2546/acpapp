import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import styles from "./region.module.css"
export default function region() {
  const [messages, setMessages] = useState([]); 
  const [error, setError] = useState(null); 
  useEffect(()=>{
    handleClick()
  },[])
  async function handleClick() {
    
    const response = await axios.get(`http://localhost:8000/region`)
    setMessages(response.data); 
    setError(null); 
  
   }

  return <Box>
  <div className={styles.container}>
    <h1 className={styles.title}>Beautiful List of Items</h1>
    <ul className={styles.beautifulList}>
      {messages.map((message)=>{
        return <li> {message.name}</li>
      })}
      {}
    </ul>
  </div></Box>;
}
