import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMergedTeamData } from "../components/api/teamApi";
import LoadingSpinner from "../UI/LoadingSpinner";
import "../assets/styles/Result.css";

const categoriesEST = {
  "UserExperienceDesign": "Kasutajakogemus ja disain",
  "EducationalAccuracy": "Õpetlikkus ja faktitäpsus",
  "Functionality": "Funktsionaalsus ja jõudlus"
};

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
    const categories = Object.keys(categoriesEST);
    const highestTeams = {};

    categories.forEach(category => {
      let maxScore = Math.max(...teams.map(team => 
        Object.values(team[category]).reduce((sum, value) => sum + value, 0)
      ));

      highestTeams[category] = teams.filter(team => {
        const categoryScore = Object.values(team[category]).reduce((sum, value) => sum + value, 0);
        return categoryScore === maxScore;
      }).map(team => ({
        name: team.Team,
        score: Object.values(team[category]).reduce((sum, value) => sum + value, 0)
      }));
    });

    return highestTeams;
  };

  if (loading) {
    return <div className="loading-container"><LoadingSpinner /></div>;
  }

  if (!data.length) {
    return <div className="loading-message">No data available.</div>;
  }

  const highestTotalTeams = getHighestTotalTeams(data);
  const highestCategoryTeams = getHighestCategoryTeams(data);

  return (
    <div className="container">
      <h2 className="text-center">Tulemus</h2>
      <div className="nav-buttons">
        <button className="results-button" onClick={() => navigate("/")}>Pealeht</button>
        <button className="results-button" onClick={() => navigate("/grading")}>Hindamine</button>
      </div>
      <h3>Parim skoor:</h3>
      <ul className="list-group">
        {highestTotalTeams.map(team => (
          <li className="list-group-item" key={team.Team}>{team.Team} - {team.Total} punkti</li>
        ))}
      </ul>

      <div className="highest-category-section">
        <h3>Parim kategooria:</h3>
        {Object.entries(highestCategoryTeams).map(([category, teams]) => (
          <div key={category} className="category-section">
            <h4>{categoriesEST[category] || category}:</h4>
            <ul className="list-group">
              {teams.map(team => (
                <li className="list-group-item" key={team.name}>{team.name} - {team.score} punkti</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
