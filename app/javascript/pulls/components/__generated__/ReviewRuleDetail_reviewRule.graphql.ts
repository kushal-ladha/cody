/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewRuleDetail_reviewRule = {
    readonly id: string;
    readonly repository: string;
    readonly name: string;
    readonly shortCode: string;
    readonly type: string;
    readonly reviewer: string;
    readonly match: string;
    readonly " $refType": "ReviewRuleDetail_reviewRule";
};
export type ReviewRuleDetail_reviewRule$data = ReviewRuleDetail_reviewRule;
export type ReviewRuleDetail_reviewRule$key = {
    readonly " $data"?: ReviewRuleDetail_reviewRule$data;
    readonly " $fragmentRefs": FragmentRefs<"ReviewRuleDetail_reviewRule">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReviewRuleDetail_reviewRule",
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
      "name": "name",
      "storageKey": null
    },
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
      "name": "type",
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
      "name": "match",
      "storageKey": null
    }
  ],
  "type": "ReviewRule",
  "abstractKey": null
};
(node as any).hash = '24ceab298bcee7cbd293c2c066138044';
export default node;
