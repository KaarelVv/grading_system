import React, { useState, useEffect } from 'react';
import './CategoryPage.css';

const CategoryPage = ({ category, assessorName, teams, onPointsUpdate }) => {
  const [teamScores, setTeamScores] = useState({});
  const [activeTeam, setActiveTeam] = useState(null);
  const [activeDot, setActiveDot] = useState(0);
  const [activeCategory, setActiveCategory] = useState(category);
  const totalDots = 8;

  // Categories mapping to indexes
  const categories = ['design', 'facts', 'functionality'];

  useEffect(() => {
    // Initialize scores from teams data if available
    if (teams && teams.length > 0) {
      const initialScores = {};
      teams.forEach(team => {
        initialScores[team.id] = {
          criteria1: team.scores?.[category]?.criteria1 || 0,
          criteria2: team.scores?.[category]?.criteria2 || 0,
          criteria3: team.scores?.[category]?.criteria3 || 0
        };
      });
      setTeamScores(initialScores);
      setActiveTeam(teams[0].id);
    }
  }, [teams, category]);

  const handlePointChange = (teamId, criteriaKey, increment) => {
    setTeamScores(prevScores => {
      const currentScore = prevScores[teamId]?.[criteriaKey] || 0;
      
      // Calculate new score with limits
      let newScore;
      if (criteriaKey === 'criteria1') {
        newScore = Math.min(Math.max(currentScore + increment, 0), 13);
      } else {
        newScore = Math.min(Math.max(currentScore + increment, 0), 10);
      }
      
      const updatedTeamScores = {
        ...prevScores,
        [teamId]: {
          ...prevScores[teamId],
          [criteriaKey]: newScore
        }
      };
      
      // Call the parent component's update handler
      if (onPointsUpdate) {
        onPointsUpdate(teamId, activeCategory, {
          ...updatedTeamScores[teamId]
        });
      }
      
      return updatedTeamScores;
    });
  };

  const getCategoryDetails = () => {
    switch(activeCategory) {
      case 'design':
        return {
          title: 'ÕPETLIKKUS ja FAKTITÄPSUS',
          titleRight: 'FUNKTSIONAALSUS ja JÕUDLUS',
          section1: {
            title: 'Seotus küberturbega',
            description: 'Kas mängu sisu on teemakohane ja küberjulgeolekuga seotud?',
            maxPoints: 13
          },
          section2: {
            title: 'Faktide täpsus ja usaldusväärsus',
            description: 'Kas info põhineb usaldusväärsetel allikatel ja on faktitäpne?',
            maxPoints: 10
          },
          section3: {
            title: 'Õpitav väärtus',
            description: 'Kas mäng annab mängijale kasulikke teadmisi?',
            maxPoints: 10
          }
        };
    }
  };

  const categoryDetails = getCategoryDetails();
  const currentTeam = teams?.find(t => t.id === activeTeam);
  
  if (!currentTeam || !teamScores[activeTeam]) {
    return <div className="loading">Laadimine...</div>;
  }

  const renderScoreControl = (teamId, criteriaKey, maxPoints) => {
    const score = teamScores[teamId]?.[criteriaKey] || 0;
    
    return (
      <div className="score-control">
        <button 
          className="score-button minus" 
          onClick={() => handlePointChange(teamId, criteriaKey, -1)}
          disabled={score <= 0}
        >
          -
        </button>
        <div className="score-display">{score}</div>
        <button 
          className="score-button plus" 
          onClick={() => handlePointChange(teamId, criteriaKey, 1)}
          disabled={score >= maxPoints}
        >
          +
        </button>
      </div>
    );
  };

  // Dot navigation handlers
  const handleNext = () => {
    const nextDot = activeDot < totalDots - 1 ? activeDot + 1 : activeDot;
    setActiveDot(nextDot);
    
    // Change category if needed
    const categoryIndex = Math.floor(nextDot / 3) % categories.length;
    setActiveCategory(categories[categoryIndex]);
  };

  const handleBack = () => {
    const prevDot = activeDot > 0 ? activeDot - 1 : activeDot;
    setActiveDot(prevDot);
    
    // Change category if needed
    const categoryIndex = Math.floor(prevDot / 3) % categories.length;
    setActiveCategory(categories[categoryIndex]);
  };

  // Dot click handler
  const handleDotClick = (index) => {
    setActiveDot(index);
    
    // Change category based on dot index
    const categoryIndex = Math.floor(index / 3) % categories.length;
    setActiveCategory(categories[categoryIndex]);
  };

  return (
    <div className="category-page">
      <div className="assessor-info">
        <div className="meeskonna-nimi">
          MEESKONNA NIMI
          <div className="team-name">{currentTeam.name}</div>
          <div className="category-name">{categoryDetails.title}</div>
        </div>
      </div>
      
      {/* Dot navigation */}
      <div className="dot-navigation">
        {[...Array(totalDots)].map((_, index) => (
          <div 
            key={index}
            className={`dot ${activeDot === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      
      <div className="criteria-sections">
        <div className="criteria-section">
          <h3>{categoryDetails.section1.title}</h3>
          <p>{categoryDetails.section1.description}</p>
          {renderScoreControl(activeTeam, 'criteria1', categoryDetails.section1.maxPoints)}
        </div>
        
        <div className="criteria-section">
          <h3>{categoryDetails.section2.title}</h3>
          <p>{categoryDetails.section2.description}</p>
          {renderScoreControl(activeTeam, 'criteria2', categoryDetails.section2.maxPoints)}
        </div>
        
        <div className="criteria-section">
          <h3>{categoryDetails.section3.title}</h3>
          <p>{categoryDetails.section3.description}</p>
          {renderScoreControl(activeTeam, 'criteria3', categoryDetails.section3.maxPoints)}
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="button tagasi" onClick={handleBack}>TAGASI</button>
        <button className="button järgmine" onClick={handleNext}>JÄRGMINE</button>
      </div>
    </div>
  );
};

export default CategoryPage;