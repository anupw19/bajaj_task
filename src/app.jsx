import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      setError("");
      const parsedInput = JSON.parse(jsonInput); // Validate JSON format

      const response = await axios.post("http://localhost:3000/bfhl", parsedInput); // Replace with hosted backend URL
      setResponseData(response.data);
    } catch (err) {
      setError("Invalid JSON input or API error.");
    }
  };

  const renderFilteredResponse = () => {
    if (!responseData || selectedFilters.length === 0) return null;

    return selectedFilters.map((filter) => (
      <div key={filter}>
        <strong>{filter}:</strong> {responseData[filter]?.join(", ") || "N/A"}
      </div>
    ));
  };

  return (
    <div>
      <h1>Fullstack Challenge</h1>
      <textarea
        placeholder="Enter JSON input"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="5"
        cols="50"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <>
          <h3>Select Filters</h3>
          <select multiple onChange={(e) => setSelectedFilters([...e.target.selectedOptions].map(o => o.value))}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>

          <h3>Filtered Response</h3>
          {renderFilteredResponse()}
        </>
      )}
    </div>
  );
}

export default App;