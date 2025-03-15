import { useEffect, useState } from "react";
import axios from "axios";

const scriptUrl = "https://script.google.com/macros/s/AKfycbyvwNFLOII_TFbNMZhda4wsGfKeT77j-uSGfM-R29s3x6dzV-sm_V3g6nD03tXQ66lX2A/exec";

const ScoreTable = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(scriptUrl);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  return { teams, fetchTeams };
};

export default ScoreTable;

