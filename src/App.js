import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Grading from "./pages/Grading";
import Result from "./pages/Result";
import "./assets/styles/App.css";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grading" element={<Grading />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
