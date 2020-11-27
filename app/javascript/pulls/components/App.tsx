import React from "react";
import PageHead from "./routes/PageHead";
import makeEnvironment from "../makeEnvironment";
import Loadable from "react-loadable";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Loading from "./Loading";

const csrfToken = document
  .getElementsByName("csrf-token")[0]
  .getAttribute("content");

const environment = makeEnvironment(csrfToken);

const ReposLoadable = Loadable({
  loader: () => import("./routes/ReposRoute"),
  loading: Loading
});

const PullRequestsLoadable = Loadable({
  loader: () => import("./routes/PullRequestsRoute"),
  loading: Loading,
});

const PullRequestShowLoadable = Loadable({
  loader: () => import("./routes/PullRequestShowRoute"),
  loading: Loading,
});

const ProfileLoadable = Loadable({
  loader: () => import("./routes/ProfileRoute"),
  loading: Loading,
});

const RulesLoadable = Loadable({
  loader: () => import("./routes/RulesRoute"),
  loading: Loading,
});

function App(): JSX.Element {
  return (
    <>
      <PageHead />
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route
              exact
              path="/repos"
              render={(props) => (
                <ReposLoadable {...props} environment={environment} />
              )}
            />
            <Route
              exact
              path="/repos/:owner/:name/pulls"
              render={(props) => (
                <PullRequestsLoadable {...props} environment={environment} />
              )}
            />
            <Route
              exact
              path="/repos/:owner/:name/pull/:number"
              render={(props) => (
                <PullRequestShowLoadable {...props} environment={environment} />
              )}
            />
            <Route
              exact
              path="/repos/:owner/:name"
              render={({ match }) => {
                return (
                  <Redirect
                    to={`/repos/${match.params.owner}/${match.params.name}/pulls`}
                  />
                );
              }}
            />
            <Route
              exact
              path="/repos/:owner/:name/rules"
              render={(props) => (
                <RulesLoadable {...props} environment={environment} />
              )}
            />
            <Route
              exact
              path="/profile"
              render={(props) => (
                <ProfileLoadable {...props} environment={environment} />
              )}
            />
            <Redirect from="/" to="/repos" />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
