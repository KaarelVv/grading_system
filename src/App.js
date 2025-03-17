import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Grading from "./pages/Grading";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grading" element={<Grading />} />
      
    </Routes>
  );
}

export default App;
