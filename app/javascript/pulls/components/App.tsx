import React from "react";
import Nav from "./Nav";
import PageHead from "./routes/PageHead";
import makeEnvironment from "../makeEnvironment";
import Loadable from "react-loadable";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const csrfToken = document
  .getElementsByName("csrf-token")[0]
  .getAttribute("content");

const environment = makeEnvironment(csrfToken);

const ReposLoadable = Loadable({
  loader: () => import("./routes/ReposRoute"),
  loading() {
    return <div className="loader">Loading</div>;
  }
});

const PullRequestsLoadable = Loadable({
  loader: () =>
    import("./routes/PullRequestsRoute"),
  loading() {
    return <div className="loader">Loading</div>;
  },
});

const PullRequestShowLoadable = Loadable({
  loader: () => import("./routes/PullRequestShowRoute"),
  loading() {
    return <div className="loader">Loading</div>;
  }
});

const ProfileLoadable = Loadable({
  loader: () => import("./routes/ProfileRoute"),
  loading() {
    return <div className="loader">Loading</div>;
  }
});

const RulesLoadable = Loadable({
  loader: () => import("./routes/RulesRoute"),
  loading() {
    return <div className="loader">Loading</div>;
  }
});

const PullsLoadable = Loadable({
  loader: () => import("./routes/PullsRoute"),
  loading() {
    return <div className="loader">Loading</div>;
  }
})

const App = () => (
  <>
    <PageHead />
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route
            exact
            path="/repos"
            render={props => (
              <ReposLoadable {...props} environment={environment} />
            )}
          />
          <Route
            exact
            path="/repos/:owner/:name/pulls"
            render={props => (
              <PullRequestsLoadable {...props} environment={environment} />
            )}
          />
          <Route
            exact
            path="/repos/:owner/:name/pull/:number"
            render={props => (
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
            render={props => (
              <RulesLoadable {...props} environment={environment} />
            )}
          />
          <Route
            exact
            path="/profile"
            render={props => (
              <ProfileLoadable {...props} environment={environment} />
            )}
          />
          <Route
            exact
            path="/assigned"
            render={props => (
              <PullsLoadable {...props} environment={environment} />
            )}
          />
          <Redirect from="/" to="/repos" />
        </Switch>
      </div>
    </BrowserRouter>
  </>
);

export default App;
