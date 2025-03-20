import { mergeTeamScores } from "../utils/teamUtils";

const API_URL = process.env.REACT_APP_SCRIPT_URL;

/**
 * Fetch team data for a specific grader.
 * @param {string} grader
 * @returns {Promise<Array>}
 */
export async function fetchTeamData(grader) {
  try {
    const response = await fetch(`${API_URL}?getTeams=true&Grader=${grader}`);
    const text = await response.text();
    //console.log("Raw API Response:", text);

    const data = JSON.parse(text);

    if (data.error) {
      console.error("API Error:", data.error);
      return [];
    }
    return data;
  } catch (error) {
    console.error("Error fetching team data:", error);
    return [];
  }
}

/**
 * Update team scores.
 * @param {string} grader
 * @param {string} teamName
 * @param {object} formData
 * @returns {Promise<string>}
 */
export async function updateTeamScore(grader, teamName, formData) {
  const queryParams = new URLSearchParams({
    update: "true",
    Grader: grader,
    Team: teamName,
    VisualAttractiveness: formData.VisualAttractiveness,
    Interactivity: formData.Interactivity,
    Animations: formData.Animations,
    CybersecurityRelevance: formData.CybersecurityRelevance,
    FactAccuracy: formData.FactAccuracy,
    LearningValue: formData.LearningValue,
    BugFreePerformance: formData.BugFreePerformance,
    Documentation: formData.Documentation,
    CodeStructure: formData.CodeStructure,
  }).toString();

  //console.log("Submitting Update:", `${API_URL}?${queryParams}`);

  try {
    const response = await fetch(`${API_URL}?${queryParams}`);
    const result = await response.text();
    console.log("API Update Response:", result);
    return result;
  } catch (error) {
    console.error("Error updating data:", error);
    return "Update failed";
  }
}

/**
 * Fetch and merge team data from multiple graders.
 * @returns {Promise<Array>}
 */
export async function fetchMergedTeamData() {
  try {
    const [grader1Data, grader2Data] = await Promise.all([
      fetchTeamData("1"),
      fetchTeamData("2"),
    ]);

    return mergeTeamScores(grader1Data, grader2Data);
  } catch (error) {
    console.error("Error fetching merged team data:", error);
    return [];
  }
}
