import React from "react";
import { Helmet } from "react-helmet";

const PageHead = ({ title }: { title?: string }) => (
  <Helmet title={title} titleTemplate="%s - Cody" defaultTitle="Cody" />
);

export default PageHead;
