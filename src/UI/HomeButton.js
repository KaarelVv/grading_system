import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"; 

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate("/")}>
      Home
    </Button>
  );
};

export default HomeButton;
