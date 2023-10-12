---
category: article
layout: post
title: 'A lot of Trackmania maps will be broken in a few months'
lead: "And for once, it's not Nadeo's fault."
header_image: /assets/article/2023/a-lot-of-trackmania-maps-will-be-broken-in-a-few-months/header.jpg
date: '2023-10-15T18:00:00+07:00'
---

In a few months, many custom maps made for [Trackmania](https://www.trackmania.com/) will be broken. Okay, that sentence was a bit hyperbolic, but it still affects any Trackmania map that you're building or playing. Let me explain.

You may know that you can embed custom signs and mods in a Trackmania. To make these signs visible to other players, you either need to use what is called a "locator file", a file ending in `.loc` which points to the URL in which the custom sign is hosted, or you can also do this in-game.

![Setting a custom sign through external URL in the Trackmania map editor](/assets/article/2023/a-lot-of-trackmania-maps-will-be-broken-in-a-few-months/Trackmania_1gNLtYyYWK.png)

As long as the file remains available to load, the signs will still work. However, in a few months, many links to these signs will be broken, and will result in these signs to fall back to the default in-game signs. And if you use custom directional signs, this will break your map in terms of accessibility.

To understand why, we have to talk about the Discord CDN.

## Changes to Discord's CDN

Recently, CDN URLs for Discord attachments have had three new query parameters added to them.

```
[attachment URL]?ex=[timestamp]&is=[timestamp]&hm=[signature]
```

These parameters, [as explained by Discord](/assets/article/2023/a-lot-of-trackmania-maps-will-be-broken-in-a-few-months/effc0257882aebcb.png), are as follows:

- `ex`: timestamp indicating when the attachment URL will expire, after which point you'd need to retrieve another URL (by doing something like retrieving the same message and copying the attachment link)
- `is`: timestamp indicating when the URL was issued
- `hm`: unique signature that will remain valid until `ex`.

These attachment URLs will work until the timestamp set in the `ex` parameter, after which the link will no longer work. When that happens, you will need to fetch a new URL for said attachment.

## Why is this added?

The most possible reason for the change is that Discord will soon start cracking down on people using the Discord CDN as file hosts, a practice commonly known as [hotlinking](https://en.wikipedia.org/wiki/Inline_linking).

Hotlinking adds additional bandwidth to a server, which can cause additional hosting fees for the owner of a website by serving up bandwidth not coming from within said website. Which is why some websites, especially forums, enforce a "no-hotlinking" policy where files like images won't load if they're embedded externally.

## When will this change take place?

As announced in the Discord Developers server, Discord gives users and developers a grace period until "later this year". After that, older Discord CDN links will not work unless you use links with the new format.

After this grace period, old CDN URLs without the appropriate query parameters will no longer work.

## What will this do to my Trackmania maps?

As mentioned earlier, custom signs will normally have something called a "locator file" associated to it. This is a file ending in `.loc` which will tell the game where to load the custom sign from. When the game fails to download these signs, due to one reason or another, it will fall back to the default in-game signs.

![Default signs in a Trackmania map](/assets/article/2023/a-lot-of-trackmania-maps-will-be-broken-in-a-few-months/Screen11.jpg)

This is bad news if your map relies on custom directional signs. Not having directional signs [breaks the accessibility of your map](https://twitter.com/SapphironTM/status/1372141626978619393), since players will have no guidance on where to go. This might become a problem especially if your routes are not very obvious or when dense scenery blocks the view on the route.

## What should I do?

If your map is already published, there's nothing you can do about it. Fixing the signs and then saving your map will create a new version of your map, with all the leaderboards reset. Unless you don't mind having your map's leaderboards be reset by uploading a new version with all the signs fixed, keep your map as is.

If you're building a map right now, consider moving your signs to be hosted elsewhere.

This also goes without saying that if you are developing sign packs for a mapping project, or any other projects that require certain files to be hosted somewhere, **please don't use CDNs that are tied to a platform that's not intended to also act as file host**. Use a more reliable third party hosting platform, or if you have the means, host them yourselves.

## Alternatives

There are a few services that you can use to host your sign packs and mods, with some even providing free hosting.

- [GitHub Pages](https://docs.github.com/pages)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Amazon S3](https://aws.amazon.com/s3/)
- [ManiaCDN](https://upload.maniacdn.net/)
