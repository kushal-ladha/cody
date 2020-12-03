/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewDashboardResultsPaginationQueryVariables = {
    count: number;
    cursor?: string | null;
    reviewRuleName?: string | null;
    repositoryName?: string | null;
};
export type ReviewDashboardResultsPaginationQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ReviewDashboardResults_viewer">;
    } | null;
};
export type ReviewDashboardResultsPaginationQuery = {
    readonly response: ReviewDashboardResultsPaginationQueryResponse;
    readonly variables: ReviewDashboardResultsPaginationQueryVariables;
};



/*
query ReviewDashboardResultsPaginationQuery(
  $count: Int!
  $cursor: String
  $reviewRuleName: String
  $repositoryName: String
) {
  viewer {
    ...ReviewDashboardResults_viewer_1jbckB
    id
  }
}

fragment ReviewDashboardResults_viewer_1jbckB on User {
  assignedReviews(first: $count, after: $cursor, status: PENDING_APPROVAL, reviewRule: $reviewRuleName, repository: $repositoryName) {
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
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "repositoryName"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "reviewRuleName"
},
v4 = [
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
v5 = {
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
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ReviewDashboardResultsPaginationQuery",
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
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ReviewDashboardResultsPaginationQuery",
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
            "args": (v4/*: any*/),
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
                      (v5/*: any*/),
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
                          (v5/*: any*/)
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
                          (v5/*: any*/),
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
                                  (v5/*: any*/),
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
            "args": (v4/*: any*/),
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
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5a865a2872f1dba61028af95c07dc6c5",
    "id": null,
    "metadata": {},
    "name": "ReviewDashboardResultsPaginationQuery",
    "operationKind": "query",
    "text": "query ReviewDashboardResultsPaginationQuery(\n  $count: Int!\n  $cursor: String\n  $reviewRuleName: String\n  $repositoryName: String\n) {\n  viewer {\n    ...ReviewDashboardResults_viewer_1jbckB\n    id\n  }\n}\n\nfragment ReviewDashboardResults_viewer_1jbckB on User {\n  assignedReviews(first: $count, after: $cursor, status: PENDING_APPROVAL, reviewRule: $reviewRuleName, repository: $repositoryName) {\n    edges {\n      node {\n        id\n        reviewRule {\n          name\n          id\n        }\n        pullRequest {\n          id\n          createdAt\n          repository\n          number\n          reviewers {\n            nodes {\n              id\n              login\n              status\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0e898e8a38f1e61d69c6c8d71bda518b';
export default node;
