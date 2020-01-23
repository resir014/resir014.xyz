---
category: article
layout: post
title: 'You should use Web Workers on your React application'
lead: Break away from the main thread.
date: 2019-11-28T19:00:00+07:00
---

[...]

## In the beginning, there was a single thread

Back in the good old days, browsers only have one thread: the main thread. For simplicity's sake, let's call them "processes. Back when you could only have one page open per browser window, this was the de facto standard of how browsers use resources to render content.

Then, tabbed browsing started becoming a thing. Chrome and Firefox were some of the pioneers of tabbed browsing. However, back in the day, despite the ability to have a lot of tabs, all of these tabs still share the same process. Which means when some websites have to do a lot of busy JavaScript work, this could happen:

[unresponsive]

So we started splitting each tab into their own processes. Chrome was the first browser to do this, followed by Firefox sometime later.
