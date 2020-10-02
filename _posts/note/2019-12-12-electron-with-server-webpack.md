---
category: note
layout: note
title: 'electron-with-server-webpack'
date: '2019-12-12T12:47:00+07:00'
---

![](/assets/note/2019/electron-with-server-webpack/preview.png)

Electron apps come with their own performance baggage. Therefore, there have been some people working on ways to reduce the memory footprint that Electron has. One of them is [James Long](https://twitter.com/jlongster), with their amazing [electron-with-server example](https://github.com/jlongster/electron-with-server-example).

This was a rewrite of the aforementioned example project, translated to a webpack-friendly setup with [Electron Forge](https://electronforge.io/). See [this blog post](https://jlongster.com/secret-of-good-electron-apps) by James himself to discover the benefits of this architecture.

[Go ahead and give it a spin](https://github.com/resir014/electron-with-server-webpack)!
