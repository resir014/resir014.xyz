---
category: article
layout: post
title: "Why 'porn filters' never work"
lead: 'In which I rant about the shit that is TRUST+ Positif, again.'
tags:
  - personal
  - indonesia
  - internet-positif
  - censorship
header_image: /assets/article/2016/why-web-filters-never-work/chrome_2016-08-20_15-00-15.png
---

If you've been following my blogs lately, I [have been](/2014/05/12/a-desperate-plea-for-internet-freedom/) [ranting](/2016/02/17/tumblr-and-the-internet-positif-hammer/) [a lot](https://medium.com/southeast-asian-social-critique/indonesias-internet-censorship-two-years-on-41831c6c16b4) about how the Indonesian government's "Internet Positif" program, along with their "TRUST+ Positif" web filtering system, a government program where ISPs are required to block these so-called "abusive" websites, particularly those that contain/spread pornography, gambling, and hate speech. I have long argued against this filter as it is basically a borderline-censorship system with a lack of transparency involved, contains a lot of domains mistakenly referred to as "abusive", and doesn't help at all with preventing kids from browsing porn on the internet.

Luckily, thanks to the help of third-party DNS providers and VPNs installed in my home internet I have been able to circumvent these filters and get to access the free, open web as its founders intended. Unfortunately, my mobile network filters out all third-party DNS connections, so I had to resort to using Tor for Android.

There have been a lot of stories about how websites get mistakenly blocked (specifically Reddit, Tumblr, and Vimeo) due to false allegations of it containing "pornographic material", but then the government proceeded to come up with the logic that because typing "porn" on the search bar yields some results, therefore they spread pornographic material. With such a skewed logic about the internet, I'm quite surprised they haven't blocked search engines, or quite literally, [the entire internet](https://www.youtube.com/watch?v=NiFD6EFVsTg).

![chrome_2016-08-20_15-00-15](/assets/article/2016/why-web-filters-never-work/chrome_2016-08-20_15-00-15.png)

However, one certain domain within the list has taken the cake. Yesterday, I was introduced to this amazing app called [Enki](https://enki.com/). It's an app where you can get "daily workouts" to improve your programming skills. All from Python to JavaScript, you will get new insights on the programming skills you have, great for refreshing your memory. It also includes minigames related to the learning topics you choose, so it also throws in the "fun" factor when you learn your new programming language.

So I signed up for an invite code, and when I was finally provided with one, and proceeded to sign up with it, then I got a [connection error](./Screenshot_20160820-151426.png). Weird. I then tried accessing the website from my phone, through my mobile network, without any VPN, and, lo and behold, [it's blocked](/assets/article/2016/why-web-filters-never-work/Screenshot_20160820-143654.png).

To verify this, I opened the official TRUST+ Positif website and searched the domain name through their database, and my suspicions are confirmed.

![chrome_2016-08-20_14-36-43](/assets/article/2016/why-web-filters-never-work/chrome_2016-08-20_14-36-43.png)

So basically, thanks to some web filter fuckery, their domain (along with their API access) is blocked and redeeming invite codes, even logging in, can't be done on regular Indonesian networks.

---

Whilst I am 90% sure that this is an old filter that never got cleared out of the list, this further exposes yet another major flaw in web filters. For app developers, you better not have a blocked domain in your API URL, else you're fucked.

Maybe it was originally a dead porn domain that someone bought and TRUST+ never managed to remove it from their database, we'll never know. But the fact that TRUST+ never checks whether or not these domains are dead, or have been replaced with something new, the Indonesian market now couldn't access this amazing app. All because of one shady web filter which uses borderline-censorship tactics and all the wrong ways to promote "safe browsing" for children.

Oh, and I managed to signed up and access the app through my home network, because fuck Internet Positif.
