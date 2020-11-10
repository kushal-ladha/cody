/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewerTestSnapshotQueryVariables = {};
export type ReviewerTestSnapshotQueryResponse = {
    readonly viewer: {
        readonly repository: {
            readonly pullRequest: {
                readonly reviewers: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly " $fragmentRefs": FragmentRefs<"Reviewer_reviewer">;
                        } | null;
                    } | null> | null;
                } | null;
            } | null;
        } | null;
    } | null;
};
export type ReviewerTestSnapshotQuery = {
    readonly response: ReviewerTestSnapshotQueryResponse;
    readonly variables: ReviewerTestSnapshotQueryVariables;
};



/*
query ReviewerTestSnapshotQuery {
  viewer {
    repository(owner: "test", name: "test") {
      pullRequest(number: "42") {
        reviewers {
          edges {
            node {
              ...Reviewer_reviewer
              id
            }
          }
        }
        id
      }
      id
    }
    id
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
    "name": "ReviewerTestSnapshotQuery",
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
                              {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "Reviewer_reviewer"
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
    "name": "ReviewerTestSnapshotQuery",
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "status",
                                "storageKey": null
                              },
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
                  },
                  (v2/*: any*/)
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
    "cacheID": "f03f6f8a6630282884195afdec5de631",
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
        "viewer.repository.pullRequest": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PullRequest"
        },
        "viewer.repository.pullRequest.id": (v3/*: any*/),
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
        "viewer.repository.pullRequest.reviewers.edges.node.id": (v3/*: any*/),
        "viewer.repository.pullRequest.reviewers.edges.node.login": (v4/*: any*/),
        "viewer.repository.pullRequest.reviewers.edges.node.reviewRule": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ReviewRule"
        },
        "viewer.repository.pullRequest.reviewers.edges.node.reviewRule.id": (v3/*: any*/),
        "viewer.repository.pullRequest.reviewers.edges.node.reviewRule.name": (v4/*: any*/),
        "viewer.repository.pullRequest.reviewers.edges.node.status": {
          "enumValues": [
            "APPROVED",
            "PENDING_APPROVAL"
          ],
          "nullable": false,
          "plural": false,
          "type": "ReviewerStatus"
        }
      }
    },
    "name": "ReviewerTestSnapshotQuery",
    "operationKind": "query",
    "text": "query ReviewerTestSnapshotQuery {\n  viewer {\n    repository(owner: \"test\", name: \"test\") {\n      pullRequest(number: \"42\") {\n        reviewers {\n          edges {\n            node {\n              ...Reviewer_reviewer\n              id\n            }\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Reviewer_reviewer on Reviewer {\n  id\n  login\n  status\n  reviewRule {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '208080a9bf41a3661a3cc00b12ee3728';
export default node;
