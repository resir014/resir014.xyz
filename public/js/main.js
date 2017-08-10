;(function () {
  var flavors = [
    'has an internet connection',
    'makes stupid web things',
    'writes code',
    'drives an Asp Explorer',
    'stands up for net neutrality',
    'is online',
    'plays video games',
    'has a phone',
    'takes photos',
    'is afraid of dogs',
    'hates TV',
    'dumps abandoned projects on GitHub',
    'does TypeScript',
    'does JavaScript',
    'listens to music',
    'has a laptop',
    'is a web developer',
    'sleeps at night',
    'is not a furry',
    'probably likes you',
    'wants to be your friend'
  ]

  // select our random flavor text from the above array
  var flavorText = document.getElementById('flavorText')

  flavorText.innerHTML = flavors[Math.floor(Math.random() * flavors.length)]
})()
