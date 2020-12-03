/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewDashboardResultsSnapshotQueryVariables = {};
export type ReviewDashboardResultsSnapshotQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ReviewDashboardResults_viewer">;
    } | null;
};
export type ReviewDashboardResultsSnapshotQuery = {
    readonly response: ReviewDashboardResultsSnapshotQueryResponse;
    readonly variables: ReviewDashboardResultsSnapshotQueryVariables;
};



/*
query ReviewDashboardResultsSnapshotQuery {
  viewer {
    ...ReviewDashboardResults_viewer
    id
  }
}

fragment ReviewDashboardResults_viewer on User {
  assignedReviews(first: 10, status: PENDING_APPROVAL) {
    edges {
      node {
        id
        reviewRule {
          name
          id
        }
        pullRequest {
          id
          createdAt
          repository
          number
          reviewers {
            nodes {
              id
              login
              status
            }
          }
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
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "status",
    "value": "PENDING_APPROVAL"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ReviewerConnection"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ReviewDashboardResultsSnapshotQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "ReviewDashboardResults_viewer"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ReviewDashboardResultsSnapshotQuery",
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
            "alias": null,
            "args": (v0/*: any*/),
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
                      (v1/*: any*/),
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
                          (v1/*: any*/)
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
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "createdAt",
                            "storageKey": null
                          },
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ReviewerConnection",
                            "kind": "LinkedField",
                            "name": "reviewers",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Reviewer",
                                "kind": "LinkedField",
                                "name": "nodes",
                                "plural": true,
                                "selections": [
                                  (v1/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "login",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "status",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
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
            "storageKey": "assignedReviews(first:10,status:\"PENDING_APPROVAL\")"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "filters": [
              "status",
              "reviewRule",
              "repository"
            ],
            "handle": "connection",
            "key": "ReviewDashboardResults_assignedReviews",
            "kind": "LinkedHandle",
            "name": "assignedReviews"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "97986be649d72d1ec900539f9fb1bde9",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "viewer.assignedReviews": (v2/*: any*/),
        "viewer.assignedReviews.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ReviewerEdge"
        },
        "viewer.assignedReviews.edges.cursor": (v3/*: any*/),
        "viewer.assignedReviews.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Reviewer"
        },
        "viewer.assignedReviews.edges.node.__typename": (v3/*: any*/),
        "viewer.assignedReviews.edges.node.id": (v4/*: any*/),
        "viewer.assignedReviews.edges.node.pullRequest": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PullRequest"
        },
        "viewer.assignedReviews.edges.node.pullRequest.createdAt": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ISO8601DateTime"
        },
        "viewer.assignedReviews.edges.node.pullRequest.id": (v4/*: any*/),
        "viewer.assignedReviews.edges.node.pullRequest.number": (v3/*: any*/),
        "viewer.assignedReviews.edges.node.pullRequest.repository": (v3/*: any*/),
        "viewer.assignedReviews.edges.node.pullRequest.reviewers": (v2/*: any*/),
        "viewer.assignedReviews.edges.node.pullRequest.reviewers.nodes": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Reviewer"
        },
        "viewer.assignedReviews.edges.node.pullRequest.reviewers.nodes.id": (v4/*: any*/),
        "viewer.assignedReviews.edges.node.pullRequest.reviewers.nodes.login": (v3/*: any*/),
        "viewer.assignedReviews.edges.node.pullRequest.reviewers.nodes.status": {
          "enumValues": [
            "APPROVED",
            "PENDING_APPROVAL"
          ],
          "nullable": false,
          "plural": false,
          "type": "ReviewerStatus"
        },
        "viewer.assignedReviews.edges.node.reviewRule": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ReviewRule"
        },
        "viewer.assignedReviews.edges.node.reviewRule.id": (v4/*: any*/),
        "viewer.assignedReviews.edges.node.reviewRule.name": (v3/*: any*/),
        "viewer.assignedReviews.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewer.assignedReviews.pageInfo.endCursor": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "viewer.assignedReviews.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.id": (v4/*: any*/)
      }
    },
    "name": "ReviewDashboardResultsSnapshotQuery",
    "operationKind": "query",
    "text": "query ReviewDashboardResultsSnapshotQuery {\n  viewer {\n    ...ReviewDashboardResults_viewer\n    id\n  }\n}\n\nfragment ReviewDashboardResults_viewer on User {\n  assignedReviews(first: 10, status: PENDING_APPROVAL) {\n    edges {\n      node {\n        id\n        reviewRule {\n          name\n          id\n        }\n        pullRequest {\n          id\n          createdAt\n          repository\n          number\n          reviewers {\n            nodes {\n              id\n              login\n              status\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'eb44f26551c2adceec9c55bd633cfd5d';
export default node;
