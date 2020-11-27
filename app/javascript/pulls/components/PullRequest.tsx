import React from "react";
import { CheckCircle, ChevronRight, Circle, GitPullRequest, XCircle } from "react-feather";
import { createFragmentContainer, graphql } from "react-relay";
import { Link } from "react-router-dom";
import type { PullRequest_pullRequest } from "./__generated__/PullRequest_pullRequest.graphql";

function iconForStatus(status: string): JSX.Element {
  switch(status) {
    case "pending_review":
      return <Circle className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-300" />;
    case "approved":
      return <CheckCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500" />;
    case "closed":
      return <XCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-500" />;
  }
}

function messageForStatus(status: string): string {
  switch(status) {
    case "pending_review":
      return "Pending Review";
    case "approved":
      return "Approved";
    case "closed":
      return "Closed";
  }
}

function PullRequest({
  pullRequest: { number, repository, status },
}: {
  pullRequest: PullRequest_pullRequest;
}): JSX.Element {
  return (
    <li>
      <Link
        to={`/repos/${repository}/pull/${number}`}
        className="block hover:bg-gray-50"
      >
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="flex-shrink-0">
              <GitPullRequest />
            </div>
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <p className="text-sm font-medium truncate">{`${repository}#${number}`}</p>
                <p className="mt-2 flex items-center text-sm text-gray-500" data-testid="pull-request-status">
                  {iconForStatus(status)}
                  {messageForStatus(status)}
                </p>
              </div>
            </div>
            <div>
              <ChevronRight />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default createFragmentContainer(PullRequest, {
  pullRequest: graphql`
    fragment PullRequest_pullRequest on PullRequest {
      id
      repository
      number
      status
    }
  `,
});
