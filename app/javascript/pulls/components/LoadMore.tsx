import React from "react";
import { RelayPaginationProp } from "react-relay";
import Button from "./inputs/Button";

function LoadMore({ relay }: { relay: RelayPaginationProp }): JSX.Element {
  if (relay.hasMore()) {
    return (
      <div className="py-6">
        <Button
          className="block mx-auto"
          label="Load more"
          onClick={() => {
            if (!relay.hasMore() || relay.isLoading()) {
              return;
            }

            relay.loadMore(10, (error) => {
              console.log(error);
            });
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}

export default LoadMore;
