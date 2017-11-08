---
category: blog
layout: post
title: "npm's single point of failure"
lead: "Another take on the left-pad disaster, and how it could've been avoided."
redirect_from: /2016/03/23/npms-single-point-of-failure/
tags:
- javascript
- nodejs
---

A few hours earlier, a developer named [Azer Koçulu](https://twitter.com/azerbike) unpublished (or, depending on who you believe in, "liberated") [more than 250 of his modules](https://medium.com/@azerbike/i-ve-just-liberated-my-modules-9045c06be67c) from the `npm` registry. The move was sudden, and was made regarding a disagreement between him and a lawyer representing a messaging app called [Kik](http://www.kik.com/) over one of his modules, which was, incidentally, also named `kik`.

The main problem is: one of this package was essential for *a lot* of other npm packages. The package in question was called [`left-pad`](https://github.com/azer/left-pad). Soon after, a lot of users reported that they can't install a lot of npm modules, most notably [babeljs](https://www.npmjs.com/package/babel), due to this missing dependency. And so, [the drama ensues](https://github.com/azer/left-pad/issues/4).

While I choose to take no sides on this issue, I believe that Azer was entitled to his own opinion (well, a lot of annoyed programmers started to give him beef when it happened, anyways). In fact, the main problem actually lies with how the npm system works. There has also been some posts criticising npm's packaging system long before the `left-pad` disaster even occured, most notably [this article](http://www.jongleberry.com/why-i-hate-npm.html) by [Jonathan Ong](https://twitter.com/jongleberry).

**Full disclosure:** I’m not really an active node user. I’ve never really used it other than for running a few Grunt/Gulp scripts. While I agree with some of that post’s sentiments (in fact, I’ve grown an irrational hatred of nested modules, thanks to npm), I’m not going to beat around the bush. There are, in fact, a handful of problems that could pose a danger to the Node ecosystem when someone has unpublished a package.

---

In npm, packages share a global namespace that are registered on a first-come, first-served basis. This could be an unfortunate case for some aspiring developer who wanted to publish his own package called `my-awesome-package`, but couldn't because that name has been squatted by someone else with a half-arsed code that hasn't been updated in forever.

However, it's a completely different story when you unpublish something from the npm registry. As soon as you unpublished a package, that namespace is disaccosiated from that package, and the name is up for grabs for everyone to use again.

Remember that one time, when [someone published a malicious npm package](https://blog.liftsecurity.io/2015/01/27/a-malicious-module-on-npm) which had a `preinstall` hook that runs the `rm -rf /*` command on your shell? If someone unpublished a fairly popular npm package, that package name is up for grabs again. Someone else could then take control of that package name, and publish his own version of the package, which bits of its code swapped out to include malicious code.

A more general problem that arises is that people just trust the developer of a package. Packages aren't approved by anyone, and they're often updated without checking the code. When npm ["un-un-published"](https://twitter.com/seldo/status/712414400808755200) `left-pad`, they transferred the ownership of it to someone who said they'd maintain it. This also means that people have to trust npm to pick someone trustworthy. And given that we *still* have no way to verify packages on npm, that code could be secretly swapped out to include malicious code pretty easily.

---

The fact that the unpublishing of a small npm package with only 17 lines of code leads to packages breaking all over the place is a serious single point of failure, which really needs to be addressed properly. But unfortunately, nothing has been done, even after the whole `rimrafall` fiasco. In fact, there has been an attempt to add [package verification using GPG into npm](https://github.com/npm/npm/pull/4016), but unfortunately, the pull request was rejected.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">You could literally write leftPad in the time it takes &#39;npm install left-pad&#39; to complete.</p>&mdash; Krøstian (@cjno) <a href="https://twitter.com/cjno/status/712553941066711040">March 23, 2016</a></blockquote>

The first thing that we've learned, is that npm should really find a way to do away with its global package naming system. Something like `username/package` would be a proper package naming scheme to use, because it's important that we could verify the the author of said package, while avoiding name squatting at the same time.

And finally, it's interesting that we could just blindly trust some globally-namespaced package without any form of verification. Just like how we trust secure websites with a green padlock on your browser, I silently wait for the day that we could safely install npm packages, verified through network of trust that would transparently verify any npm packages, be it by package signing (like what Android does), or what have you.

Until then, just be careful about what you `npm install`.

---

*Thanks to [@hexdefined](https://twitter.com/hexdefined) for his help on this post!*

*Discuss on [Lobste.rs](https://lobste.rs/s/i5etp7/npm_s_single_point_of_failure)*
