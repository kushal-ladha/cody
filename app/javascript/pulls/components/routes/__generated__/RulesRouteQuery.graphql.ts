/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RulesRouteQueryVariables = {
    owner: string;
    name: string;
    cursor?: string | null;
};
export type RulesRouteQueryResponse = {
    readonly viewer: {
        readonly repository: {
            readonly " $fragmentRefs": FragmentRefs<"ReviewRuleList_repository">;
        } | null;
    } | null;
};
export type RulesRouteQuery = {
    readonly response: RulesRouteQueryResponse;
    readonly variables: RulesRouteQueryVariables;
};



/*
query RulesRouteQuery(
  $owner: String!
  $name: String!
  $cursor: String
) {
  viewer {
    repository(owner: $owner, name: $name) {
      ...ReviewRuleList_repository
      id
    }
    id
  }
}

fragment ReviewRuleList_repository on Repository {
  owner
  name
  reviewRules(first: 200, after: $cursor) {
    edges {
      node {
        id
        name
        shortCode
        match
        reviewer
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
  "name": "cursor"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 200
  }
],
v6 = {
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
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RulesRouteQuery",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "ReviewRuleList_repository"
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RulesRouteQuery",
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
                "args": null,
                "kind": "ScalarField",
                "name": "owner",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "ReviewRuleConnection",
                "kind": "LinkedField",
                "name": "reviewRules",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ReviewRuleEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ReviewRule",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "shortCode",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "match",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "reviewer",
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
                "args": (v5/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "ReviewRuleList_reviewRules",
                "kind": "LinkedHandle",
                "name": "reviewRules"
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4d86041c370a3d85023be969b4877fc6",
    "id": null,
    "metadata": {},
    "name": "RulesRouteQuery",
    "operationKind": "query",
    "text": "query RulesRouteQuery(\n  $owner: String!\n  $name: String!\n  $cursor: String\n) {\n  viewer {\n    repository(owner: $owner, name: $name) {\n      ...ReviewRuleList_repository\n      id\n    }\n    id\n  }\n}\n\nfragment ReviewRuleList_repository on Repository {\n  owner\n  name\n  reviewRules(first: 200, after: $cursor) {\n    edges {\n      node {\n        id\n        name\n        shortCode\n        match\n        reviewer\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '01b06f9538fea4ae56b893bdf6352af6';
export default node;
