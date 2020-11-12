import React from "react";
import { RelayPaginationProp } from "react-relay";

function LoadMore({ relay }: { relay: RelayPaginationProp }) {
  if (relay.hasMore()) {
    return <div className="has-text-centered">
      <button
        className="button"
        onClick={() => {
          if (!relay.hasMore() || relay.isLoading()) {
            return;
          }

          relay.loadMore(10, (error) => {
            console.log(error);
          });
        }}
      >
        Load more
      </button>
    </div>;
  } else {
    return null;
  }
}

export default LoadMore;