const listRecipes = (z, bundle) => {
  z.console.log('hello from a console log!')
  const promise = z.request(
    'http://57b20fb546b57d1100a3c405.mockapi.io/api/recipes',
    {
      params: {
        style: bundle.inputData.style
      }
    }
  )
  return promise.then(response => JSON.parse(response.content))
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
    perform: listRecipes,
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