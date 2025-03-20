import { useState, useEffect } from "react";
import { fetchTeamData, updateTeamScore } from "../services/api/teamService";
import LoadingSpinner from "./LoadingSpinner";
import "../assets/styles/TeamGrading.css";

const categoriesEST = {
  "Kasutajakogemus ja disain": ["VisualAttractiveness", "Interactivity", "Animations"],
  "Õpetlikkus ja faktitäpsus": ["CybersecurityRelevance", "FactAccuracy", "LearningValue"],
  "Funktsionaalsus ja jõudlus": ["BugFreePerformance", "Documentation", "CodeStructure"]
};

const translatedSubcategories = {
  VisualAttractiveness: {
    title: "Visuaalne atraktiivsus",
    description: "Kas disain on professionaalne, ühtne ja esteetiliselt meeldiv?"
  },
  Interactivity: {
    title: "Interaktiivsus ja intuitiivsus",
    description: "Kas funktsioonid on interaktiivsed? Kas mäng on kaasahaarav ja õpetuseta mängitav?"
  },
  Animations: {
    title: "Animatsioonid ja illustratsioonid",
    description: "Kas on kasutatud huvitavaid, asjakohaseid, isikupäraseid animatsioone ja illustratsioone?"
  },
  CybersecurityRelevance: {
    title: "Seotus küberturbega",
    description: "Kas mängu sisu on teemakohane ja küberjulgeolekuga seotud?"
  },
  FactAccuracy: {
    title: "Faktide täpsus ja usaldusväärsus",
    description: "Kas info põhineb usaldusväärsetel allikatel ja on faktitäpne?"
  },
  LearningValue: {
    title: "Õpitav väärtus",
    description: "Kas mäng annab mängijale kasulikke teadmisi?"
  },
  BugFreePerformance: {
    title: "Vigade puudumine ja jõudlus",
    description: "Kas mäng reageerib loogiliselt? Laeb viivitusteta? Kommunikeerib vigase sisendi veateated?"
  },
  Documentation: {
    title: "Dokumentatsioon ja help",
    description: "Kas on kirjutatud korralik README ja vormistatud kasutusjuhend?"
  },
  CodeStructure: {
    title: "Koodi struktuur",
    description: " Kas kood on hästi organiseeritud, optimeeritud, kommenteeritud ja arusaadav? DRY?"
  }
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

      if (result?.success) {
        setAlertMessage(`Salvestamine ei õnnestunud.`);
      } else {
        setAlertMessage( `${teamName} Hinded edukalt salvestatud!`);
      }
    } catch (error) {
      setAlertMessage(`Viga hindamise salvestamisel: ${error.message}`);
    }

    setTimeout(() => setAlertMessage(""), 3000);
    setSubmitting(false);
  };

  return (
    <div className="team-grading-container">
      {alertMessage && <div className="popup-alert">{alertMessage}</div>}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grading-content">
          <h4>Kohanda slaiderit punktide sisestamiseks. Max 11p</h4>

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
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setFormData({ ...formData, [subcategory]: value });
                        e.target.style.setProperty("--progress", `${(value / 11) * 100}%`);
                      }}
                    />
                    <label>
                      <strong>{translatedSubcategories[subcategory]?.title || subcategory}:</strong> {formData[subcategory]}
                    </label>
                    <p className="subcategory-description">
                      {translatedSubcategories[subcategory]?.description}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <h4>Enne tiimi vahetust palun salvesta tulemus!</h4>
          <div className="button-container button-submit">
            <button className={`button ${submitting ? "submitting" : ""}`} onClick={handleSubmit} disabled={submitting}>
              {submitting ? <LoadingSpinner /> : "Kinnita hinded"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamGrading;
