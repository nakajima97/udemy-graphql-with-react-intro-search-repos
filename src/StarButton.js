import React from "react";
import PropTypes from "prop-types";

const StarButton = ({ node }) => {
  const totalCount = node.stargazers.totalCount;
  const viewerHasStarred = node.viewerHasStarred;
  const starCount = totalCount === 1 ? "1 star" : `${totalCount} stars`;

  return (
    <button type="button">
      {starCount} | {viewerHasStarred ? "starred" : "-"}
    </button>
  );
};

export default StarButton;

StarButton.prototype = {
  node: PropTypes.array.isRequired,
};
