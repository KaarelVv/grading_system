import React from "react";
import { useState } from 'react';
import "./Home.css";
import CategoryPage from '../CategoryPage';
import Sidebar from '../layouts/Sidebar';

const Home = () => {
  const [view, setView] = useState('home');
  const [assessorName, setAssessorName] = useState('');
  const [category, setCategory] = useState('design');
  const [teams, setTeams] = useState([
    { id: 1, name: 'Meeskond 1', scores: {} },
    { id: 2, name: 'Meeskond 2', scores: {} },
    { id: 3, name: 'Meeskond 3', scores: {} },
    { id: 4, name: 'Meeskond 4', scores: {} },
    { id: 5, name: 'Meeskond 5', scores: {} }
  ]);
  const [activeTeam, setActiveTeam] = useState(1);

  // Handle assessor selection
  const handleAssessorSelect = (name) => {
    setAssessorName(name);
    setView('category');
  };

  // Handle team selection from sidebar
  const handleTeamSelect = (teamId) => {
    setActiveTeam(teamId);
  };

  // Handle category change or back to home
  const handleCategoryChange = (newCategory) => {
    if (newCategory === 'home') {
      setView('home');
    } else {
      setCategory(newCategory);
    }
  };

  // Handle scores update
  const handlePointsUpdate = (teamId, categoryKey, scores) => {
    setTeams(prevTeams => {
      return prevTeams.map(team => {
        if (team.id === teamId) {
          return {
            ...team,
            scores: {
              ...team.scores,
              [categoryKey]: scores
            }
          };
        }
        return team;
      });
    });
  };

  return (
    <div className="Home">
      {view === 'home' ? (
        <div className="content">
          <h1 className="title">KÜBERKÜPSETUS "OMLETT"</h1>
          <p className="aasta">2025</p>
          <p className="hindaja">KES ON HINDAJA</p>
          <div className="button-container">
            <button className="button" onClick={() => handleAssessorSelect('MARKO')}>MARKO</button>
            <button className="button" onClick={() => handleAssessorSelect('KALMER')}>KALMER</button>
          </div>
          <p className="tekst1">Sellel leheküljel saad hinnata küberküpsetusele "Omlett" esitatud töid</p>
          <hr></hr>
          <p className="tekst2">Sinu abimees tööde hindamisel</p>
        </div>
      ) : (
        <div className="category-view">
          <div className="category-content">
            <Sidebar 
              teams={teams} 
              activeTeam={activeTeam} 
              onTeamSelect={handleTeamSelect}
            />
            
            <CategoryPage 
              category={category} 
              assessorName={assessorName}
              teams={teams}
              activeTeam={activeTeam}
              onCategoryChange={handleCategoryChange}
              onPointsUpdate={handlePointsUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;