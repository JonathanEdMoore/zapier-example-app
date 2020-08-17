const recipe = require('./triggers/recipe')

const addApiKeyToHeader = (request, z, bundle) => {
  request.headers['MY-AUTH-HEADER'] = bundle.authData.apiKey
  return request
}


module.exports = {
  authentication: {
    type: 'custom',
    fields: [{ key: 'apiKey', type: 'string' }],
    test: (z, bundle) => {
      const promise = z.request(
        'http://57b20fb546b57d1100a3c405.mockapi.io/api/me'
      )
      return promise.then(response => {
        if (response.status !== 200) {
          throw new Error('Invalid API Key')
        }
      })
    }
  },

  beforeRequest: [
    addApiKeyToHeader
  ],

  version: require('./package.json').version,

  platformVersion: require('zapier-platform-core').version,

  triggers: {
    [recipe.key]: recipe
  },

  searches: {},

  creates: {},

  resources: {},
};
