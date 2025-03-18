import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
import TeamGrading from "../UI/TeamGrading";

import "../assets/styles/Grading.css";

const Grading = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { grader = "1", name: graderName = "Unknown" } = location.state || {};

  return (
    <div className="grading-container">
      <div className="top-bar">
        <div className="nav-buttons">
          <button className="results-button" onClick={() => navigate("/")}>Pealehele</button>
        </div>
        <h2>Hindaja {grader}: {graderName}</h2>
        <button className="results-button" onClick={() => navigate("/results")}>
          Vaata tulemusi
        </button>
      </div>

      <div className="grading-layout">
        <Sidebar onSelectTeam={setSelectedTeam} grader={grader} />

        <div className="grading-section">
          {selectedTeam ? (
            <TeamGrading teamName={selectedTeam} grader={grader} />
          ) : (
            <p>Vali tiim hindamiseks</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default Grading;
