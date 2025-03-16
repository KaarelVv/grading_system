import { useState, useEffect } from "react";
import axios from "axios";

const scriptUrl = "https://script.google.com/macros/s/AKfycby_vk5mcIuqKLz5g6fdYHgDHWaqTzcEG47HBKkLW3AO8np_MgByjS3Rt_Kmo0Vn7TcD/exec";

const useFetchTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await axios.get(scriptUrl);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  return { teams, setTeams, loading };
};

export default useFetchTeams;




