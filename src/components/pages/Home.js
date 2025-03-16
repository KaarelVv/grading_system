import React from "react";
import { useState } from 'react';
import "./Home.css";
import backgroundImage from "./background.jpeg"; // Adjust the path accordingly
import CategoryPage from '../CategoryPage'
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

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  // Go back to home screen
  const handleBackToHome = () => {
    setView('home');
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
          <div className="category-tabs">
          </div>
          
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
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
