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
  // Function to handle API calls for all 4 places
  async function handleClick() {
    
    const response = await axios.get(`http://localhost:8000/region`)
    // Create an array of axios GET requests for all place IDs
    setMessages(response.data); // Update state with all messages
    setError(null); // Reset any previous errors
    // Make all requests in parallel using axios.all (or Promise.all)
  //   axios
  //     .all(requests)
  //     .then(
  //       axios.spread((...responses) => {
  //         // Extract data from all responses
  //         const allMessages = responses.map((response) => response.data);
          
  //       })
  //     )
  //     .catch((error) => {
  //       console.error("Error fetching data", error);
  //       setError("Error fetching data from the API."); // Set error message
  //     });
   }

  return <Box>
  <div className={styles.container}>
    <h1 className={styles.title}>Beautiful List of Items</h1>
    <ul className={styles.beautifulList}>
      {messages.map((message)=>{
        return <li> {message.name}</li>
      })}
      {/* <li><span className={styles.number}>1.</span> Explore new technologies</li>
      <li><span className={styles.number}>2.</span> Build awesome projects</li>
      <li><span className={styles.number}>3.</span> Learn continuously</li>
      <li><span className={styles.number}>4.</span> Collaborate with others</li>
      <li><span className={styles.number}>5.</span> Stay curious and innovative</li> */}
    </ul>
  </div></Box>;
}
