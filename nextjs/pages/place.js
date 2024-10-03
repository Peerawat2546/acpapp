import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MessageLoader() {
  const [messages, setMessages] = useState([]); // State to hold API messages
  const [comments, setComments] = useState([]);
  const [regions, setRegions] = useState([]);
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    handleClick();
  }, []);

  async function handleClick() {
    setLoading(true); // Set loading to true while fetching data
    try {
      const response = await axios.get(`http://localhost:8000/place`);
      
        const commentres = await axios.get(`http://localhost:8000/comment`);
        console.log(commentres.data)
        const regionres = await axios.get(`http://localhost:8000/region`);
      setComments(commentres.data)
      setRegions(regionres.data)
      setMessages(response.data); // Update state with fetched messages
      setError(null); // Reset any errors
    } catch (error) {
      setError("Failed to load messages");
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <div style={styles.pageContainer}>
      {/* Removed the navigation bar */}
      
      <div style={styles.content}>
        {loading && <p style={styles.loadingText}>Loading...</p>} {/* Loading state */}
        {error && <p style={styles.errorText}>{error}</p>} {/* Error state */}
        
        {/* Display list of places with each item in a colored box */}
        <ul style={styles.placesList}>
          {messages.map((message) => (
            <li key={message.id} style={styles.placeItem}>
              <div style={styles.colorBox}>
                <div style={styles.card}>
                  <p style={styles.placeName}>{message.name}</p>
                  <p style={styles.regionName}>Region: {regions.filter(region=>region.id===message.region_id).map(region=>region.name).join(", ")}</p>
                  <p style={styles.regionName}>Rating: {message.avg_star}</p>
                  <p style={styles.regionName}>Comment: {comments.filter(comment=>comment.place_id===message.id).map(comment=>comment.comment).join(", ")}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button onClick={handleClick} style={styles.refreshButton}>
          Refresh Places
        </button> {/* Refresh Button */}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    background: 'linear-gradient(135deg, #f0f4f8, #e6f7ff)', // Gradient background
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    maxWidth: '900px',
    width: '100%',
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  loadingText: {
    color: '#00796b',
  },
  errorText: {
    color: 'red',
  },
  placesList: {
    textAlign: 'left',
    paddingLeft: '0', // Remove default padding for the list
    listStyleType: 'none', // Remove bullet points
    marginBottom: '30px',
  },
  placeItem: {
    marginBottom: '20px',
  },
  colorBox: {
    backgroundColor: '#ffe082', // A light yellow background color for each box
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginBottom: '15px',
  },
  card: {
    padding: '10px',
    backgroundColor: '#f5f5f5', // Card background color
    borderRadius: '8px',
  },
  placeName: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0',
  },
  regionName: {
    fontSize: '16px',
    color: '#757575',
    marginTop: '5px',
  },
  refreshButton: {
    padding: '12px 40px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#00796b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};
