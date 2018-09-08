---
category: article
layout: post
date: 2018-03-31T23:00:00+07:00
title: 'Building a faster, snappier feed reader with PWA + JAMstack'
lead: 'Written as part of the #WWWIDChallenge on Progressive Web Apps.'
header_image: header.jpg
syndication:
  - name: Medium
    url: https://medium.com/@resir014/building-a-faster-snappier-feed-reader-with-pwa-jamstack-6337f3760a47
---

[Progressive Web App (PWA)](https://developers.google.com/web/progressive-web-apps/) is a promising technology, which allows web apps to take on a more native role. However, since the technology is still in its infancy, there's still uncertainty on where to start with PWAs.

About a month ago, Yohan Totting posted the [#WWWIDChallenge](https://medium.com/wwwid/tantangan-web-developer-untuk-membuat-aplikasi-web-bisa-digunakan-kurang-dari-5-detik-70bb7431741d) on Progressive Web Apps (PWA). The challenge was to create a feed reader for the [WWWID Medium publication](https://medium.com/wwwid) as a PWA. I was free to choose any framework I wanted, and decided to go the [JAMstack](https://jamstack.org/) route and create it as a statically-generated PWA.

So, essentially:

- A statically-generated PWA built with [GatsbyJS](https://www.gatsbyjs.org/), hosted on [Netlify](https://www.netlify.com/).
- A cron job runs the Netlify webhook to re-build pages once a day
- HTTP/2 (provided by default on Netlify) with server push
- Uses `gatsby-image` to enable image optimisation with Sharp + lazy-loading

## Attempt #1

Let's start with a basic setup. A Gatsby.js with minimal styles, and a basic service worker setup using `gatsby-plugin-offline`. We're going to see if Gatsby's "performance by default" mantra really takes hold. And yep, it is.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/WWWIDChallenge?src=hash&amp;ref_src=twsrc%5Etfw">#WWWIDChallenge</a> Attempt #1.  JAMstack, statically-generated with <a href="https://twitter.com/gatsbyjs?ref_src=twsrc%5Etfw">@gatsbyjs</a>. <a href="https://t.co/FWJhD09agR">pic.twitter.com/FWJhD09agR</a></p>&mdash; 🎺KUINGIN KAU MENJADI ISTRIKU🎺 (@resir014) <a href="https://twitter.com/resir014/status/963797504083902464?ref_src=twsrc%5Etfw">February 14, 2018</a></blockquote>

## Attempt #2

Since this website is statically generated, we're gonna have to find a way to dynamically generate the static pages. So I decided to move my hosting to [Netlify](https://www.netlify.com), which supports HTTP/2 as well as webhooks which can be used trigger Gatsby’s build command. I have a cron job running on a VPS to run said webhook to build our Gatsby site. Unfortunately, the PWA score goes down a bit, since by default, Netlify doesn't automatically redirect to HTTPS, but at least it's some progress.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/WWWIDChallenge?src=hash&amp;ref_src=twsrc%5Etfw">#WWWIDChallenge</a> Attempt #2. Finally moving to Netlify for that sweet HTTP/2. Will look into image processing with Sharp tomorrow. <a href="https://t.co/w5MxdRN0ry">pic.twitter.com/w5MxdRN0ry</a></p>&mdash; 🎺KUINGIN KAU MENJADI ISTRIKU🎺 (@resir014) <a href="https://twitter.com/resir014/status/963812540231835649?ref_src=twsrc%5Etfw">February 14, 2018</a></blockquote>

## Attempt #3

Now we're gonna take it up a notch. We'll use all the best practices laid out by Gatsby, which means, image processing + lazyloading. Gatsby uses Sharp to process these images, resize them to fit the container's maximum width, and runs optimisation tasks.

During this attempt, I then realised that I've been running the wrong WebPageTest test. I should've ran the Slow 3G quick test + Lighthouse. So I did just that, and the results are still promising.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/WWWIDChallenge?src=hash&amp;ref_src=twsrc%5Etfw">#WWWIDChallenge</a> Attempt #3, added image processing with Sharp + lazyloading with `gatsby-image`. Bisa diakses di <a href="https://t.co/9VdCebOqWa">https://t.co/9VdCebOqWa</a> <a href="https://t.co/u7T6yqCdVA">pic.twitter.com/u7T6yqCdVA</a></p>&mdash; 🎺KUINGIN KAU MENJADI ISTRIKU🎺 (@resir014) <a href="https://twitter.com/resir014/status/963970087320305664?ref_src=twsrc%5Etfw">February 15, 2018</a></blockquote>

## The Result

As a result, I managed to load a statically-generated, service-worker-enabled website to load in less than 5 seconds, thanks to Gatsby. The website remains statically-generated, to stick true to the [JAMstack](https://jamstack.org/) principles, but remains dynamic by having the content rebuilt daily. With a close-to-default service-worker-enabled GatsbyJS setup, it's possible to make a website load in less than 5 seconds on a slow 3G connection.

To view the final result of the project, [click here](https://wwwidchallenge-2018-feb.netlify.com/). To view the source code, [click here](https://github.com/resir014/wwwidchallenge-2018-feb).
