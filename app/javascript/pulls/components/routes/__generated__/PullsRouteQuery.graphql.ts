/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PullsRouteQueryVariables = {};
export type PullsRouteQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"AssignedReviews_viewer">;
    } | null;
};
export type PullsRouteQuery = {
    readonly response: PullsRouteQueryResponse;
    readonly variables: PullsRouteQueryVariables;
};



/*
query PullsRouteQuery {
  viewer {
    ...AssignedReviews_viewer
    id
  }
}

fragment AssignedReviews_viewer on User {
  reviews: assignedReviews(first: 10, status: PENDING_APPROVAL) {
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PullsRouteQuery",
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PullsRouteQuery",
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
                      (v2/*: any*/),
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
                          (v2/*: any*/),
                          (v1/*: any*/)
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
            "alias": "reviews",
            "args": (v0/*: any*/),
            "filters": [
              "status"
            ],
            "handle": "connection",
            "key": "AssignedReviews_reviews",
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
    "cacheID": "f51c3d5fd1bd7d04982d31c3b2eed9a5",
    "id": null,
    "metadata": {},
    "name": "PullsRouteQuery",
    "operationKind": "query",
    "text": "query PullsRouteQuery {\n  viewer {\n    ...AssignedReviews_viewer\n    id\n  }\n}\n\nfragment AssignedReviews_viewer on User {\n  reviews: assignedReviews(first: 10, status: PENDING_APPROVAL) {\n    edges {\n      node {\n        id\n        status\n        reviewRule {\n          name\n          id\n        }\n        pullRequest {\n          repository\n          number\n          status\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5f7a40e53d8fe3c702b0cc0ea1c13c0f';
export default node;
