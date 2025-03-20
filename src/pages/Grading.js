import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TeamGrading from "../components/TeamGrading";
import "../assets/styles/Grading.css";

const Grading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Get grader details (No need for useState)
  const grader = location.state?.grader || localStorage.getItem("grader") || "1";
  const graderName = location.state?.name || localStorage.getItem("graderName") || "Unknown";

  useEffect(() => {
    if (!grader || !graderName) {
      navigate("/"); // Redirect if no grader info is found
    } else {
      localStorage.setItem("grader", grader);
      localStorage.setItem("graderName", graderName);
    }
  }, [grader, graderName, navigate]);

  return (
    <div className="grading-container">
      <div className="top-bar">
        <button className="button button-nav" onClick={() => navigate("/")}>Pealehele</button>
        <h2>Hindaja: {graderName}</h2>
        <button className="button button-nav" onClick={() => navigate("/results")}>Vaata tulemusi</button>
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
