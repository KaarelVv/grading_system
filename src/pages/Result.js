import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMergedTeamData } from "../components/api/teamApi";
import "bootstrap/dist/css/bootstrap.min.css";

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
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (!data.length) {
    return <p className="text-center mt-4">No data available.</p>;
  }

  const highestTotalTeams = getHighestTotalTeams(data);
  const highestCategoryTeams = getHighestCategoryTeams(data);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Results</h2>
      <div className="text-center mb-4">
        <button className="btn btn-primary me-2" onClick={() => navigate("/")}>Home</button>
        <button className="btn btn-secondary" onClick={() => navigate("/grading")}>Go to Grading</button>
      </div>
      <h3>Teams with Highest Total Score:</h3>
      <ul className="list-group">
        {highestTotalTeams.map(team => (
          <li className="list-group-item" key={team.Team}>{team.Team} - {team.Total} points</li>
        ))}
      </ul>

      <h3 className="mt-4">Teams with Highest Category Scores:</h3>
      {Object.entries(highestCategoryTeams).map(([category, teams]) => (
        <div key={category} className="mt-3">
          <h4>{category}:</h4>
          <ul className="list-group">
            {teams.map(team => (
              <li className="list-group-item" key={team.Team}>{team.Team}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Result;
