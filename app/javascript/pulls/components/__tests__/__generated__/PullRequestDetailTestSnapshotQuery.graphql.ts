/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PullRequestDetailTestSnapshotQueryVariables = {};
export type PullRequestDetailTestSnapshotQueryResponse = {
    readonly viewer: {
        readonly repository: {
            readonly pullRequest: {
                readonly " $fragmentRefs": FragmentRefs<"PullRequestDetail_pullRequest">;
            } | null;
        } | null;
    } | null;
};
export type PullRequestDetailTestSnapshotQuery = {
    readonly response: PullRequestDetailTestSnapshotQueryResponse;
    readonly variables: PullRequestDetailTestSnapshotQueryVariables;
};



/*
query PullRequestDetailTestSnapshotQuery {
  viewer {
    repository(owner: "test", name: "test") {
      pullRequest(number: "42") {
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
    "name": "number",
    "value": "42"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
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
    "name": "PullRequestDetailTestSnapshotQuery",
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
                "storageKey": "pullRequest(number:\"42\")"
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
    "name": "PullRequestDetailTestSnapshotQuery",
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
                "concreteType": "PullRequest",
                "kind": "LinkedField",
                "name": "pullRequest",
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
                  (v3/*: any*/),
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
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "login",
                                "storageKey": null
                              },
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
                                  (v2/*: any*/)
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
                "storageKey": "pullRequest(number:\"42\")"
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
    "cacheID": "486868c67872b1a32234b28e055416b8",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "viewer.id": (v4/*: any*/),
        "viewer.repository": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Repository"
        },
        "viewer.repository.id": (v4/*: any*/),
        "viewer.repository.pullRequest": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PullRequest"
        },
        "viewer.repository.pullRequest.id": (v4/*: any*/),
        "viewer.repository.pullRequest.number": (v5/*: any*/),
        "viewer.repository.pullRequest.repository": (v5/*: any*/),
        "viewer.repository.pullRequest.reviewers": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ReviewerConnection"
        },
        "viewer.repository.pullRequest.reviewers.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ReviewerEdge"
        },
        "viewer.repository.pullRequest.reviewers.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Reviewer"
        },
        "viewer.repository.pullRequest.reviewers.edges.node.id": (v4/*: any*/),
        "viewer.repository.pullRequest.reviewers.edges.node.login": (v5/*: any*/),
        "viewer.repository.pullRequest.reviewers.edges.node.reviewRule": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ReviewRule"
        },
        "viewer.repository.pullRequest.reviewers.edges.node.reviewRule.id": (v4/*: any*/),
        "viewer.repository.pullRequest.reviewers.edges.node.reviewRule.name": (v5/*: any*/),
        "viewer.repository.pullRequest.reviewers.edges.node.status": {
          "enumValues": [
            "APPROVED",
            "PENDING_APPROVAL"
          ],
          "nullable": false,
          "plural": false,
          "type": "ReviewerStatus"
        },
        "viewer.repository.pullRequest.status": (v5/*: any*/)
      }
    },
    "name": "PullRequestDetailTestSnapshotQuery",
    "operationKind": "query",
    "text": "query PullRequestDetailTestSnapshotQuery {\n  viewer {\n    repository(owner: \"test\", name: \"test\") {\n      pullRequest(number: \"42\") {\n        ...PullRequestDetail_pullRequest\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment PullRequestDetail_pullRequest on PullRequest {\n  id\n  repository\n  number\n  status\n  reviewers {\n    edges {\n      node {\n        id\n        ...Reviewer_reviewer\n      }\n    }\n  }\n}\n\nfragment Reviewer_reviewer on Reviewer {\n  id\n  login\n  status\n  reviewRule {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f0a675ce4e8aab236eccc037ff3faddf';
export default node;
