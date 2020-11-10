import React from "react";
import PullRequest from "./PullRequest";
import { createFragmentContainer, graphql } from "react-relay";
import type { PullRequestList_repository } from "__generated__/PullRequestList_repository.graphql";

const PullRequestList = ({
  repository
}: {
  repository: PullRequestList_repository
}) => (
  <section className="section">
    <div className="container">
      {repository.pullRequests != null && repository.pullRequests.edges != null
        ? repository.pullRequests.edges.map(edge => {
            if (edge != null && edge.node != null) {
              return <PullRequest key={edge.node.id} pullRequest={edge.node} />;
            } else {
              return null;
            }
          })
        : null}
    </div>
  </section>
);

export default createFragmentContainer(
  PullRequestList,
  {
    repository: graphql`
      fragment PullRequestList_repository on Repository {
        pullRequests(first: 10, after: $cursor)
          @connection(key: "PullRequestList_pullRequests") {
          edges {
            node {
              id
              ...PullRequest_pullRequest
            }
          }
        }
        id
      }
    `
  }
);
