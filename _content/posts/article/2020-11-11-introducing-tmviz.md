---
featured: true
category: article
layout: post
title: 'Introducing TMViz'
lead: 'Lightweight, web-based controller visualisation widget for TrackMania.'
header_image: /assets/article/2020/introducing-tmviz/header.png
---

**TMViz** is a lightweight, web-based controller visualisation widget for streaming apps like [OBS](https://obsproject.com/) or [XSplit](https://www.xsplit.com/). It is primarily created for [TrackMania](https://trackmania.com/), but it can be easily reconfigured to work with other racing games.

## Why does this exist?

- I want an overlay that can be included as a browser source.
- I want my overlays to be customisable with a single click.
- I don't want to run any other app locally just to run an overlay.

## How does this work?

This tool utilises the [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API), available on all modern desktop browsers ([see compatibility table](https://caniuse.com/gamepad)), including the OBS browser source. The Gamepad API is a browser API which allows developers to gain access to signals from gamepads and other game controllers and respond to them.

It supports many controller models ranging from the Xbox controller to the PS4 controller. You can check if controller is compatible with the Gamepad API by running [Gamepad Tester](https://gamepad-tester.com/).

## What's next?

There are some features that I've been thinking of, but haven't had the time to implement. Currently there's no way to keep your settings across page reloads. I'm planning to implement local saving of the current overlay settings utilising `localStorage`.

There are also a couple quality-of-life updates planned. Feel free to look through the [GitHub issues list](https://github.com/resir014/TMViz/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) for a list of feature requests and/or bug reports.

---

Hope you'll find it useful! Feel free to look through the source code on [GitHub](https://github.com/resir014/TMViz).
