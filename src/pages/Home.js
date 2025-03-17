import { useNavigate } from "react-router-dom";
import "../assets/styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="Home">
      <div className="content">
        <h1 className="title">KÜBERKÜPSETUS "OMLETT"</h1>
        <p className="aasta">2025</p>
        <p className="hindaja">Kes on hindaja?</p>
        
        <div className="button-container">
          <button className="button" onClick={() => navigate("/grading?grader=1")}>
            Kalmer
          </button>
          <button className="button" onClick={() => navigate("/grading?grader=2")}>
            Marko
          </button>
        </div>
        
        <p className="tekst1">Sellel leheküljel saad hinnata küberküpsetusele "Omlett" esitatud töid</p>
        <hr />
        <p className="tekst2">Sinu abimees tööde hindamisel</p>
      </div>
    </div>
  );
}

export default Home;