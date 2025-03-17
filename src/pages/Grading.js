import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
import TeamGrading from "./TeamGrading";

const Grading = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const grader = searchParams.get("grader") || "1"; // Read grader from URL

  const handleGraderChange = (newGrader) => {
    setSearchParams({ grader: newGrader }); // Update URL when grader is changed
    setSelectedTeam(null); // Reset selected team when grader changes
  };

  return (
    <div className="grading-container">
      <h2>Select Grader</h2>
      <div className="grader-buttons">
        <button onClick={() => handleGraderChange("1")} className={grader === "1" ? "active" : ""}>
          Grader 1
        </button>
        <button onClick={() => handleGraderChange("2")} className={grader === "2" ? "active" : ""}>
          Grader 2
        </button>
      </div>

      <div className="grading-layout">
        {/* Sidebar with teams */}
        <Sidebar onSelectTeam={setSelectedTeam} grader={grader} />

        {/* Team grading section - only shows when a team is selected */}
        <div className="grading-section">
          {selectedTeam ? <TeamGrading teamName={selectedTeam} grader={grader} /> : <p>Select a team to grade</p>}
        </div>
      </div>
    </div>
  );
};

export default Grading;
