---
featured: true
category: article
layout: post
title: 'How I accidentally built a popular tool for Trackmania streamers: the story of TMViz'
lead: 'From a side project created out of frustration, to a tool used by many.'
header_image: /assets/article/2021/the-story-of-tmviz/header.png
date: '2021-05-26T13:00:00+07:00'
---

For developers, side projects often feel like a nuisance.

There seems to be all sorts of ideas floating around the head of a developer, but figuring out which idea to put the work in is a lot harder. And once we find the time to work on a side project, we get sidetracked by any other side project idea we came up with during our morning coffee. But sometimes, the perfect formula for a side project can arrive out of the most mundane situations.

This is the story of how I accidentally built [TMViz](https://tmviz.vercel.app/), a tool that became popular among Trackmania streamers. This post will contain a lot of technical details. But with it, I do hope to tell a story about how I developed and still actively maintain a side project which has a decently-sized userbase.

## Motivation

I've been livestreaming consistently for about 1.5 years under my own [Twitch channel](https://www.twitch.tv/resir014). I've been playing a lot of racing games on stream, and as of late I've also been streaming [Trackmania](https://trackmania.com/) almost consistently. I've played Trackmania casually ever since the Trackmania Nations Forever (TMNF) days in 2009, and with the new release of Trackmania, I want to take it a little more seriously.

As I started watching some popular Trackmania streamers on Twitch for inspiration, I've noticed that some streamers have a custom overlay which shows the current inputs on their controller/keyboard, one of them being [padviz](https://github.com/piatf/padviz). But sadly, back then I could never find out what it's called. And I was the kind of guy who was very shy in chat, because I'm fairly new to the Trackmania community on Twitch.

I was getting frustrated that I couldn't find it. So I decided to make my own.

## First iteration

To make the first iteration of my overlay, I used a technology which 1) I'm familiar with; and 2) has been tried and tested by many different apps for ages: the web. In JavaScript, we can use the [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) to receive inputs from game controllers and react to it. Remember this API - it will become important later.

I'm a fan of tools that you can set up quickly and then forget about it. In padviz, you need to run a separate app in the background to provide the overlay, and you will have to do that every time you start your stream. By providing an overlay that can be included in OBS as a browser source, it's a truly set-and-forget solution.

The initial iteration of the overlay was implemented within a week. It was initially created as a module within my [web-based stream overlays set](https://github.com/resir014/stream-overlays), and remained that way for the first few weeks/months.

<figure>
  <img src="/assets/article/2021/the-story-of-tmviz/tmviz-01-screenshot.jpg" alt="Screenshot of the first iteration of TMViz." />
  <figcaption>Screencap of my Twitch stream with the first iteration of TMViz on the right panel.</figcaption>
</figure>

## Second iteration

I used the first iteration of this tool on my own stream for a couple weeks. At some point during my stream, someone in the chat noticed my tool and that it's different compared to padviz. He asked whether or not it might work for another streamer's controller, since padviz won't work for this one streamer.

Turns out, since padviz was a desktop app written in Python, support for lesser-known controllers was quite flaky. The streamer in question uses a Stadia controller, which was not supported in padviz. Since the web-based Gamepad API is supported by all major browsers - including the OBS browser source - and supports any controller that you could plug into your computer, I immediately saw the need for a standalone version.

I recently read [a thread by Kavaeric](https://twitter.com/Kavaeric/status/1391933781901197319) about the inner workings of UI/UX design, and I realised I already have a mental model of what my target users are going to be like while coming up with the standalone version of TMViz:

- they're streamers
- they need a set-and-forget solution that can be easily plugged into any streaming software
- they use a multitude of controllers; even keyboards

So immediately, I saw the need for a usable overlay customizer. I put together a customiser UI with NextJS and Chakra UI, which generates an overlay URL.

![Screenshot of the TMViz customizer](/assets/article/2021/the-story-of-tmviz/tmviz-customizer.png)

The overlay and game logic itself is easy enough to move, although I redesigned the overlay to match the look of padviz.

The Overlay URL scheme takes some imspiration from [Discord StreamKit](https://streamkit.discord.com/overlay). This way, I could build a system to create a personalised URL based on the settings saved in the customizer. None of the settings is stored in any external server, since everything is saved in the browser's local storage.

The final step was to tweak the design of the overlay to match the design of padviz's overlay.

<figure>
  <img src="/assets/article/2021/the-story-of-tmviz/tmviz-02-screenshot.png" alt="Screenshot of the second iteration of TMViz." />
  <figcaption>Screenshot of the second iteration of TMViz.</figcaption>
</figure>

Once everything is done, I worked on branding. I named it TMViz, designed a simple logo for it, and made it public.

## Ship, then bite your fingernails

The second iteration of TMViz was piloted by the same streamer who used the Stadia controller. After a day, he came back to me with the word I had initially feared: the overlay is broken.

The streamer reported the overlay would be frozen after a while. When this happens, he had to hide and then show the overlay to make it work again.

At this point, I was still using the first iteration of my overlay, so I wasn't able to eat my own dogfood. I decided to transition to TMViz so that I could test this issue, and I ran into the same issue. I also realised that when I opened Task Manager, the OBS process which houses the browser source would have an unusually high memory usage.

I decided to run a memory profiler while the overlay was being used, and soon enough, I found the problem. It turns out that implementing the UI of the controller overlay in Chakra UI caused a memory leak. This will cause the overlay to freeze when the OBS browser source can't handle the memory. So I immediately rushed to rewrite the overlay part of TMViz to use [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css).

So that's one issue fixed. I could also relax for a bit, knowing that I could now eat my own dogfood by using TMViz on my own channel.

## How a side gig becomes a full-time job

Around this time, TMViz was also picked up by a popular streamer. He requested me to tweak the overlay so that he can also visualise his use of the D-pad at the same time. It turns out, some players sometimes switch between analog sticks and D-pads when driving on different surfaces (for example, ice).

I spent a few hours refactoring the control schemes to support multiple input methods. I also tweaked the design of the customiser to make setting up keybinds easier. I pushed the update and notified the streamer that the feature is implemented.

The next day, the same streamer reports some issues. After asking some questions, I learned that sometimes he has two controllers plugged in. It turns out, the order of when the controller is plugged in takes precedence in the overlay, and TMViz would. And through computer restarts, the order might change, because of how Windows detects USB devices during bootup. I tweaked the customiser so that users can pick which controller gets picked up by the overlay.

I pushed the fix. The next bug report that came from him completely baffled me. The overlay would crash seemingly at random. Throughout my streams and debugging sessions, I could never replicate it.

Then something dawned on me. At work, we've been using [Sentry](https://sentry.io/) to log any errors from our users. Sentry collects detailed stack trace from any user whenever an exception is handled within the code, and it has been instrumental to us at work. So I thought it would be a great time to finally give it a spin on my side projects.

So I implemented Sentry and waited for more errors to come in. Based on the stack trace I collected, it turns out I didn't handle the case where a pressed button doesn't exist in the controller.

Oops. Rookie mistake, I know.

Fixing this issue didn't take that long. But of course, debugging and triaging this issue did take a while. I'm glad that tools like Sentry exists. Otherwise the best way of debugging this issue would be individually contacting whoever reported the issue, and asking them about technical stuff they wouldn't understand.

After this final fix, the overlay has grown more stable over time. It's still being picked up by more streamers as time goes, and it's becoming more commonly shared around amongst the Trackmania communities on Discord.

## Epilogue, and what's next

So what did I learn while building this? Sometimes, the best ideas for a side project are the ones that are already in front of your eyes. Solve real problems _you_ are having. As the best React instructor on Earth, [Kent C. Dodds](https://twitter.com/kentcdodds), would tell us:

> [Don't] invent problems just so you can create solutions to them. Nobody will care. Contribute to existing solutions, and solve problems where there are no solutions or the existing solutions are lacking.

&mdash; Kent C. Dodds, in ["Intentional Career Building"](https://kentcdodds.com/blog/intentional-career-building)

I would like to personally thank all the streamers who use TMViz. It always brightens my day seeing that tiny little overlay every time I browse through [Trackmania streams](https://www.twitch.tv/directory/game/TrackMania) on Twitch, regardless of viewer count. I have never felt any more invigorated to continue maintaining any side project than ever before.

What's next for TMViz, then? The next item on the list would be keyboard support. This would be a technical feat in of itself, but I understand there's a lot of demand for this. So I'll be sure to make that a reality.

Until then, I can assure everyone that I will keep maintaining TMViz as long as I remain in the Trackmania scene. I am also open for any questions regarding the technical side of the overlay, or just to ask for technical support. You can mention me on [Twitter](https://twitter.com/resir014), or you can head over to the `#tmviz-support` channel on my [Discord server](https://discord.gg/ws3P4wf).
