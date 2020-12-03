import React from "react";
import PageHead from "./routes/PageHead";
import Loadable from "react-loadable";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Loading from "./Loading";
import { IntlProvider } from "react-intl";
import * as Sentry from "@sentry/react";
import ErrorFallback from "./ErrorFallback";

const ReposLoadable = Loadable({
  loader: () => import("./routes/ReposRoute"),
  loading: Loading,
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

const AssignedLoadable = Loadable({
  loader: () => import("./routes/AssignedRoute"),
  loading: Loading,
});

function App(): JSX.Element {
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback} showDialog>
      <IntlProvider locale="en">
        <PageHead />
        <BrowserRouter>
          <div>
            <Nav />
            <Switch>
              <Route
                exact
                path="/repos"
                render={(props) => <ReposLoadable />}
              />
              <Route
                exact
                path="/repos/:owner/:name/pulls"
                render={(props) => <PullRequestsLoadable {...props} />}
              />
              <Route
                exact
                path="/repos/:owner/:name/pull/:number"
                render={(props) => <PullRequestShowLoadable {...props} />}
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
                render={(props) => <RulesLoadable {...props} />}
              />
              <Route
                exact
                path="/profile"
                render={(props) => <ProfileLoadable />}
              />
              <Route
                exact
                path="/assigned"
                render={(props) => <AssignedLoadable />}
              />
              <Redirect from="/" to="/repos" />
            </Switch>
          </div>
        </BrowserRouter>
      </IntlProvider>
    </Sentry.ErrorBoundary>
  );
}

export default App;
