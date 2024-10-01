import React, { useState } from "react";
import axios from "axios";


export default function MessageLoader() {
  const [messages, setMessages] = useState([]); // State to hold all API messages
  const [error, setError] = useState(null); // State to handle any errors

  // Function to handle API calls for all 4 places
  function handleClick() {
    const placeIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16,17,18,19,20]; // Place IDs to fetch data from

    // Create an array of axios GET requests for all place IDs
    const requests = placeIds.map((id) =>
      axios.get(`http://localhost:8000/place?place_id=${id}`)
    );

    // Make all requests in parallel using axios.all (or Promise.all)
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          // Extract data from all responses
          const allMessages = responses.map((response) => response.data);
          setMessages(allMessages); // Update state with all messages
          setError(null); // Reset any previous errors
        })
      )
      .catch((error) => {
        console.error("Error fetching data", error);
        setError("Error fetching data from the API."); // Set error message
      });
  }

  return (
    <div>
      {/* Button to trigger the API calls */}
      <button onClick={handleClick}>Load Data from All Places</button>

      {/* Display any error messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display the messages from all API responses */}
      <div>
        {messages.map((message, index) => (
          <p key={index}>Place {index + 1}: {JSON.stringify(message)}</p>
        ))}
      </div>
    </div>
  );
}
