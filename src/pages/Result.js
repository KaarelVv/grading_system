import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMergedTeamData } from "../components/api/teamApi";
import "../assets/styles/Result.css"

const Result = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const teamData = await fetchMergedTeamData();
      setData(teamData);
      setLoading(false);
    };

    loadData();
  }, []);

  const getHighestTotalTeams = (teams) => {
    const maxScore = Math.max(...teams.map(team => team.Total));
    return teams.filter(team => team.Total === maxScore);
  };

  const getHighestCategoryTeams = (teams) => {
    const categories = ["CategoryA", "CategoryB", "CategoryC"];
    const highestTeams = {};

    categories.forEach(category => {
      let maxScore = Math.max(...teams.map(team => 
        Object.values(team[category]).reduce((sum, value) => sum + value, 0)
      ));

      highestTeams[category] = teams.filter(team => {
        const categoryScore = Object.values(team[category]).reduce((sum, value) => sum + value, 0);
        return categoryScore === maxScore;
      });
    });

    return highestTeams;
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (!data.length) {
    return <div className="loading-message">No data available.</div>;
  }

  const highestTotalTeams = getHighestTotalTeams(data);
  const highestCategoryTeams = getHighestCategoryTeams(data);

  return (
    <div className="container">
      <h2 className="text-center">Results</h2>
      <div className="nav-buttons">
        <button className="results-button" onClick={() => navigate("/")}>Home</button>
        <button className="results-button" onClick={() => navigate("/grading")}>Go to Grading</button>
      </div>
      <h3>Teams with Highest Total Score:</h3>
      <ul className="list-group">
        {highestTotalTeams.map(team => (
          <li className="list-group-item" key={team.Team}>{team.Team} - {team.Total} points</li>
        ))}
      </ul>

      <div className="highest-category-section">
        <h3>Teams with Highest Category Scores:</h3>
        {Object.entries(highestCategoryTeams).map(([category, teams]) => (
          <div key={category} className="category-section">
            <h4>{category}:</h4>
            <ul className="list-group">
              {teams.map(team => (
                <li className="list-group-item" key={team.Team}>{team.Team}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
