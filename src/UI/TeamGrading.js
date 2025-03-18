import { useState, useEffect } from "react";
import { fetchTeamData, updateTeamScore } from "../components/api/teamApi"; // Import API functions
import LoadingSpinner from "./LoadingSpinner"; // Import spinner
import "../assets/styles/TeamGrading.css"; // ✅ Import CSS for layout

function TeamGrading({ teamName, grader }) {
  const [teamData, setTeamData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!teamName || !grader) return;

    async function loadTeam() {
      setLoading(true);
      const data = await fetchTeamData(grader);
      const team = data.find(t => t.Team === teamName);
      if (team) {
        setTeamData(team);
        setFormData({
          VisualAttractiveness: team.UserExperienceDesign.VisualAttractiveness,
          Interactivity: team.UserExperienceDesign.Interactivity,
          Animations: team.UserExperienceDesign.Animations,
          CybersecurityRelevance: team.EducationalAccuracy.CybersecurityRelevance,
          FactAccuracy: team.EducationalAccuracy.FactAccuracy,
          LearningValue: team.EducationalAccuracy.LearningValue,
          BugFreePerformance: team.Functionality.BugFreePerformance,
          Documentation: team.Functionality.Documentation,
          CodeStructure: team.Functionality.CodeStructure
        });
      }
      setLoading(false);
    }
    loadTeam();
  }, [teamName, grader]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const result = await updateTeamScore(grader, teamName, formData);
    setAlertMessage(result);
    setTimeout(() => setAlertMessage(""), 3000); // Hide alert after 3 seconds
    setSubmitting(false);
  };

  // const categories = {
  //   "User Experience & Design": ["VisualAttractiveness", "Interactivity", "Animations"],
  //   "Educational Accuracy": ["CybersecurityRelevance", "FactAccuracy", "LearningValue"],
  //   "Functionality & Performance": ["BugFreePerformance", "Documentation", "CodeStructure"]
  // };

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

  return (
    <div className="team-grading-container">
      {alertMessage && <div className="popup-alert">{alertMessage}</div>}
      <h1>{teamName} </h1>

      {loading ? (
        <LoadingSpinner />
      ) : teamData ? (
        <div>
          <p>Adjust scores using sliders and submit.</p>
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
                      onChange={(e) => setFormData({ ...formData, [subcategory]: e.target.value })}
                    />
                    <label>{translatedSubcategories[subcategory] || subcategory.replace(/([A-Z])/g, ' $1').trim()}: {formData[subcategory]}</label>

                    {/* <label>{subcategory.replace(/([A-Z])/g, ' $1').trim()}: {formData[subcategory]}</label> */}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button className={submitting ? "submitting" : ""} onClick={handleSubmit} disabled={submitting}>
            {submitting ? <LoadingSpinner /> : "Update Scores"}
          </button>
        </div>
      ) : (
        <p>Tiimi andmed puuduvad.</p>
      )}
    </div>
  );
}

export default TeamGrading;
