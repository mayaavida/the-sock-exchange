import React from "react";

const FeatureBar = () => {
  return (
    <div>
      <h4>Featured</h4>
      <div
        className="card-container d-flex flex-row justify-content-start"
        style={{ gap: "20px", padding: "20px" }}
      >
        <div className="card">
          <div className="card bg-light">
            <p>Moisture-wicking fabric</p>
            <a href="#">Click to buy!</a>
          </div>
        </div>
        <div className="card">
          <div className="card bg-light">
            <p>Compression technology</p>
            <a href="#">Click to buy!</a>
          </div>
        </div>
        <div className="card">
          <div className="card bg-light">
            <p>Anti-odor technology</p>
            <a href="#">Click to buy!</a>
          </div>
        </div>
        <div className="card">
          <div className="card bg-light">
            <p>Eco-friendly materials</p>
            <a href="#">Click to buy!</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBar;
