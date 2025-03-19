// import { updateTeamScore } from "../api/teamService";

// function isRateLimited() {
//     const lastSubmission = localStorage.getItem("lastSubmission");
  
//     if (lastSubmission && Date.now() - lastSubmission < 10000) { // 10 seconds cooldown
//       alert("You've already submitted. Please wait a few seconds.");
//       return true;
//     }
  
//     localStorage.setItem("lastSubmission", Date.now());
//     return false;
//   }
  
//   // Use before sending an update
//   async function submitScore(grader, teamName, formData) {
//     if (isRateLimited()) return;
    
//     await updateTeamScore(grader, teamName, formData);
//   }
  