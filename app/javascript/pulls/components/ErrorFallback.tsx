import React from "react";

function ErrorFallback(): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 h-screen">
      <p className="text-center font-medium text-gray-500">
        Something went wrong.
      </p>
      <p className="text-center font-medium text-gray-400 mt-2">Please try refreshing the page.</p>
    </div>
  );
}

export default ErrorFallback;