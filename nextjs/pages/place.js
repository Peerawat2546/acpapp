import React, { useState } from "react";
import axios from "axios";


export default function MessageLoader() {
  const [messages, setMessages] = useState([]); // State to hold all API messages
  const [error, setError] = useState(null); // State to handle any errors

  // Function to handle API calls for all 4 places
  async function handleClick() {
    
    const response = await axios.get(`http://localhost:8000/place`)
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

  return (
    <div>
      {/* Button to trigger the API calls */}
      <button onClick={handleClick}>Load Data from All Places</button>

      {/* Display any error messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display the messages from all API responses */}
      <div>
        
          <p>Place: {JSON.stringify(messages)}</p>
        
      </div>
    </div>
  );
}
