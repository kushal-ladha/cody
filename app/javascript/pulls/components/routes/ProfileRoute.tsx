import React from "react";
import Profile from "../Profile";
import PageHead from "./PageHead";
import { QueryRenderer, graphql, Environment } from "react-relay";
import { ProfileRouteQuery } from "./__generated__/ProfileRouteQuery.graphql";

function ProfileRoute({ environment }: { environment: Environment }): JSX.Element {
  return (
    <>
      <PageHead title="Profile" />
      <QueryRenderer<ProfileRouteQuery>
        environment={environment}
        query={graphql`
          query ProfileRouteQuery {
            viewer {
              ...Profile_user
            }
          }
        `}
        variables={{}}
        render={({ error, props: queryResponse }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (queryResponse) {
            return <Profile user={queryResponse.viewer} />;
          }
          return null;
        }}
      />
    </>
  );
}

export default ProfileRoute;
