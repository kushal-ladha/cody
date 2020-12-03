/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ReviewDashboardResultsPullRequestExternalQueryVariables = {
    nodeID: string;
};
export type ReviewDashboardResultsPullRequestExternalQueryResponse = {
    readonly node: {
        readonly title?: string | null;
        readonly htmlUrl?: string | null;
    } | null;
};
export type ReviewDashboardResultsPullRequestExternalQuery = {
    readonly response: ReviewDashboardResultsPullRequestExternalQueryResponse;
    readonly variables: ReviewDashboardResultsPullRequestExternalQueryVariables;
};



/*
query ReviewDashboardResultsPullRequestExternalQuery(
  $nodeID: ID!
) {
  node(id: $nodeID) {
    __typename
    ... on PullRequest {
      title
      htmlUrl
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "nodeID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "nodeID"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "htmlUrl",
      "storageKey": null
    }
  ],
  "type": "PullRequest",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ReviewDashboardResultsPullRequestExternalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "ReviewDashboardResultsPullRequestExternalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d9a68fe9b7de2cad14461a3fdf74537c",
    "id": null,
    "metadata": {},
    "name": "ReviewDashboardResultsPullRequestExternalQuery",
    "operationKind": "query",
    "text": "query ReviewDashboardResultsPullRequestExternalQuery(\n  $nodeID: ID!\n) {\n  node(id: $nodeID) {\n    __typename\n    ... on PullRequest {\n      title\n      htmlUrl\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '77b2b28d118accb08cdabefb58817e66';
export default node;
