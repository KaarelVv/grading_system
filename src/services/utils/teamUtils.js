export function mergeTeamScores(data1, data2) {
  const teamMap = new Map();

  console.log("🔹 Raw Data from Grader 1:", data1);
  console.log("🔹 Raw Data from Grader 2:", data2);

  [...data1, ...data2].forEach((team) => {
      if (!team || !team.Team) {
          console.warn("⚠️ Skipping invalid team entry:", team);
          return; // Skip if team is undefined or has no Team property
      }

      if (!teamMap.has(team.Team)) {
          teamMap.set(team.Team, { ...team });
          //console.log(`Added new team: ${team.Team}`, team);
      } else {
          const existing = teamMap.get(team.Team);

          if (!existing.Total || isNaN(existing.Total)) existing.Total = 0;
          if (!team.Total || isNaN(team.Total)) team.Total = 0;

          existing.Total += team.Total;
          console.log(`🔄 Merging scores for: ${team.Team} | New Total: ${existing.Total}`);

          ["UserExperienceDesign", "EducationalAccuracy", "Functionality"].forEach((category) => {
              if (!existing[category]) existing[category] = {};
              if (!team[category]) {
                  console.warn(`⚠️ Missing category "${category}" for ${team.Team}`);
                  return;
              }

              Object.keys(team[category]).forEach((sub) => {
                  if (!existing[category][sub]) existing[category][sub] = 0;
                  existing[category][sub] += team[category][sub];
              });
          });

          //console.log(`Updated merged entry for ${team.Team}:`, existing);
      }
  });

  const mergedArray = Array.from(teamMap.values());
  console.log("🔹 Final Merged Data:", mergedArray);

  return mergedArray;
}
