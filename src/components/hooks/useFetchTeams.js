import { useState, useEffect } from "react";
import axios from "axios";

const scriptUrl = "https://script.google.com/macros/s/AKfycbwmLxQv3MBOSyN5EBc4hZnQ_nhEx-scUc3WY-e0Xa2xY-DoT45D2wKoce_N9VjElzD8CA/exec";

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




