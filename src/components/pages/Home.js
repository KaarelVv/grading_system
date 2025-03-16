import React from "react";
import "./Home.css";
import backgroundImage from "./background.jpeg"; // Adjust the path accordingly


const Home = () => {
  return (
    <div className="Home">
      <div className="content">
        <h1 className="title">KÜBERKÜPSETUS "OMLETT"</h1>
        <p className="aasta">2025</p>
        <p className="hindaja">KES ON HINDAJA</p>

        <div className="button-container">
          <button className="button">MARKO</button>
          <button className="button">KALMER</button>
        </div>
        <p className="tekst1">Sellel leheküljel saad hinnata küberküpsetusele "Omlett" esitatud töid</p>
      <hr></hr>
      <p className="tekst2">Sinu abimees tööde hindamisel</p>
      </div>
    </div>
  );
};

export default Home;