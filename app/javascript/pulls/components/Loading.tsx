import React from "react";
import { LoadingComponentProps } from "react-loadable";

function Loading({ pastDelay }: LoadingComponentProps): JSX.Element {
  if (pastDelay) {
    return null;
  } else {
    return null;
  }
}

export default Loading;