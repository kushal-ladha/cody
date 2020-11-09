/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PullRequestDetail_pullRequest = {
    readonly id: string;
    readonly repository: string;
    readonly number: string;
    readonly status: string;
    readonly reviewers: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"Reviewer_reviewer">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "PullRequestDetail_pullRequest";
};
export type PullRequestDetail_pullRequest$data = PullRequestDetail_pullRequest;
export type PullRequestDetail_pullRequest$key = {
    readonly " $data"?: PullRequestDetail_pullRequest$data;
    readonly " $fragmentRefs": FragmentRefs<"PullRequestDetail_pullRequest">;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PullRequestDetail_pullRequest",
  "selections": [
    (v0/*: any*/),
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
  "type": "PullRequest",
  "abstractKey": null
};
})();
(node as any).hash = '486be7075a09cfde0c3fbd0aa9f5aaf2';
export default node;
