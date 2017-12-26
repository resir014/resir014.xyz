---
category: blog
layout: post
title: "Getting to know the Linux terminal"
lead: "Can't get your way through the Linux terminal? This guide will get you up and running in minutes."
---

<!-- Add image here in the future. -->

*This article was originally published for one of the blogs that I formerly run, [fuck yeah, elementary OS!](https://fuckyeah-elementaryos.tumblr.com/post/84584655168/getting-to-know-the-linux-terminal-a-fyeos-guide) After three years, I've decided to bring it up to date and republish it on my personal website.*

***

The Terminal is where the magic happens in any UNIX-based operating systems, including Linux. It allows you to do more with your computer than you never knew you could. That is, if you know what you're doing.

This guide is a friendly way to help you get started with the Linux terminal. We will see some basic terminal commands as well as some basic examples on using it, plus some cool simple things that you can do yourself.

***

## Finding the Terminal.

You can access terminal through your GUI, or by using the keyboard shortcut provided by your operating system. On Ubuntu, it's <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd>.

## Some essential commands.

Here are some basic, essential commands that you need to know in order to be able to get your way around. For commands not covered in this section, the [Linux Mint wiki](http://community.linuxmint.com/tutorial/view/100) has a 5-Minute Essential Shell Tutorial for you to follow.

### `cd` -- Navigate through directories.

Example:

```bash
# `cd` - Moves you back to your home folder (for example, `/home/resir014`).
$ cd
# `cd ~` also works.
$ cd ~

# `cd ..` - Takes you back one folder.
$ cd ..
# You can also stack this, for example `cd ../../` will take you back 2 folders.
$ cd ../../

# `cd foldername` - Moves you forward to the given folder *relative to* your current folder.
$ cd stuff

# `cd /path/to/stuff` - Takes you to a specified folder path in your computer, starting from
# the root directory (signified by the first `/`). This is also called an 'absolute path'.
$ cd /srv/www/htdocs
```

### `ls` -- Lists contents of a folder.

Typing `ls` gives you a complete list of all the files and folders in your current working directory.

<!-- Add image here in the future. -->

### `mv` -- Moves a file to another directory.

Example:

```bash
$ mv some-file.txt destination-directory
```

This will move the `some-file.txt` file in your current directory to the folder `destination-directory` within your current directory.

<!-- Add image here in the future. -->

### `uname -a` -- Lists complete system details.

This command lets you check your kernel version, system architecture, and your current operating system details.

<!-- Add image here in the future. -->

## The `sudo` command.

The [`sudo`](http://www.sudo.ws/) command lets normal users to execute commands as a root user, or "super user". This is usually used when you want to perform some administrative tasks on your computer, such as installing, removing or updating packages.

## Package management.

Most third-party apps or libraries on Linux are provided as _packages_, which are installed by _package managers_. Package managers provide an easy way to install third-party apps or libraries through a command line. These packages are hosted on a server called the _package repository_.

Back in the day, especially during the UNIX era, users had to compile each program that they wanted to use on their Linux systems. Over time, some Linux developers decide they needed an efficient way to install packages that could manage packages and its dependencies automatically, including installing, removing, and updating packages. Thus, package managers like `apt`, `pacman`, `yum`, etc. were born.

Now, installing these packages on Linux is as easy as typing

```bash
$ sudo apt install htop
```

into the command line.

Refer to the documentations of your respective distros to learn about how the package managers work there.

## Some nice examples.

These are some basic stuffs you can easily do with the terminal.

### Open an application

Some application has command line utilities that lets you run the app through a terminal. It is stored in your `$PATH` environment variable which your command line shell will load at startup.

For example, you can instantly type `code` from the terminal to launch Visual Studio Code. You can also add some extra arguments to these commands too. A good example is commands like `code .`. The `.` means 'the current directory', so in short, you're telling the command line 'open Visual Studio Code at the current directory'.

### Add a package repository and install additional packages. (Debian/Ubuntu-based systems)

If you're running any Debian/Ubuntu-based systems, they have what's called a **personal package archive** (PPA), which allows the Linux community and third-party developers to provide their own package repository. This usually allows you to install the latest version of any app directly from its vendor.

In this example, we're going to install [Elementary Tweaks](https://github.com/elementary-tweaks/elementary-tweaks), which is provided through the `philip.scott/elementary-tweaks` PPA.

```bash
# First, you need to add the repository to your package lists.
$ sudo add-apt-repository ppa:philip.scott/elementary-tweaks

# Then, refresh your package lists.
$ sudo apt update

# Once it's done, the `elementary-tweaks` package should be available for you to install.
$ sudo apt install elementary-tweaks
```

Then, assuming you already have elementary Tweaks installed, you will now see those newly installed themes on the Tweaks configurations.

## Terminal-based apps.

In the modern day, apps usually profide a graphical interface, but there are also many other popular apps that still relies on the good old command-line interface.

Here are some of my recommended terminal-based apps.

* **[htop](http://hisham.hm/htop/)** -- Interactive process viewer for UNIX-based systems.
* **[Weechat](https://weechat.org/)** -- An extensible, command line-based IRC chat client.
* **[vim](https://vim.sourceforge.io/)** -- A popular terminal-based text editor designed to be compatible with the UNIX text editor `vi`.
* **[Emacs](https://www.gnu.org/software/emacs/)** -- The **other** terminal-based text editor. Completely extensible, and has a thriving extensions ecosystem. (Check out [Spacemacs](http://spacemacs.org/)!)
