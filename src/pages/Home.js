import { useNavigate } from "react-router-dom";
import "../assets/styles/Home.css";



const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1>Welcome to Team Grading</h1>
      <p>Select your grader role to continue:</p>
      <div className="mt-3">
        <button className="button" onClick={() => navigate("/grading?grader=1")}>
          Grader 1
        </button>
        <button className="button ms-3" onClick={() => navigate("/grading?grader=2")}>
          Grader 2
        </button>
      </div>
    </div>
  );
}

export default Home;
