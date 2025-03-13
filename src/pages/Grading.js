import React, { useState, useEffect } from 'react';

const GradingPage = () => {
	const [teams, setTeams] = useState([]);

	// Fetch teams from public JSON
	useEffect(() => {
    	fetch('/data.json')
        	.then(response => response.json())
        	.then(data => setTeams(data.teams))
        	.catch(error => console.error('Error fetching teams:', error));
	}, []);

	// Update score locally
	const updateScore = (teamId, subcategory, value) => {
    	setTeams(prevTeams =>
        	prevTeams.map(team =>
            	team.id === teamId
                	? {
                    	...team,
                    	subcategories: {
                        	...team.subcategories,
                        	[subcategory]: value
                    	},
                    	points: Object.values({
                        	...team.subcategories,
                        	[subcategory]: value
                    	}).reduce((sum, val) => sum + val, 0)
                	}
                	: team
        	)
    	);
	};

	// Download updated JSON file
	const downloadJson = () => {
    	const updatedJson = JSON.stringify({ teams }, null, 2);
    	const blob = new Blob([updatedJson], { type: "application/json" });
    	const url = URL.createObjectURL(blob);
    	const a = document.createElement("a");
    	a.href = url;
    	a.download = "updated_teams.json";
    	document.body.appendChild(a);
    	a.click();
    	document.body.removeChild(a);
	};

	return (
    	<div>
        	<h1>Grading Page</h1>
        	<table border="1">
            	<thead>
                	<tr>
                    	<th>Team</th>
                    	<th>Speed</th>
                    	<th>Accuracy</th>
                    	<th>Creativity</th>
                    	<th>Total Points</th>
                	</tr>
            	</thead>
            	<tbody>
                	{teams.map(team => (
                    	<tr key={team.id}>
                        	<td>{team.name}</td>
                        	{Object.keys(team.subcategories).map(sub => (
                            	<td key={sub}>
                                	<input
                                    	type="number"
                                    	value={team.subcategories[sub]}
                                    	onChange={(e) =>
                                        	updateScore(team.id, sub, parseInt(e.target.value) || 0)
                                    	}
                                	/>
                            	</td>
                        	))}
                        	<td>{team.points}</td>
                    	</tr>
                	))}
            	</tbody>
        	</table>
        	<button onClick={downloadJson}>Download Updated JSON</button>
    	</div>
	);
};

export default GradingPage;
