import React from "react";
import { Link } from "react-router-dom";

const SwipeButton = () => {
  return (
    <Link to="/HangoutSwipe" style={{ textDecoration: "none" }}>
      <div
        style={{
          backgroundColor: "#FF5757",
          width: "98%",
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
          cursor: "pointer", // Add cursor pointer for better UX
        }}
      >
        <span style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Swipe Hangout
        </span>
      </div>
    </Link>
  );
};

export default SwipeButton;
