/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AssignedRouteQueryVariables = {
    reviewRuleName?: string | null;
    repositoryName?: string | null;
};
export type AssignedRouteQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ReviewDashboardResults_viewer">;
    } | null;
};
export type AssignedRouteQuery = {
    readonly response: AssignedRouteQueryResponse;
    readonly variables: AssignedRouteQueryVariables;
};



/*
query AssignedRouteQuery(
  $reviewRuleName: String
  $repositoryName: String
) {
  viewer {
    ...ReviewDashboardResults_viewer_1scQBF
    id
  }
}

fragment ReviewDashboardResults_viewer_1scQBF on User {
  assignedReviews(first: 10, status: PENDING_APPROVAL, reviewRule: $reviewRuleName, repository: $repositoryName) {
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "repositoryName"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "reviewRuleName"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Variable",
    "name": "repository",
    "variableName": "repositoryName"
  },
  {
    "kind": "Variable",
    "name": "reviewRule",
    "variableName": "reviewRuleName"
  },
  {
    "kind": "Literal",
    "name": "status",
    "value": "PENDING_APPROVAL"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AssignedRouteQuery",
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
                "name": "repositoryName",
                "variableName": "repositoryName"
              },
              {
                "kind": "Variable",
                "name": "reviewRuleName",
                "variableName": "reviewRuleName"
              }
            ],
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AssignedRouteQuery",
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
                          (v3/*: any*/),
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
                                  (v3/*: any*/),
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
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
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
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "02eae1aa91c7f433b231f5fed671a778",
    "id": null,
    "metadata": {},
    "name": "AssignedRouteQuery",
    "operationKind": "query",
    "text": "query AssignedRouteQuery(\n  $reviewRuleName: String\n  $repositoryName: String\n) {\n  viewer {\n    ...ReviewDashboardResults_viewer_1scQBF\n    id\n  }\n}\n\nfragment ReviewDashboardResults_viewer_1scQBF on User {\n  assignedReviews(first: 10, status: PENDING_APPROVAL, reviewRule: $reviewRuleName, repository: $repositoryName) {\n    edges {\n      node {\n        id\n        reviewRule {\n          name\n          id\n        }\n        pullRequest {\n          id\n          createdAt\n          repository\n          number\n          reviewers {\n            nodes {\n              id\n              login\n              status\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5188b741b422d2c0555bd8bd2040c3ed';
export default node;
