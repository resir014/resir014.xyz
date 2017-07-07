;(function () {
  var flavors = [
    'has an internet connection',
    'makes stupid web things',
    'writes code',
    'intermittently posts blog entries',
    'is online',
    'plays video games',
    'has a phone',
    'takes photos',
    'is afraid of dogs',
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

  var colors = [
    'bg-base09',
    'bg-base0A',
    'bg-base0C'
  ]

  // select our random flavor text from the above array
  var flavorIndex = Math.floor(Math.random() * flavors.length)
  var colorIndex = Math.floor(Math.random() * colors.length)
  var flavorText = document.getElementById('flavorText')

  flavorText.innerHTML = flavors[flavorIndex]
  flavorText.className = colors[colorIndex]
})()
