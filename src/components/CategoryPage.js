import { useState } from 'react';
import { Button } from 'react-bootstrap';
import RatingScale from './RatingScale';
import ScoreBox from './ScoreBox';

function CategoryPage({ selectedTeam, onNextCategory }) {
  const [ratings, setRatings] = useState({
    disain: 0,
    interaktiivsus: 0,
    intuitiivsus: 0
  });

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  if (!selectedTeam) return <div className="category-page">Vali meeskond</div>;

  return (
    <div className="category-page">
      <div className="category-section">
        <h1>DISAIN</h1>
        <div className="rating-container">
          <RatingScale 
            value={ratings.disain} 
            onChange={(value) => handleRatingChange('disain', value)} 
            maxValue={10}
          />
          <ScoreBox value={ratings.disain} />
        </div>
        <div className="category-description">
          <h3>Visuaalne atraktiivsus ja ühtsus</h3>
          <p>Kas disain on professionaalne, ühtne ja esteetiliselt meeldiv?</p>
        </div>
      </div>

      <div className="category-section">
        <h3>Interaktiivsus ja animatsioonid</h3>
        <p>Kas animatsioonid on sujuvad ja UX-i toetavad? Kas menüü on kaasaegne?</p>
        <div className="rating-container">
          <RatingScale 
            value={ratings.interaktiivsus} 
            onChange={(value) => handleRatingChange('interaktiivsus', value)} 
            maxValue={10}
          />
          <ScoreBox value={ratings.interaktiivsus} />
        </div>
      </div>

      <div className="category-section">
        <h3>Intuitiivsus</h3>
        <p>Kas mäng on ilma juhendita arusaadav ja lihtne kasutada?</p>
        <div className="rating-container">
          <RatingScale 
            value={ratings.intuitiivsus} 
            onChange={(value) => handleRatingChange('intuitiivsus', value)} 
            maxValue={10}
          />
          <ScoreBox value={ratings.intuitiivsus} />
        </div>
      </div>

      {/* Järgmise kategooria nupp */}
      <div className="d-flex justify-content-end mt-4 mb-4">
        <Button 
          onClick={onNextCategory}
          style={{ backgroundColor: '#DE3C4B', color: '#EDF7F6', border: 'none' }}
        >
          Järgmine
        </Button>
      </div>
    </div>
  );
}

export default CategoryPage;
