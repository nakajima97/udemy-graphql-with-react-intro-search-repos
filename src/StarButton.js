import React from "react";
import PropTypes from "prop-types";
import { ADD_STAR } from "./graphql";
import { useMutation } from "@apollo/client";

const StarButton = ({ node }) => {
  // eslint-disable-next-line
  const [addStar, { data }] = useMutation(ADD_STAR);

  const totalCount = node.stargazers.totalCount;
  const viewerHasStarred = node.viewerHasStarred;
  const starCount = totalCount === 1 ? "1 star" : `${totalCount} stars`;

  return (
    <button
      type="button"
      onClick={() =>
        addStar({ variables: { input: { starrableId: node.id } } })
      }
    >
      {starCount} | {viewerHasStarred ? "starred" : "-"}
    </button>
  );
};

export default StarButton;

StarButton.prototype = {
  node: PropTypes.array.isRequired,
};
