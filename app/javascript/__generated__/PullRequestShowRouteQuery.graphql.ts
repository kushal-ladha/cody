/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PullRequestShowRouteQueryVariables = {
    owner: string;
    name: string;
    number: string;
};
export type PullRequestShowRouteQueryResponse = {
    readonly viewer: {
        readonly repository: {
            readonly pullRequest: {
                readonly " $fragmentRefs": FragmentRefs<"PullRequestDetail_pullRequest">;
            } | null;
        } | null;
    } | null;
};
export type PullRequestShowRouteQuery = {
    readonly response: PullRequestShowRouteQueryResponse;
    readonly variables: PullRequestShowRouteQueryVariables;
};



/*
query PullRequestShowRouteQuery(
  $owner: String!
  $name: String!
  $number: String!
) {
  viewer {
    repository(owner: $owner, name: $name) {
      pullRequest(number: $number) {
        ...PullRequestDetail_pullRequest
        id
      }
      id
    }
    id
  }
}

fragment PullRequestDetail_pullRequest on PullRequest {
  id
  repository
  number
  status
  reviewers {
    edges {
      node {
        id
        ...Reviewer_reviewer
      }
    }
  }
}

fragment Reviewer_reviewer on Reviewer {
  id
  login
  status
  reviewRule {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "number"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v3 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "owner"
  }
],
v4 = [
  {
    "kind": "Variable",
    "name": "number",
    "variableName": "number"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PullRequestShowRouteQuery",
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
            "args": (v3/*: any*/),
            "concreteType": "Repository",
            "kind": "LinkedField",
            "name": "repository",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "PullRequest",
                "kind": "LinkedField",
                "name": "pullRequest",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "PullRequestDetail_pullRequest"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "PullRequestShowRouteQuery",
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
            "args": (v3/*: any*/),
            "concreteType": "Repository",
            "kind": "LinkedField",
            "name": "repository",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v4/*: any*/),
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
                  (v6/*: any*/),
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
                                "kind": "ScalarField",
                                "name": "login",
                                "storageKey": null
                              },
                              (v6/*: any*/),
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
                              }
                            ],
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
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "06d6fb0f45fd43d6cc53f015240d53cc",
    "id": null,
    "metadata": {},
    "name": "PullRequestShowRouteQuery",
    "operationKind": "query",
    "text": "query PullRequestShowRouteQuery(\n  $owner: String!\n  $name: String!\n  $number: String!\n) {\n  viewer {\n    repository(owner: $owner, name: $name) {\n      pullRequest(number: $number) {\n        ...PullRequestDetail_pullRequest\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment PullRequestDetail_pullRequest on PullRequest {\n  id\n  repository\n  number\n  status\n  reviewers {\n    edges {\n      node {\n        id\n        ...Reviewer_reviewer\n      }\n    }\n  }\n}\n\nfragment Reviewer_reviewer on Reviewer {\n  id\n  login\n  status\n  reviewRule {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '1900aaec102c954e4acc2c84dab6a9ec';
export default node;
