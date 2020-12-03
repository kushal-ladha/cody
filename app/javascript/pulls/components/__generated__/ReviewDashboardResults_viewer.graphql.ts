/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewerStatus = "APPROVED" | "PENDING_APPROVAL" | "%future added value";
export type ReviewDashboardResults_viewer = {
    readonly assignedReviews: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly reviewRule: {
                    readonly name: string;
                } | null;
                readonly pullRequest: {
                    readonly id: string;
                    readonly createdAt: string;
                    readonly repository: string;
                    readonly number: string;
                    readonly reviewers: {
                        readonly nodes: ReadonlyArray<{
                            readonly id: string;
                            readonly login: string;
                            readonly status: ReviewerStatus;
                        } | null> | null;
                    } | null;
                };
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ReviewDashboardResults_viewer";
};
export type ReviewDashboardResults_viewer$data = ReviewDashboardResults_viewer;
export type ReviewDashboardResults_viewer$key = {
    readonly " $data"?: ReviewDashboardResults_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"ReviewDashboardResults_viewer">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": 10,
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
      "name": "repositoryName"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "reviewRuleName"
    },
    {
      "defaultValue": "PENDING_APPROVAL",
      "kind": "LocalArgument",
      "name": "status"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "assignedReviews"
        ]
      }
    ]
  },
  "name": "ReviewDashboardResults_viewer",
  "selections": [
    {
      "alias": "assignedReviews",
      "args": [
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
          "kind": "Variable",
          "name": "status",
          "variableName": "status"
        }
      ],
      "concreteType": "ReviewerConnection",
      "kind": "LinkedField",
      "name": "__ReviewDashboardResults_assignedReviews_connection",
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
                (v0/*: any*/),
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
                    }
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
                    (v0/*: any*/),
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
                            (v0/*: any*/),
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
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();
(node as any).hash = '7d72c67a643e39eefa208031020df222';
export default node;
