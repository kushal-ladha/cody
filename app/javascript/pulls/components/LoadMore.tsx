import React, { useState } from "react";
import { RelayPaginationProp } from "react-relay";

function LoadMore({ relay }: { relay: RelayPaginationProp }): JSX.Element {
  const [showSpinner, setShowSpinner] = useState(false)
  if (relay.hasMore()) {
    return (
      <div className="py-6">
        <button
          className="flex items-center block mx-auto bg-white hover:bg-gray-50 border-gray-300 text-gray-700 px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          onClick={() => {
            if (!relay.hasMore() || relay.isLoading()) {
              return;
            }
            setShowSpinner(true)
            relay.loadMore(10, (error) => {
              if (error) {
                console.log(error);
              }
              setShowSpinner(false);
            });
          }}
        >
          {showSpinner ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
          { showSpinner ? "Loading..." : "Load More"}
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default LoadMore;
