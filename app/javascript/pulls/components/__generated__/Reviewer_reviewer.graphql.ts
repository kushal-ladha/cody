/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewerStatus = "APPROVED" | "PENDING_APPROVAL" | "%future added value";
export type Reviewer_reviewer = {
    readonly id: string;
    readonly login: string;
    readonly status: ReviewerStatus;
    readonly reviewRule: {
        readonly name: string;
    } | null;
    readonly " $refType": "Reviewer_reviewer";
};
export type Reviewer_reviewer$data = Reviewer_reviewer;
export type Reviewer_reviewer$key = {
    readonly " $data"?: Reviewer_reviewer$data;
    readonly " $fragmentRefs": FragmentRefs<"Reviewer_reviewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Reviewer_reviewer",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Reviewer",
  "abstractKey": null
};
(node as any).hash = '060f4ec9b61f4dabdbb5aaa7bdcdd942';
export default node;
