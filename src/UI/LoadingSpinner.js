import React from "react";
import "../assets/styles/LoadingSpinner.css"

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;
