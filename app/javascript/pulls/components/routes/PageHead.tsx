import React from "react";
import { Helmet } from "react-helmet";

function PageHead({ title }: { title?: string }): JSX.Element {
  return <Helmet title={title} titleTemplate="%s - Cody" defaultTitle="Cody" />;
}

export default PageHead;
