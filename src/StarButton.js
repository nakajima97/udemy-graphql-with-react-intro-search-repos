import React from "react";
import PropTypes from "prop-types";

const StarButton = ({ node }) => {
  const totalCount = node.stargazers.totalCount;

  return (
    <button type="button">
      {totalCount === 1 ? "1 star" : `${totalCount} stars`}
    </button>
  );
};

export default StarButton;

StarButton.prototype = {
  node: PropTypes.array.isRequired,
};
