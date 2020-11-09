/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PullRequest_pullRequest = {
    readonly id: string;
    readonly repository: string;
    readonly number: string;
    readonly status: string;
    readonly " $refType": "PullRequest_pullRequest";
};
export type PullRequest_pullRequest$data = PullRequest_pullRequest;
export type PullRequest_pullRequest$key = {
    readonly " $data"?: PullRequest_pullRequest$data;
    readonly " $fragmentRefs": FragmentRefs<"PullRequest_pullRequest">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PullRequest_pullRequest",
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
  "type": "PullRequest",
  "abstractKey": null
};
(node as any).hash = '44c80e799c4a9deee89b961626b0e898';
export default node;
