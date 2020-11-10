/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RepositoryTestSnapshotQueryVariables = {};
export type RepositoryTestSnapshotQueryResponse = {
    readonly viewer: {
        readonly repositories: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly " $fragmentRefs": FragmentRefs<"Repository_repository">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type RepositoryTestSnapshotQuery = {
    readonly response: RepositoryTestSnapshotQueryResponse;
    readonly variables: RepositoryTestSnapshotQueryVariables;
};



/*
query RepositoryTestSnapshotQuery {
  viewer {
    repositories(first: 10) {
      edges {
        node {
          ...Repository_repository
          id
        }
      }
    }
    id
  }
}

fragment Repository_repository on Repository {
  id
  owner
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
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
    "name": "RepositoryTestSnapshotQuery",
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
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "Repository_repository"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "repositories(first:10)"
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
    "name": "RepositoryTestSnapshotQuery",
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
                      (v1/*: any*/),
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
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "41e50997e8210dc669057974604d93d9",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "viewer.id": (v2/*: any*/),
        "viewer.repositories": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RepositoryConnection"
        },
        "viewer.repositories.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "RepositoryEdge"
        },
        "viewer.repositories.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Repository"
        },
        "viewer.repositories.edges.node.id": (v2/*: any*/),
        "viewer.repositories.edges.node.name": (v3/*: any*/),
        "viewer.repositories.edges.node.owner": (v3/*: any*/)
      }
    },
    "name": "RepositoryTestSnapshotQuery",
    "operationKind": "query",
    "text": "query RepositoryTestSnapshotQuery {\n  viewer {\n    repositories(first: 10) {\n      edges {\n        node {\n          ...Repository_repository\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Repository_repository on Repository {\n  id\n  owner\n  name\n}\n"
  }
};
})();
(node as any).hash = 'bf6bd04aa6b8065fb117652c2720a34e';
export default node;
