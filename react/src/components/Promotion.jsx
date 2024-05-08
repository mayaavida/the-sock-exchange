import React from "react";

const Promotion = ({ data }) => {
  return (
    <div className="card">
      <div className="card bg-light">
        <p>{data.feature}</p>
        <a href="#">Click to buy!</a>
      </div>
    </div>
  );
};

export default Promotion;
