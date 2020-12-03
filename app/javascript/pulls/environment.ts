import { Network, Environment, RecordSource, Store } from "relay-runtime";

function makeEnvironment(csrfToken: string): Environment {
  function fetchQuery(operation: { text: unknown; }, variables: unknown) {
    return fetch("/graphql", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "X-CSRF-Token": typeof csrfToken == "string" ? csrfToken : "",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        query: operation.text, // GraphQL text from input
        variables
      })
    }).then(response => {
      return response.json();
    });
  }

  const network = Network.create(fetchQuery);

  return new Environment({
    network,
    store: new Store(new RecordSource())
  });
}

const csrfToken = document
  .getElementsByName("csrf-token")[0]
  .getAttribute("content");

const environment = makeEnvironment(csrfToken);

export default environment;