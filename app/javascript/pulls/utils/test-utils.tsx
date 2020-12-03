import React from "react";
import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router";

// eslint-disable-next-line react/prop-types
const TestProvider = ({ children }) => {
  return (
    <IntlProvider locale="en" timeZone="UTC">
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </IntlProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function customRender(ui, options?) {
  return render(ui, { wrapper: TestProvider, ...options });
}

export * from "@testing-library/react";
export { customRender as render };
