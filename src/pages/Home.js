import { useNavigate } from "react-router-dom";
import "../assets/styles/Home.css";



const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1 className="title">KÜBERKÜPSETUS "OMLETT"</h1>
      <p className="aasta">2025</p>
      <p className="hindaja">Kes on hindaja?</p>
      <div className="mt-3">
        <button className="button" onClick={() => navigate("/grading?grader=1")}>
          Kalmer
        </button>
        <button className="button ms-3" onClick={() => navigate("/grading?grader=2")}>
          Marko
        </button>
        <p className="tekst1">Sellel leheküljel saad hinnata küberküpsetusele "Omlett" esitatud töid</p>
          <hr></hr>
          <p className="tekst2">Sinu abimees tööde hindamisel</p>
      </div>
    </div>
  );
}

export default Home;
