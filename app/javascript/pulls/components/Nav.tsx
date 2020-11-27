import React, { useState } from "react";
import { User, Zap, Menu as MenuIcon } from "react-feather";
import { NavLink, Route } from "react-router-dom";
import { Transition, Menu } from "@headlessui/react";

function Nav(): JSX.Element {
  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavLink
              to="/"
              className="flex flex-shrink-0 items-center font-bold"
            >
              <Zap size={22} className="text-purple-800 mr-2" />
              Cody
            </NavLink>
            <div className="hidden sm:flex sm:ml-6 sm:space-x-8">
              <NavLink
                to="/repos"
                exact
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-500 text-sm font-medium hover:text-gray-700 hover:border-gray-300"
                activeClassName="border-purple-500 text-gray-900 hover:border-purple-500 hover:text-gray-900"
              >
                Repos
              </NavLink>
              <Route path="/repos/:owner/:name">
                {({ match }) => {
                  if (match) {
                    return (
                      <>
                        <div className="inline-flex items-center px-1 pt-1 text-sm text-gray-900 font-medium border-b-2 border-purple-500 cursor-default">
                          {`${match.params.owner}/${match.params.name}`}
                        </div>
                        <NavLink
                          to={`/repos/${match.params.owner}/${match.params.name}/pulls`}
                          className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm text-gray-500 font-medium hover:text-gray-700 hover:border-gray-300"
                          activeClassName="border-purple-500 text-gray-900 hover:border-purple-500 hover:text-gray-900"
                          title="Pulls"
                        >
                          Pulls
                        </NavLink>
                        <NavLink
                          to={`/repos/${match.params.owner}/${match.params.name}/rules`}
                          className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm text-gray-500 font-medium hover:text-gray-700 hover:border-gray-300"
                          activeClassName="border-purple-500 text-gray-900 hover:border-purple-500 hover:text-gray-900"
                          title="Rules"
                        >
                          Rules
                        </NavLink>
                      </>
                    );
                  } else {
                    return null;
                  }
                }}
              </Route>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button>
                      <span className="sr-only">Open user menu</span>
                      <User
                        size={22}
                        className="text-gray-500 hover:text-gray-900"
                      />
                    </Menu.Button>
                    <Transition
                      show={open}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 outline-none"
                      >
                        <Menu.Item>
                          <NavLink
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Your profile
                          </NavLink>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            href="/session"
                            data-method="delete"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign out
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 foucs:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              onClick={(event) => {
                event.preventDefault();
                setMobileMenuShown(!mobileMenuShown);
              }}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <div className={`${mobileMenuShown ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <NavLink
            to="/repos"
            exact
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
            activeClassName="border-indigo-500 text-indigo-700 bg-indigo-50"
          >
            Repos
          </NavLink>
          <Route path="/repos/:owner/:name">
            {({ match }) => {
              if (match) {
                return (
                  <>
                    <NavLink
                      to={`/repos/${match.params.owner}/${match.params.name}/pulls`}
                      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                      activeClassName="border-indigo-500 text-indigo-700 bg-indigo-50"
                      title="Pulls"
                    >
                      Pulls
                    </NavLink>
                    <NavLink
                      to={`/repos/${match.params.owner}/${match.params.name}/rules`}
                      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                      activeClassName="border-indigo-500 text-indigo-700 bg-indigo-50"
                      title="Rules"
                    >
                      Rules
                    </NavLink>
                  </>
                );
              } else {
                return null;
              }
            }}
          </Route>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="space-y-1">
            <NavLink
              to="/profile"
              exact
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              activeClassName="border-indigo-500 text-indigo-700 bg-indigo-50"
            >
              Your profile
            </NavLink>
            <a
              href="/session"
              data-method="delete"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
