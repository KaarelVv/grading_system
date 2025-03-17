import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
import TeamGrading from "../UI/TeamGrading";
import HomeButton from "../UI/HomeButton";
import "../assets/styles/Grading.css";

const Grading = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const grader = searchParams.get("grader") || "1"; // Read grader from URL

  return (
    <div className="grading-container">
      <div className="top-bar">
        <HomeButton /> {/* ✅ Home button added */}
        <h2>Grader {grader}</h2> {/* ✅ Show grader info */}
        <button className="results-button" onClick={() => navigate("/results")}>
          View Results
        </button> {/* ✅ New button to navigate to results */}
      </div>

      <div className="grading-layout">
        {/* Sidebar on the left */}
        <Sidebar onSelectTeam={setSelectedTeam} grader={grader} />

        {/* Grading table on the right */}
        <div className="grading-section">
          {selectedTeam ? <TeamGrading teamName={selectedTeam} grader={grader} /> : <p>Select a team to grade</p>}
        </div>
      </div>
    </div>
  );
};

export default Grading;


