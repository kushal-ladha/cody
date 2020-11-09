/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Repository_repository = {
    readonly id: string;
    readonly owner: string;
    readonly name: string;
    readonly " $refType": "Repository_repository";
};
export type Repository_repository$data = Repository_repository;
export type Repository_repository$key = {
    readonly " $data"?: Repository_repository$data;
    readonly " $fragmentRefs": FragmentRefs<"Repository_repository">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Repository_repository",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
  "type": "Repository",
  "abstractKey": null
};
(node as any).hash = '6ef4f54213a37596425ebf49b51f9d42';
export default node;
