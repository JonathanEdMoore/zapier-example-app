const subscribeHook = (z, bundle) => {
  const data = {
    url: bundle.targetUrl,
    another_param: "my data",
    something_else: true
    // etc
  };

  const options = {
    url: 'your endpoint url',
    method: 'POST',
    body: JSON.stringify(data)
  };

  // make the request and parse the response - this does not include any error handling.
  return z.request(options)
    .then(response => z.JSON.parse(response.content));
}

const unsubscribeHook = (z, bundle) => {
  // bundle.subscribeData contains the parsed response from the subscribeHook function.
  const hookId = bundle.subscribeData.id

  const options = {
    url: `your endpoint url/${hookId}`,
    method: 'DELETE'
  }

  return z.request(options)
    .then(response => z.JSON.parse(response.content));
}

const parsePayload = (z, bundle) => {
  // bundle.cleanedRequest will include the parsed JSON object (if it's not a
  // test poll) and also a .querystring property with the URL's query string.
  const payload = {
    id: bundle.cleanedRequest.id,
    name: bundle.cleanedRequest.name,
    directions: bundle.cleanedRequest.directions,
    style: bundle.cleanedRequest.style,
    authorId: bundle.cleanedRequest.authorId,
    createdAt: bundle.cleanedRequest.createdAt
  };

  return [payload];
}

const getFallbackSample = (z, bundle) => {
  // For the test poll, you should get some real data, to aid the setup process.
  const options = {
    url: 'your API endpoint here',
    params: {
      style: bundle.inputData.style
    }
  };

  return z.request(options)
    .then(response => JSON.parse(response.content));
}

module.exports = {
  key: 'recipe',
  noun: 'Recipe',
  display: {
    label: 'New Recipe',
    description: 'Trigger when a new recipe is added.'
  },
  operation: {
    inputFields: [{ key: 'style', type: 'string', required: false }],
    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,
    perform: parsePayload,
    performList: getFallbackSample,
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: 'Best Spagetti Ever',
      authorId: 1,
      directions: '1. Boil Noodles\n2.Serve with sauce',
      style: 'italian'
    }
  }
}