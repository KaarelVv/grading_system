import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const scriptUrl = "DEPLOYMENT_URL"; // Replace with your Apps Script URL

const ScoreTable = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null); // Track updating row

  useEffect(() => {
    fetchTeams();
  }, []);

  // Fetch teams from Google Sheets
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await axios.get(scriptUrl);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  // Increase or decrease scores using GET request
  const updateValue = async (index, key, delta) => {
    const updatedTeams = [...teams];
    let newValue = Number(updatedTeams[index][key]) + delta;

    // Ensure values stay between 0-10
    if (newValue < 0) newValue = 0;
    if (newValue > 10) newValue = 10;

    // Update local state immediately for smooth UI
    updatedTeams[index][key] = newValue;
    setTeams(updatedTeams);
    setUpdating(updatedTeams[index].Team); // Indicate updating row

    // Send update request to Google Sheets
    const team = updatedTeams[index];
    const query = `?update=true&Team=${encodeURIComponent(team.Team)}&Category=${team.Category}&Ability=${team.Ability}&Functionality=${team.Functionality}`;

    try {
      const response = await axios.get(scriptUrl + query);
      
      // Update only the changed row with new Total Points
      setTeams((prevTeams) =>
        prevTeams.map((t) => (t.Team === team.Team ? response.data : t))
      );
    } catch (error) {
      console.error("Error updating points:", error);
      alert("Failed to update.");
    } finally {
      setUpdating(null); // Remove updating indicator
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Team Scores</h2>

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && (
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Team Name</th>
              <th>Category</th>
              <th>Ability</th>
              <th>Functionality</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index} className={updating === team.Team ? "table-warning" : ""}>
                <td><strong>{team.Team}</strong></td>
                <td>
                  <button className="btn btn-danger btn-sm mx-1" onClick={() => updateValue(index, "Category", -1)}>-</button>
                  {team.Category}
                  <button className="btn btn-success btn-sm mx-1" onClick={() => updateValue(index, "Category", 1)}>+</button>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm mx-1" onClick={() => updateValue(index, "Ability", -1)}>-</button>
                  {team.Ability}
                  <button className="btn btn-success btn-sm mx-1" onClick={() => updateValue(index, "Ability", 1)}>+</button>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm mx-1" onClick={() => updateValue(index, "Functionality", -1)}>-</button>
                  {team.Functionality}
                  <button className="btn btn-success btn-sm mx-1" onClick={() => updateValue(index, "Functionality", 1)}>+</button>
                </td>
                <td>
                  {updating === team.Team ? (
                    <div className="spinner-border spinner-border-sm text-secondary" role="status">
                      <span className="visually-hidden">Updating...</span>
                    </div>
                  ) : (
                    team.Total
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScoreTable;
