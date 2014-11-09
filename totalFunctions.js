function cities (response) {
  function city(person) {
    return person.city;
  }
  return response.body.map(city);
}

cities({
  body: [
    {name: 'someone',     city: 'Berlin'},
    {name: 'another one', city: 'Amsterdam'}
  ]
})

cities({
  body: [
    {name: 'someone',     city: 'Berlin'},
    {name: 'another one'}
  ]
})
