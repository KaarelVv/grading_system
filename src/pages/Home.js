import { useNavigate } from "react-router-dom";
import "../assets/styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (grader, name) => {
    localStorage.setItem("grader", grader);
    localStorage.setItem("graderName", name);
    navigate("/grading", { state: { grader, name } });
  };

  return (
    <div className="home">
       <div className="transparent-container">
      <div className="content">
        <h1 className="title">KÜBERKÜPSETUS "OMLETT"</h1>
        <p className="aasta">2025</p>
        <p className="hindaja">Kes on hindaja?</p>

        <div className="button-container">
          <button className="button button--large" onClick={() => handleNavigate(1, "Kalmer")}>
            Kalmer
          </button>
          <button className="button button--large" onClick={() => handleNavigate(2, "Marko")}>
            Marko
          </button>
        </div>

        <p className="text1">Sellel leheküljel saad hinnata küberküpsetuse "Omlett" esitatud töid</p>
        <hr />
        <p className="text2">Sinu abimees tööde hindamisel</p>
      </div>
      </div>
    </div>
  );
};

export default Home;
