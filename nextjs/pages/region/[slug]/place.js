import React, { useState } from "react";
import axios from "axios";

export default function MessageLoader() {
  const [message, setMessage] = useState(""); // State for API message

  function handleClick() {
    axios.get("http://localhost:8000/place/1").then((response) => {
        setMessage(response.data); // Update message with API response
      }).catch((error) => {
        console.error("Error fetching data", error);
      });
  }

  return (
    <div>
      <button onClick={handleClick}>Load Data from API</button>
      <p>API Message: {message}</p> {/* Display the message from API */}
    </div>
  );
}
