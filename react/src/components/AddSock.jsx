import React, { useState } from "react";

const AddSock = () => {
  const [userId, setUserId] = useState("");
  const [sockSize, setSockSize] = useState("");
  const [sockColor, setSockColor] = useState("");
  const [sockPattern, setSockPattern] = useState("");
  const [sockMaterial, setSockMaterial] = useState("");
  const [sockCondition, setSockCondition] = useState("");
  const [sockFoot, setSockFoot] = useState("");
  const [waterResistant, setWaterResistant] = useState(false);
  const [padded, setPadded] = useState(false);
  const [antiBacterial, setAntiBacterial] = useState(false);

  let newSock = {
    userId: userId,
    sockDetails: {
      size: sockSize,
      color: sockColor,
      pattern: sockPattern,
      material: sockMaterial,
      condition: sockCondition,
      forFoot: sockFoot,
    },
    additionalFeatures: {
      waterResistant: waterResistant,
      padded: padded,
      antiBacterial: antiBacterial,
    },
    addedTimestamp: new Date(),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("info: ", newSock);

    fetch("https://ecs.the-sock-exchange.com/api/socks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSock),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });

    setAntiBacterial("");
    setPadded("");
    setSockColor("");
    setSockCondition("");
    setSockMaterial("");
    setSockPattern("");
    setSockFoot("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Add a Sock</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">User ID</label>
              <input
                onChange={(e) => setUserId(e.target.value)}
                value={userId}
                type="text"
                className="form-control"
                id="userId"
                name="userId"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Sock Color</label>
              <input
                onChange={(e) => setSockColor(e.target.value)}
                value={sockColor}
                type="text"
                className="form-control"
                id="sockColor"
                name="sockColor"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Sock Size</label>
              <input
                onChange={(e) => setSockSize(e.target.value)}
                value={sockSize}
                type="text"
                className="form-control"
                id="sockSize"
                name="sockSize"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Sock Pattern</label>
              <input
                onChange={(e) => setSockPattern(e.target.value)}
                value={sockPattern}
                type="text"
                className="form-control"
                id="sockPattern"
                name="sockPattern"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Sock Material</label>
              <input
                onChange={(e) => setSockMaterial(e.target.value)}
                value={sockMaterial}
                type="text"
                className="form-control"
                id="sockMaterial"
                name="sockMaterial"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Sock Condition</label>
              <input
                onChange={(e) => setSockCondition(e.target.value)}
                value={sockCondition}
                type="text"
                className="form-control"
                id="sockCondition"
                name="sockCondition"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">For Foot</label>
              <input
                onChange={(e) => setSockFoot(e.target.value)}
                value={sockFoot}
                type="text"
                className="form-control"
                id="sockFoot"
                name="sockFoot"
              />
            </div>
            <button id="loginButton" type="submit" className="btn btn-primary">
              Submit
            </button>
            <div id="message"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSock;
