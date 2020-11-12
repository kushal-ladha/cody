/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewerStatus = "APPROVED" | "PENDING_APPROVAL" | "%future added value";
export type AssignedReviewsPaginationQueryVariables = {
    count: number;
    cursor?: string | null;
    status?: ReviewerStatus | null;
};
export type AssignedReviewsPaginationQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"AssignedReviews_viewer">;
    } | null;
};
export type AssignedReviewsPaginationQuery = {
    readonly response: AssignedReviewsPaginationQueryResponse;
    readonly variables: AssignedReviewsPaginationQueryVariables;
};



/*
query AssignedReviewsPaginationQuery(
  $count: Int!
  $cursor: String
  $status: ReviewerStatus
) {
  viewer {
    ...AssignedReviews_viewer_4qXjrI
    id
  }
}

fragment AssignedReviews_viewer_4qXjrI on User {
  reviews: assignedReviews(first: $count, after: $cursor, status: $status) {
    edges {
      node {
        id
        status
        reviewRule {
          name
          id
        }
        pullRequest {
          repository
          number
          status
          id
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status"
  }
],
v1 = {
  "kind": "Variable",
  "name": "status",
  "variableName": "status"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AssignedReviewsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "AssignedReviews_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AssignedReviewsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "reviews",
            "args": (v2/*: any*/),
            "concreteType": "ReviewerConnection",
            "kind": "LinkedField",
            "name": "assignedReviews",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ReviewerEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Reviewer",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ReviewRule",
                        "kind": "LinkedField",
                        "name": "reviewRule",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PullRequest",
                        "kind": "LinkedField",
                        "name": "pullRequest",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "repository",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "number",
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "reviews",
            "args": (v2/*: any*/),
            "filters": [
              "status"
            ],
            "handle": "connection",
            "key": "AssignedReviews_reviews",
            "kind": "LinkedHandle",
            "name": "assignedReviews"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "71e9f78cdb701284e3730c756ebe318d",
    "id": null,
    "metadata": {},
    "name": "AssignedReviewsPaginationQuery",
    "operationKind": "query",
    "text": "query AssignedReviewsPaginationQuery(\n  $count: Int!\n  $cursor: String\n  $status: ReviewerStatus\n) {\n  viewer {\n    ...AssignedReviews_viewer_4qXjrI\n    id\n  }\n}\n\nfragment AssignedReviews_viewer_4qXjrI on User {\n  reviews: assignedReviews(first: $count, after: $cursor, status: $status) {\n    edges {\n      node {\n        id\n        status\n        reviewRule {\n          name\n          id\n        }\n        pullRequest {\n          repository\n          number\n          status\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5b7b16020b495a2332c2151947cda835';
export default node;
