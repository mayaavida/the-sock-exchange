import React from "react";

const Sock = ({ data }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Sock Details</h5>
        <div className="card-text">Size: {data.sockDetails.size}</div>
        <div className="card-text">Color: {data.sockDetails.color} </div>
        <div className="card-text">Pattern: {data.sockDetails.pattern}</div>
        <div className="card-text">Material: {data.sockDetails.material}</div>
        <div className="card-text">Condition: {data.sockDetails.condition}</div>
        <div className="card-text">For Foot: {data.sockDetails.forFoot}</div>
      </div>
      <div className="card-body">
        <h5 className="card-title">Additional Features</h5>
        <div className="card-text">
          Water Resistant:{" "}
          {data.additionalFeatures.waterResistant ? "Yes" : "No"}
        </div>
        <div className="card-text">
          Padded: {data.additionalFeatures.padded ? "Yes" : "No"}
        </div>
        <div className="card-text">
          Anti Bacterial: {data.additionalFeatures.antiBacterial ? "Yes" : "No"}
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">Added: {data.addedTimestamp}</small>
      </div>
    </div>
  );
};

export default Sock;
