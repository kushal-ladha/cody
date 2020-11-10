/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PullRequestTestSnapshotQueryVariables = {};
export type PullRequestTestSnapshotQueryResponse = {
    readonly viewer: {
        readonly repository: {
            readonly pullRequests: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly " $fragmentRefs": FragmentRefs<"PullRequest_pullRequest">;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
};
export type PullRequestTestSnapshotQuery = {
    readonly response: PullRequestTestSnapshotQueryResponse;
    readonly variables: PullRequestTestSnapshotQueryVariables;
};



/*
query PullRequestTestSnapshotQuery {
  viewer {
    repository(owner: "test", name: "test") {
      pullRequests(first: 10) {
        edges {
          node {
            ...PullRequest_pullRequest
            id
          }
        }
      }
      id
    }
    id
  }
}

fragment PullRequest_pullRequest on PullRequest {
  id
  repository
  number
  status
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "name",
    "value": "test"
  },
  {
    "kind": "Literal",
    "name": "owner",
    "value": "test"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PullRequestTestSnapshotQuery",
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
            "concreteType": "Repository",
            "kind": "LinkedField",
            "name": "repository",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "PullRequestConnection",
                "kind": "LinkedField",
                "name": "pullRequests",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PullRequestEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PullRequest",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "PullRequest_pullRequest"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "pullRequests(first:10)"
              }
            ],
            "storageKey": "repository(name:\"test\",owner:\"test\")"
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
    "name": "PullRequestTestSnapshotQuery",
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
            "concreteType": "Repository",
            "kind": "LinkedField",
            "name": "repository",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "PullRequestConnection",
                "kind": "LinkedField",
                "name": "pullRequests",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PullRequestEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PullRequest",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
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
                "storageKey": "pullRequests(first:10)"
              },
              (v2/*: any*/)
            ],
            "storageKey": "repository(name:\"test\",owner:\"test\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d05e0a1196d4b474a4575b8ca03a7ec9",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "viewer.id": (v3/*: any*/),
        "viewer.repository": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Repository"
        },
        "viewer.repository.id": (v3/*: any*/),
        "viewer.repository.pullRequests": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PullRequestConnection"
        },
        "viewer.repository.pullRequests.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PullRequestEdge"
        },
        "viewer.repository.pullRequests.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PullRequest"
        },
        "viewer.repository.pullRequests.edges.node.id": (v3/*: any*/),
        "viewer.repository.pullRequests.edges.node.number": (v4/*: any*/),
        "viewer.repository.pullRequests.edges.node.repository": (v4/*: any*/),
        "viewer.repository.pullRequests.edges.node.status": (v4/*: any*/)
      }
    },
    "name": "PullRequestTestSnapshotQuery",
    "operationKind": "query",
    "text": "query PullRequestTestSnapshotQuery {\n  viewer {\n    repository(owner: \"test\", name: \"test\") {\n      pullRequests(first: 10) {\n        edges {\n          node {\n            ...PullRequest_pullRequest\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment PullRequest_pullRequest on PullRequest {\n  id\n  repository\n  number\n  status\n}\n"
  }
};
})();
(node as any).hash = '149b298780c4b5def2e168a115da18d5';
export default node;
