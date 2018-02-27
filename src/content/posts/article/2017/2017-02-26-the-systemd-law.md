---
category: blog
layout: post
title: "The systemd law"
---

[systemd](https://www.freedesktop.org/wiki/Software/systemd/) is somewhat of a controversial topic in the Linux ecosystem. This init system for Linux distributions is loved and hated by many people, and people never seem to stop complaining about it. Meanwhile, Linux distros are slowly adopting `systemd` to the point of scaring the hard-line `systemd` detractors into creating [their own spin-off of their favourite distro](https://devuan.org/) with `systemd` violently ripped apart from it.

I love how a discourse always breaks out on any tech-related group chat I'm in as soon as someone mentions `systemd`. I agree that `systemd` might be the best thing to come out of the Linux ecosystem since sliced bread. I also agree that `systemd` includes numerous oddities, quirks, and stupidities in its codebase. However, I'd argue that as stupid as `systemd` does its job, some of its quirks serve some purpose, and the people who maintain the distros adopting `systemd` felt it was an advantage to use it.

There are many people who bemoan and bitch about `systemd` simply because it's the Hip Thing&trade; to do. Simply complaining because of its existence, and wishing that it would vanish off the face of the earth. Yet still, they never funneled all that wasted energy into making the init ecosystem great again[^fn-1] and either improve `systemd`, give constructive feedback to its development, or, if they have the time, develop an init system that takes the good ideas of `systemd` as well as throwing out its bad bits.

[This kind of negativity is always bad](https://medium.com/@thejameskyle/dear-javascript-7e14ffcae36c), especially for open-source software maintainers. First of all, it's funny, and also sad, seeing how many people complain about free stuff (this software is provided "as-is", no warranty of any kind, expressed or implied, etc etc.), and secondly, as long as people keep on complaining on systemd without offering a viable alternative, it's here to stay.

`systemd` is the Linux equivalent of Godwin's Law.

In which case, I propose the `systemd` law:

> As a Linux-related internet discussion grows longer, the probability of a
> discourse involving `systemd` approaches 1.

---

[^fn-1]: I had to do it, sorry.
