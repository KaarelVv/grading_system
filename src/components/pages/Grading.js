import React, { useState } from "react";
import ScoreTable from "../fetch/ScoreTable";


const Grading = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div >
      <ScoreTable></ScoreTable>
    </div>
  );
};

export default Grading;

