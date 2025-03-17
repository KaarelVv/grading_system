import React from "react";

const ScoreRow = ({ team, index, updateValue, updating }) => {
  return (
    <tr className={updating === team.Team ? "table-warning" : ""}>
      <td><strong>{team.Team}</strong></td>
      <td>
        <button className="btn btn-danger btn-sm mx-1" onClick={() => updateValue(index, "Category", -1)}>-</button>
        {team.Category}
        <button className="btn btn-success btn-sm mx-1" onClick={() => updateValue(index, "Category", 1)}>+</button>
      </td>
      <td>
        <button className="btn btn-danger btn-sm mx-1" onClick={() => updateValue(index, "Ability", -1)}>-</button>
        {team.Ability}
        <button className="btn btn-success btn-sm mx-1" onClick={() => updateValue(index, "Ability", 1)}>+</button>
      </td>
      <td>
        <button className="btn btn-danger btn-sm mx-1" onClick={() => updateValue(index, "Functionality", -1)}>-</button>
        {team.Functionality}
        <button className="btn btn-success btn-sm mx-1" onClick={() => updateValue(index, "Functionality", 1)}>+</button>
      </td>
      <td>
        {updating === team.Team ? (
          <div className="spinner-border spinner-border-sm text-secondary" role="status">
            <span className="visually-hidden">Updating...</span>
          </div>
        ) : (
          team.Total
        )}
      </td>
    </tr>
  );
};

export default ScoreRow;
