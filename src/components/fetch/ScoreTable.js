import React, { useState } from "react";
import axios from "axios";
import useFetchTeams from "../hooks/useFetchTeams";
import ScoreRow from "../UI/ScoreRow";
import LoadingSpinner from "../UI/LoadingSpinner";
import "bootstrap/dist/css/bootstrap.min.css";

const scriptUrl = "https://script.google.com/macros/s/AKfycbwmLxQv3MBOSyN5EBc4hZnQ_nhEx-scUc3WY-e0Xa2xY-DoT45D2wKoce_N9VjElzD8CA/exec";

const ScoreTable = () => {
  const { teams, setTeams, loading } = useFetchTeams();
  const [updating, setUpdating] = useState(null);

  const updateValue = async (index, key, delta) => {
    const updatedTeams = [...teams];
    let newValue = Number(updatedTeams[index][key]) + delta;

    if (newValue < 0) newValue = 0;
    if (newValue > 10) newValue = 10;

    updatedTeams[index][key] = newValue;
    setTeams(updatedTeams);
    setUpdating(updatedTeams[index].Team);

    const team = updatedTeams[index];
    const query = `?update=true&Team=${encodeURIComponent(team.Team)}&Category=${team.Category}&Ability=${team.Ability}&Functionality=${team.Functionality}`;

    try {
      const response = await axios.get(scriptUrl + query);
      setTeams((prevTeams) =>
        prevTeams.map((t) => (t.Team === team.Team ? response.data : t))
      );
    } catch (error) {
      console.error("Error updating points:", error);
      alert("Failed to update.");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Team Scores</h2>

      {loading && <LoadingSpinner />}

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
              <ScoreRow key={index} team={team} index={index} updateValue={updateValue} updating={updating} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScoreTable;
