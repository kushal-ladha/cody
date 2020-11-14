import React, { SyntheticEvent } from "react";
import { commitMutation, createFragmentContainer, graphql, RelayProp } from "react-relay";
import { listTimeZones } from "timezone-support";
import TextField from "./inputs/TextField";
import Checkbox from "./inputs/Checkbox";
import type { Profile_user } from "./__generated__/Profile_user.graphql";

const UPDATE_USER_MUTATION = graphql`
  mutation ProfileUpdateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        ...Profile_user
      }
    }
  }
`;

const timezones = listTimeZones();

type Props = {
  user: Profile_user,
  relay: RelayProp
};

type State = {
  email: string,
  sendNewReviewsSummary: boolean,
  timezone: string,
  paused: boolean,
  lastResponseSuccess: boolean
};

class Profile extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.user.email != null ? this.props.user.email : "",
      sendNewReviewsSummary: this.props.user.sendNewReviewsSummary,
      timezone: this.props.user.timezone,
      paused: this.props.user.paused,
      lastResponseSuccess: false
    };
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.currentTarget;
    const name = target.name;
    const value = target.type == "checkbox" ? (target as HTMLInputElement).checked : target.value;
    this.setState({ [name]: value });
  };

  saveChanges = () => {
    this.setState({ lastResponseSuccess: false });
    commitMutation(this.props.relay.environment, {
      mutation: UPDATE_USER_MUTATION,
      variables: {
        input: {
          email: this.state.email,
          sendNewReviewsSummary: this.state.sendNewReviewsSummary,
          paused: this.state.paused,
          timezone: this.state.timezone
        }
      },
      onCompleted: () => {
        this.setState({ lastResponseSuccess: true });
      }
    });
  };

  render() {
    return (
      <div>
        <section className="section">
          <div className="container">
            {this.state.lastResponseSuccess ? (
              <article className="message is-success">
                <div className="message-body">Profile updated successfully</div>
              </article>
            ) : null}
            <div className="columns">
              <div className="column is-half">
                <h1 className="title">Profile</h1>
                <TextField
                  label="Email"
                  name="email"
                  value={this.state.email}
                  handleChange={this.handleChange}
                />

                <div className="field">
                  <label className="label" htmlFor="timezone">
                    Time Zone
                  </label>
                  <div className="select">
                    <select
                      name="timezone"
                      value={this.state.timezone}
                      onChange={this.handleChange}
                    >
                      {timezones.map(zone => {
                        return (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <h2 className="title is-4 is-spaced form-section-header">
                  Subscription Preferences
                </h2>
                <Checkbox
                  label="Send code review summary digests"
                  name="sendNewReviewsSummary"
                  checked={this.state.sendNewReviewsSummary}
                  handleChange={this.handleChange}
                />

                <h2 className="title is-4 is-spaced form-section-header">
                  Assignment Preferences
                </h2>
                <Checkbox
                  label="Pause automatic assignment of new reviews"
                  name="paused"
                  checked={this.state.paused}
                  handleChange={this.handleChange}
                />

                <div className="field">
                  <div className="control">
                    <button
                      className="button is-primary"
                      onClick={this.saveChanges}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default createFragmentContainer(
  Profile,
  {
    user: graphql`
      fragment Profile_user on User {
        login
        email
        name
        sendNewReviewsSummary
        timezone
        paused
      }
    `
  }
);
