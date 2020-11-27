import React, { useState } from "react";
import { CheckCircle, X } from "react-feather";
import { Transition } from "@headlessui/react";

type NotificationType = "success" | "error" | "info";

function iconForType(type: NotificationType): JSX.Element {
  switch (type) {
    case "success":
      return <CheckCircle className="h-6 w-6 text-green-400" />;
  }
}

function Notification({
  type,
  message,
}: {
  type: NotificationType;
  message: string;
}): JSX.Element {
  const [shown, setShown] = useState(true);

  return (
    <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
      <Transition
        show={shown}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <div ref={ref} className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{iconForType(type)}</div>
                <div className="ml-3 w-0 flex-1 pt-0 5">
                  <p className="text-sm font-medium text-gray-900">{message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={(event) => {
                      event.preventDefault();
                      setShown(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}

export default Notification;
