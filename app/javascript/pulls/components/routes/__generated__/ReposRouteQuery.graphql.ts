/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReposRouteQueryVariables = {};
export type ReposRouteQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"RepositoryList_viewer">;
    } | null;
};
export type ReposRouteQuery = {
    readonly response: ReposRouteQueryResponse;
    readonly variables: ReposRouteQueryVariables;
};



/*
query ReposRouteQuery {
  viewer {
    ...RepositoryList_viewer
    id
  }
}

fragment RepositoryList_viewer on User {
  repositories(first: 10) {
    edges {
      node {
        id
        ...Repository_repository
      }
    }
  }
}

fragment Repository_repository on Repository {
  id
  owner
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ReposRouteQuery",
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
            "name": "RepositoryList_viewer"
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
    "name": "ReposRouteQuery",
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
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              }
            ],
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositories",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RepositoryEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Repository",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "owner",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "repositories(first:10)"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2c1153b54338e7f7368bce4696388650",
    "id": null,
    "metadata": {},
    "name": "ReposRouteQuery",
    "operationKind": "query",
    "text": "query ReposRouteQuery {\n  viewer {\n    ...RepositoryList_viewer\n    id\n  }\n}\n\nfragment RepositoryList_viewer on User {\n  repositories(first: 10) {\n    edges {\n      node {\n        id\n        ...Repository_repository\n      }\n    }\n  }\n}\n\nfragment Repository_repository on Repository {\n  id\n  owner\n  name\n}\n"
  }
};
})();
(node as any).hash = '7f2d6f5e29b8d124c929d91fcb568752';
export default node;
