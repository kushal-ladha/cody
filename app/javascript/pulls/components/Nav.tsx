import React from "react";
import Icon from "./Icon";
import { NavLink, Route } from "react-router-dom";
import classNames from "classnames";

type State = {
  isExpanded: boolean
};

class Nav extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  onClickBurger = () => {
    this.setState(({ isExpanded }) => {
      return { isExpanded: !isExpanded };
    });
  };

  render() {
    const burgerClass = classNames({
      "navbar-burger": true,
      burger: true,
      "is-active": this.state.isExpanded
    });

    const menuClass = classNames({
      "navbar-menu": true,
      "is-active": this.state.isExpanded
    });

    return (
      <nav className="navbar has-shadow" aria-label="main-navigation">
        <div className="container">
          <div className="navbar-brand">
            <NavLink to="/" className="navbar-item" title="Cody">
              <strong>Cody</strong>
              &nbsp;
              <Icon icon="code" size="medium" />
            </NavLink>
            <div
              role="button"
              tabIndex={0}
              className={burgerClass}
              data-target="navMenu"
              onClick={this.onClickBurger}
              onKeyUp={this.onClickBurger}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className={menuClass}>
            <div className="navbar-start">
              <NavLink
                exact
                to="/repos"
                className="navbar-item"
                activeClassName="has-text-info is-active"
                title="Repos"
              >
                Repos
              </NavLink>
              <Route path="/repos/:owner/:name">
                {({ match }) => {
                  if (match) {
                    return (
                      <React.Fragment>
                        <div className="navbar-item">
                          {`${match.params.owner}/${match.params.name}`}
                        </div>
                        <NavLink
                          to={`/repos/${match.params.owner}/${
                            match.params.name
                          }/pulls`}
                          className="navbar-item"
                          activeClassName="has-text-info is-active"
                          title="Pulls"
                        >
                          Pulls
                        </NavLink>
                        <NavLink
                          to={`/repos/${match.params.owner}/${
                            match.params.name
                          }/rules`}
                          className="navbar-item"
                          activeClassName="has-text-info is-active"
                          title="Rules"
                        >
                          Rules
                        </NavLink>
                      </React.Fragment>
                    );
                  } else {
                    return null;
                  }
                }}
              </Route>
            </div>
            <div className="navbar-end">
              <NavLink
                to="/profile"
                className="navbar-item"
                activeClassName="has-text-info is-active"
                title="Profile"
              >
                <Icon icon="user-circle" />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
