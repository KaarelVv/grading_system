const API_URL = "";

// ✅ Fetch team data for a specific grader
export async function fetchTeamData(grader) {
  try {
    const response = await fetch(`${API_URL}?getTeams=true&Grader=${grader}`);
    const text = await response.text();
    console.log("Raw API Response:", text);

    const data = JSON.parse(text);
    //console.log("Parsed Team Data:", data);

    if (data.error) {
      console.error("API Error:", data.error);
      return [];
    }
    return data; // Return full team data array
  } catch (error) {
    console.error("Error fetching team data:", error);
    return [];
  }
}

// ✅ Update team scores
export async function updateTeamScore(grader, teamName, formData) {
  const queryParams = new URLSearchParams({
    update: "true",
    Grader: grader,
    Team: teamName,
    CategoryA1: formData.CategoryA1,
    CategoryA2: formData.CategoryA2,
    CategoryA3: formData.CategoryA3,
    CategoryB1: formData.CategoryB1,
    CategoryB2: formData.CategoryB2,
    CategoryB3: formData.CategoryB3,
    CategoryC1: formData.CategoryC1,
    CategoryC2: formData.CategoryC2,
    CategoryC3: formData.CategoryC3
  }).toString();

  console.log("Submitting Update:", `${API_URL}?${queryParams}`);

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

export async function fetchMergedTeamData() {
    try {
      const [grader1Data, grader2Data] = await Promise.all([
        fetchTeamData("Grader1"),
        fetchTeamData("Grader2")
      ]);
  
      return mergeTeamScores(grader1Data, grader2Data);
    } catch (error) {
      console.error("Error fetching merged team data:", error);
      return [];
    }
  }

  function mergeTeamScores(data1, data2) {
    const teamMap = new Map();
  
    [...data1, ...data2].forEach(team => {
      if (!teamMap.has(team.Team)) {
        teamMap.set(team.Team, { ...team });
      } else {
        const existing = teamMap.get(team.Team);
        existing.Total += team.Total;
  
        ["CategoryA", "CategoryB", "CategoryC"].forEach(category => {
          Object.keys(team[category]).forEach(sub => {
            existing[category][sub] += team[category][sub];
          });
        });
      }
    });
  
    return Array.from(teamMap.values());
  }

