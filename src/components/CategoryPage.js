import React, { useState, useEffect } from 'react';
import './CategoryPage.css';

const CategoryPage = ({ category, assessorName, teams, activeTeam, onCategoryChange }) => {
  const [teamScores, setTeamScores] = useState({});
  const [activeCategory, setActiveCategory] = useState(category);
  
  // Categories mapping
  const categories = ['design', 'facts', 'functionality'];
  const categoryTitles = {
    'design': 'DISAIN',
    'facts': 'ÕPETLIKKUS ja FAKTITÄPSUS',
    'functionality': 'FUNKTSIONAALSUS ja JÕUDLUS'
  };

  useEffect(() => {
    // Initialize scores from teams data if available
    if (teams && teams.length > 0) {
      const initialScores = {};
      teams.forEach(team => {
        initialScores[team.id] = {
          criteria1: team.scores?.[activeCategory]?.criteria1 || 0,
          criteria2: team.scores?.[activeCategory]?.criteria2 || 0,
          criteria3: team.scores?.[activeCategory]?.criteria3 || 0
        };
      });
      setTeamScores(initialScores);
    }
  }, [teams, activeCategory]);

  // Update active category when it changes externally
  useEffect(() => {
    if (categories.includes(category)) {
      setActiveCategory(category);
    }
  }, [category, categories]);

  const handlePointChange = (teamId, criteriaKey, increment) => {
    setTeamScores(prevScores => {
      const currentScore = prevScores[teamId]?.[criteriaKey] || 0;
      
      // Calculate new score with limits
      let newScore;
      // Adjust max points based on criteria and category
      let maxPoints = 10;
      if ((activeCategory === 'facts' && criteriaKey === 'criteria1') || 
          (activeCategory === 'functionality' && criteriaKey === 'criteria1')) {
        maxPoints = 13;
      }
      
      newScore = Math.min(Math.max(currentScore + increment, 0), maxPoints);
      
      const updatedTeamScores = {
        ...prevScores,
        [teamId]: {
          ...prevScores[teamId],
          [criteriaKey]: newScore
        }
      };
      
      return updatedTeamScores;
    });
  };

  const getCategoryDetails = () => {
    switch(activeCategory) {
      case 'facts':
        return {
          title: 'ÕPETLIKKUS ja FAKTITÄPSUS',
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
      case 'functionality':
        return {
          title: 'FUNKTSIONAALSUS ja JÕUDLUS',
          section1: {
            title: 'Vigade puudumine ja jõudlus',
            description: 'Kas mäng reageerib loogiliselt? Laeb viivitusteta? Kommunikeerib vigase sisendi veateatena?',
            maxPoints: 13
          },
          section2: {
            title: 'Dokumentatsioon ja help',
            description: 'Kas on kirjutatud korralik README ja vormistatud kasutusjuhend?',
            maxPoints: 10
          },
          section3: {
            title: 'Koodi loetavus ja struktuur',
            description: 'Kas kood on hästi organiseeritud, optimeeritud, kommenteeritud ja arusaadav? DRY?',
            maxPoints: 10
          }
        };
      case 'design':
      default:
        return {
          title: 'DISAIN',
          section1: {
            title: 'Visuaalne atraktiivsus',
            description: 'Kas mängu visuaalne disain on atraktiivne ja hästi teostatud?',
            maxPoints: 10
          },
          section2: {
            title: 'Kasutajaliidese selgus',
            description: 'Kas kasutajaliides on selge, intuitiivne ja hästi organiseeritud?',
            maxPoints: 10
          },
          section3: {
            title: 'Kasutajakogemuse sujuvus',
            description: 'Kas kasutajakogemus on sujuv ja meeldiv?',
            maxPoints: 10
          }
        };
    }
  };

  // Get the next category in sequence
  const getNextCategory = (currentCategory) => {
    const currentIndex = categories.indexOf(currentCategory);
    if (currentIndex === -1 || currentIndex === categories.length - 1) {
      return categories[0]; // Loop back to first category if at end or not found
    }
    return categories[currentIndex + 1];
  };

  const categoryDetails = getCategoryDetails();
  const currentTeam = teams?.find(t => t.id === activeTeam);
  
  if (!currentTeam || !teamScores[activeTeam]) {
    return <div className="loading">Laadimine...</div>;
  }

  const renderScoreControl = (criteriaKey, maxPoints) => {
    const score = teamScores[activeTeam]?.[criteriaKey] || 0;
    
    return (
      <div className="score-control">
        <button 
          className="score-button minus" 
          onClick={() => handlePointChange(activeTeam, criteriaKey, -1)}
          disabled={score <= 0}
        >
          -
        </button>
        <div className="score-display">{score}</div>
        <button 
          className="score-button plus" 
          onClick={() => handlePointChange(activeTeam, criteriaKey, 1)}
          disabled={score >= maxPoints}
        >
          +
        </button>
      </div>
    );
  };

  // Get the next category
  const handleNext = () => {
    const nextCategory = getNextCategory(activeCategory);
    
    setActiveCategory(nextCategory);
    
    // Inform parent about category change
    if (onCategoryChange) {
      onCategoryChange(nextCategory);
    }
  };

  // Get the previous category or go back to home
  const handleBack = () => {
    const categoryIndex = categories.indexOf(activeCategory);
    
    if (categoryIndex <= 0) {
      // Go back to home if we're at the first category
      if (onCategoryChange) {
        onCategoryChange('home');
      }
    } else {
      // Go to previous category
      const prevCategory = categories[categoryIndex - 1];
      
      setActiveCategory(prevCategory);
      
      // Inform parent about category change
      if (onCategoryChange) {
        onCategoryChange(prevCategory);
      }
    }
  };

  // Dot click handler
  const handleDotClick = (index) => {
    // Change category based on dot index
    const newCategory = categories[index];
    
    if (newCategory !== activeCategory) {
      setActiveCategory(newCategory);
      
      // Inform parent about category change
      if (onCategoryChange) {
        onCategoryChange(newCategory);
      }
    }
  };

  return (
    <div className="category-page">
      <div className="assessor-info">
        <div className="meeskonna-nimi">
          <div className="category-name">{categoryTitles[activeCategory]}</div>
          <div className="team-name">{currentTeam.name}</div>
        </div>
      </div>
      
      {/* Dot navigation - just 3 dots (one per category) */}
      <div className="dot-navigation">
        {categories.map((cat, index) => (
          <div 
            key={index}
            className={`dot ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      
      <div className="criteria-sections">
        <div className="criteria-section">
          <h3>{categoryDetails.section1.title}</h3>
          <p>{categoryDetails.section1.description}</p>
          {renderScoreControl('criteria1', categoryDetails.section1.maxPoints)}
        </div>
        
        <div className="criteria-section">
          <h3>{categoryDetails.section2.title}</h3>
          <p>{categoryDetails.section2.description}</p>
          {renderScoreControl('criteria2', categoryDetails.section2.maxPoints)}
        </div>
        
        <div className="criteria-section">
          <h3>{categoryDetails.section3.title}</h3>
          <p>{categoryDetails.section3.description}</p>
          {renderScoreControl('criteria3', categoryDetails.section3.maxPoints)}
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