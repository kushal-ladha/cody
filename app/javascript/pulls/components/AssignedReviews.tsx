import React from "react";
import { createPaginationContainer, graphql, RelayPaginationProp } from "react-relay";
import { AssignedReviews_viewer } from "./__generated__/AssignedReviews_viewer.graphql";
import { Link } from "react-router-dom";
import LoadMore from "./LoadMore";

function AssignedReviews({ relay, viewer }: { relay: RelayPaginationProp, viewer: AssignedReviews_viewer }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-size-4">Assigned Code Reviews</h2>
        {viewer.reviews.edges.map(({ node }) => {
          return (
            <div className="box">
              {node.reviewRule ? (
                <span className="tag is-info">{node.reviewRule.name}</span>
              ) : (
                <span className="tag">Direct Assignment</span>
              )}
              <div className="level">
                <div className="level-left code">
                  <div className="level-item">
                    <strong>{`${node.pullRequest.repository}#${node.pullRequest.number}`}</strong>
                  </div>
                  <div className="level-item">{node.pullRequest.status}</div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <Link
                      to={`/repos/${node.pullRequest.repository}/pull/${node.pullRequest.number}`}
                      className="button"
                      title={`${node.pullRequest.repository}#${node.pullRequest.number}`}
                    >
                      &bull; &bull; &bull;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <LoadMore relay={relay} />
      </div>
    </section>
  );
}

export default createPaginationContainer(
  AssignedReviews,
  {
    viewer: graphql`
      fragment AssignedReviews_viewer on User
      @argumentDefinitions(
        count: { type: "Int!", defaultValue: 10 }
        cursor: { type: "String" }
        status: { type: "ReviewerStatus", defaultValue: PENDING_APPROVAL }
      ) {
        reviews: assignedReviews(first: $count, after: $cursor, status: $status)
          @connection(key: "AssignedReviews_reviews") {
          edges {
            node {
              id
              status
              reviewRule {
                name
              }
              pullRequest {
                repository
                number
                status
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.reviews;
    },
    getVariables(props, { count, cursor }, fragmentVars) {
      return {
        count,
        cursor,
        status: fragmentVars.status
      };
    },
    query: graphql`
      query AssignedReviewsPaginationQuery($count: Int!, $cursor: String, $status: ReviewerStatus) {
        viewer {
          ...AssignedReviews_viewer @arguments(count: $count, cursor: $cursor, status: $status)
        }
      }
    `,
  }
);