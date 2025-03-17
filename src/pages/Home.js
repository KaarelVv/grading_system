import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1>Welcome to Team Grading</h1>
      <p>Select your grader role to continue:</p>
      <div className="mt-3">
        <Button variant="primary" onClick={() => navigate("/grading?grader=1")}>
          Grader 1
        </Button>
        <Button variant="secondary" onClick={() => navigate("/grading?grader=2")} className="ms-3">
          Grader 2
        </Button>
      </div>
    </div>
  );
}

export default Home;
