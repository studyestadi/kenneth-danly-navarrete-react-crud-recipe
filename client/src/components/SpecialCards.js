import React from "react";

const SpecialCards = ({ special }) => {
  return special && (
    <div className="special">
      <h4>Hey! This is special!</h4>
      <p>{special.type}</p>
      <p>{special.text}</p>
    </div>
  ) ? (
    <div className="special">
      <h4>Hey! This is special!</h4>
      <p>{special.type}</p>
      <p>{special.text}</p>
    </div>
  ) : (
    ""
  );
};

export default SpecialCards;
