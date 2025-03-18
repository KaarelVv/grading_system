import { useState, useEffect } from "react";
import { fetchTeamData, updateTeamScore } from "../components/api/teamApi";
import LoadingSpinner from "./LoadingSpinner";
import "../assets/styles/TeamGrading.css";

const categoriesEST = {
  "Kasutajakogemus ja disain": ["VisualAttractiveness", "Interactivity", "Animations"],
  "Õpetlikkus ja faktitäpsus": ["CybersecurityRelevance", "FactAccuracy", "LearningValue"],
  "Funktsionaalsus ja jõudlus": ["BugFreePerformance", "Documentation", "CodeStructure"]
};

const translatedSubcategories = {
  VisualAttractiveness: "Visuaalne atraktiivsus",
  Interactivity: "Interaktiivsus",
  Animations: "Animatsioonid",
  CybersecurityRelevance: "Seotus küberturbega",
  FactAccuracy: "Faktide täpsus",
  LearningValue: "Õpitav väärtus",
  BugFreePerformance: "Vigade puudumine",
  Documentation: "Dokumentatsioon",
  CodeStructure: "Koodi struktuur"
};

function TeamGrading({ teamName, grader }) {
  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem(`grading_${grader}_${teamName}`)) || {};
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!teamName || !grader) return;

    async function loadTeam() {
      setLoading(true);
      try {
        const data = await fetchTeamData(grader);
        const team = data.find(t => t.Team === teamName);

        if (team) {
          const formattedData = {
            VisualAttractiveness: team.UserExperienceDesign?.VisualAttractiveness || 0,
            Interactivity: team.UserExperienceDesign?.Interactivity || 0,
            Animations: team.UserExperienceDesign?.Animations || 0,
            CybersecurityRelevance: team.EducationalAccuracy?.CybersecurityRelevance || 0,
            FactAccuracy: team.EducationalAccuracy?.FactAccuracy || 0,
            LearningValue: team.EducationalAccuracy?.LearningValue || 0,
            BugFreePerformance: team.Functionality?.BugFreePerformance || 0,
            Documentation: team.Functionality?.Documentation || 0,
            CodeStructure: team.Functionality?.CodeStructure || 0
          };

          setFormData(prevData => ({ ...prevData, ...formattedData }));
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
      setLoading(false);
    }

    loadTeam();
  }, [teamName, grader]);

  // Save grading progress
  useEffect(() => {
    localStorage.setItem(`grading_${grader}_${teamName}`, JSON.stringify(formData));
  }, [formData, grader, teamName]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await updateTeamScore(grader, teamName, formData);
      setAlertMessage(result);
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.error("Error updating scores:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="team-grading-container">
      {alertMessage && <div className="popup-alert">{alertMessage}</div>}
      <h1>{teamName}</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <p>Kohanda slaiderit punktide sisestamiseks</p>
          <div className="categories-container">
            {Object.entries(categoriesEST).map(([categoryName, subcategories], index) => (
              <div key={index} className="category-box">
                <h2>{categoryName}</h2>
                {subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className="subcategory">
                    <input
                      type="range"
                      min="0"
                      max="11"
                      value={formData[subcategory] || 0}
                      onChange={(e) => setFormData({ ...formData, [subcategory]: Number(e.target.value) })}
                    />
                    <label>{translatedSubcategories[subcategory] || subcategory}: {formData[subcategory]}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button className={`button ${submitting ? "submitting" : ""}`} onClick={handleSubmit} disabled={submitting}>
            {submitting ? <LoadingSpinner /> : "Kinnita hinded"}
          </button>
        </div>
      )}
    </div>
  );
}

export default TeamGrading;
