import React from "react";
import PropTypes from "prop-types";
import { ADD_STAR, REMOVE_STAR } from "./graphql";
import { useMutation } from "@apollo/client";

const StarButton = ({ node, refetch }) => {
  const [addStar] = useMutation(ADD_STAR, {
    onCompleted() {
      refetch();
    },
  });
  const [removeStar] = useMutation(REMOVE_STAR, {
    onCompleted() {
      refetch();
    },
  });

  const totalCount = node.stargazers.totalCount;
  const viewerHasStarred = node.viewerHasStarred;
  const starCount = totalCount === 1 ? "1 star" : `${totalCount} stars`;

  return (
    <button
      type="button"
      onClick={() =>
        viewerHasStarred
          ? removeStar({ variables: { input: { starrableId: node.id } } })
          : addStar({ variables: { input: { starrableId: node.id } } })
      }
    >
      {starCount} | {viewerHasStarred ? "starred" : "-"}
    </button>
  );
};

export default StarButton;

StarButton.prototype = {
  node: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired,
};
