---
layout: page
title: "The Ultimate foobar2000 Setup*"
lead: "*) Subjectively."
header_image_url: /images/etc/fb2k/2017-06-06_06-29-39.png
redirect_from:
  - blog/2015/11/08/the-ultimate-foobar2000-setup
  - 2015/11/08/the-ultimate-foobar2000-setup
  - foobar2000
  - fb2k
---

<figure>
  <img src="/images/etc/fb2k/2017-06-06_06-29-39.png" alt="foobar2000 screenshot">
</figure>

(Last updated: 19 November 2017)

[foobar2000](http://www.foobar2000.org/) (fb2k) is the most lightweight, powerful, customizable music player I've ever used. I switched over from iTunes, as I was getting tired of the bloat it has become, and I have never turned back ever since.

Of course, I did initially run into some concerns that it won't be able to do the things that I always found useful on iTunes. And with fb2k's bare, customisation-focused experience, it does certainly look unappealing to the casual music listeners, and it *really* involves a lot of tweaking to really improve the user experience. After hours of tweaking, I finally managed to pull it off, and my fb2k installation now looks beautiful.

Here's a guide on how to make your fb2k look more like the one above. Sure, this might not be the best setup there is, but at least it makes your fb2k experience more bearable. Each section will outline the required components for you to download and follow along.

---

## Interface

Required components:

* [Columns UI](http://yuo.be/columns.php)

The default fb2k interface is fine, but unfortunately it lacks some pretty important features, like customizable playlist views, and most importantly, [thumbnail toolbars](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#thumbbars) with [playback controls](/images/etc/fb2k/2015-11-07_00-03-28.png) like most other music players have.

When I started transitioning to fb2k, a friend of mine recommended that I use [Columns UI](http://yuo.be/columns.php), and I loved it at first sight. It improves much of fb2k's user experience, and it also adds thumbnail toolbars to your taskbar, without any additional components needed. It's pretty much a multi-purpose UI kit for fb2k.

After you've finished installing Columns UI and set it as your default UI, you will be presented with this screen.

<figure>
  <img src="/images/etc/fb2k/2015-11-07_22-25-11.png" alt="The initial Columns UI setup screen.">
  <figcaption>The initial Columns UI setup screen.</figcaption>
</figure>

Here you can choose a number of quick UI presets for you to get started, but if needed, you can later customize it from `Preferences > Display > Columns UI > Layout`.

<figure>
  <img src="/images/etc/fb2k/2015-11-07_22-36-35.png" alt="Columns UI settings page.">
  <figcaption>Columns UI settings page.</figcaption>
</figure>

Unfortunately, I've never touched this section, so look up on how you play around with this section yourself, I guess. If you're wondering why I recommended you use Columns UI, we'll get to that later.

## Automated track ratings

Required components:

* [Dynamic Fields](https://www.hydrogenaud.io/forums/index.php?showtopic=86853&start=0&p=744320&#entry744320)
* [Playback Statistics](http://www.foobar2000.org/components/view/foo_playcount)

One other thing that fb2k lacks is a rating system. I've tried looking for some random components that does this but none of them do what I wanted. Then I came across [this article](http://www.giantpygmy.net/gpa/index.php?id=dada-autorating) explaining the Date and Duration Adjusted (DADA) auto-rating algorithm, an automated, algorithm-based rating system for fb2k.

The article above provides an in-depth explanation on how the algorithm works. It does take a while to understand how the algorithm makes any sense, but four or five months in, you'll start to see it really kick in.

[This link](http://www.giantpygmy.net/gpa/data/uploads/files/dada_autorating_dar_latest_version.txt) shows in detail how to get the DADA algorithm up and running, complete with all of the options that are available. If reading's not your thing, follow these guides.

First, open `File > Preferences > Media Library > Dynamic Fields`, click on the Add Field (+) button, and name this field `dynamic_rating`.

<figure>
  <img src="/images/etc/fb2k/2015-11-20_23-21-32.png" alt="dynamic_rating">
</figure>

Then, on the "Title formatting expression" textfield, paste the following:

```
$puts(pc,%play_count%)
$puts(x,$add($date_diff(%added%),2))
$puts(y,$date_diff(%added%,%last_played%))
$puts(z,$sub($get(x),$get(y),2))
$puts(l,%length_seconds%)
$puts(lib0,$date_diff(2000))
$puts(lib1,$div($add($mul($sub(100,$div($date_diff(%added%),$div($get(lib0),100))),15),2600),30))
$puts(pc1,$add($get(pc),2))
$puts(pc3,$mul($get(pc1),$get(pc1),$get(pc1)))
$puts(b1,$add($div($date_diff(2015),5),0))
$puts(b2,$add($div($get(b1),50),500))
$puts(d0,$ifgreater($get(l),3599,$muldiv(9000,$get(l),3600),9000))
$puts(d1,$muldiv($add($get(l),540),1,4))
$puts(d2,$muldiv($get(l),$get(l),$get(d0)))
$puts(d3,$add($get(d1),$get(d2)))
$puts(r0,$mul($add(1000,$muldiv($get(d3),$get(pc),100)),10))
$puts(dd,$div($add($get(y),50),10))
$puts(pp,$muldiv($get(pc),10000,$get(x)))
$puts(2,$muldiv($get(dd),$get(pp),100))
$puts(3,$muldiv($get(x),$get(lib1),100))
$puts(4,$div($get(pp),50))
$puts(5,$div($muldiv($add($div($date_diff(%added%,%first_played%),5),5000),$get(b2),$add($div($get(l),20),140)),$add($div($get(pc3),58),3)))
$puts(6,$muldiv($get(pc),625,$get(x)))
$puts(7,$add($get(3),$get(5),$get(6)))
$puts(r1,$add($get(2),$get(r0)))
$puts(r2,$add($get(4),$sub($get(r1),$get(7))))
$puts(r2a,$ifgreater($get(r2),0,$get(r2),1))
$puts(r3,$sub($get(r2),$div($mul($get(r2a),$get(z),3),50000)))
$puts(r4,$add($get(r3),$get(b1)))
$ifgreater($get(pc),0,$num($get(r4),5),-----)
```

Then set your recalculation interval in the dropdown at the top. I usually set it to 5 minutes. Then click "Okay" twice, and fb2k will restart.

Now, to add the column to our playlist view, go to `File > Preferences > Display > Columns UI > Playlist View`, then click on the Columns tab.

Add a column at the very end. Let's call it "Rating."

<figure>
  <img src="/images/etc/fb2k/2015-11-20_23-37-20.png" alt="Creating the 'Rating' column">
  <figcaption>Creating the 'Rating' column.</figcaption>
</figure>

Now, click on the Scripts tag, and paste the following into the textfield on the "Display" tab.

```
$puts(maxdar,10000)
$puts(mindar,5000)
$puts(maxsub,$sub($get(maxdar),0))
$puts(r3,$ifgreater(%_dynamic_rating%,$get(maxsub),$get(maxsub),%_dynamic_rating%))
$puts(r4,$ifgreater($get(r3),0,$get(r3),1))
$puts(minmax,$sub($get(maxdar),$get(mindar)))
$puts(darind1,$sub($get(r4),$get(mindar)))
$puts(darind2,$div($mul($get(darind1),10),$get(minmax)))
$puts(darind3,$ifgreater($get(darind2),1,$get(darind2),1))
$puts(display,$rgb(100,100,100)$repeat($char(9679),$get(darind3))$rgb(220,220,220)$repeat($char(9679),$sub(10,$get(darind3))))
$puts(notplayed,$rgb(200,200,200)- n/a -)
$ifgreater(%_dynamic_rating%,0,$get(display),$get(notplayed))
```

This will give you a nice visual of the rating, with dots, as seen below. If you want to just use the actual number for this column, just type `%_dynamic_rating%` into the same textfield.

<figure>
  <img src="/images/etc/fb2k/2015-11-20_23-41-37.png" alt="Visual of the rating.">
</figure>

Congrats, you now have the DADA rating installed!

### DADA-curated playlist

Required components:

* [Columns UI](http://yuo.be/columns.php)

Now that we have the DADA rating system set up, what I like to do now is to create a "Top Tracks" autoplaylist which sorts out all tracks based on its DADA rating, and this is where Columns UI comes into play. Columns UI includes something called "NG Playlist", which allows for further customisations to your playlists.

If you take a look at my first screenshot, the "All Music" playlist are grouped based on albums. Obviously I wouldn't want the same grouping for the Top Tracks playlists. So far, Columns UI is the only component that I can find that supports different grouping schemes for playlists.

If you open `Preferences > Playlist View > Grouping`, you will see this.

<figure>
  <img src="/images/etc/fb2k/2015-11-08_00-17-37.png" alt="Preferences > Playlist View > Grouping">
</figure>

The first grouping rule in that window is included by default. But we're gonna tweak it a bit by double clicking on it. Then, on the playlist filters, select "Hide on playlists" from the dropdown, and add the playlists that you want the grouping rules to be ignored at, separated by semicolons. Here's an example.

<figure>
  <img src="/images/etc/fb2k/2015-11-08_00-19-46.png" alt="Grouping rule example.">
  <figcaption>Grouping rule example.</figcaption>
</figure>

Save your changes, and there you go, a 100%-working Top Tracks playlist.

## Organising your music

This section will be broken down in two parts. In the first part, I will explain on how to organise your music library with a neat, iTunes-like folder structure, and in the second part I will talk about automatic tagging with Discogs.

### Editing queued tracks

Required components:

* [Queue Contents Editor](http://wiki.hydrogenaud.io/index.php?title=Foobar2000:Components/Queue_Contents_Editor_(foo_queuecontents))

It appears that fb2k doesn't have a built-in utility to reorder queued tracks. Fortunately, Queue Contents Editor (`foo_queuecontents`) is here to the rescue! This component allows you to modify, add, and remove track from your queue.

<figure>
  <img src="/images/etc/fb2k/2017-11-19_13-01-15.png" alt="Queue Contents Editor">
</figure>

### File Operations

If there's one thing to love from iTunes, is that I love how it organises your music collection neatly into their own folders, separated by artist and album. It really has been what made me stuck with iTunes for too long, and when I made the switch to fb2k, I just had to research on whether fb2k would be able to do the same.

Fortunately, there's a built-in component that does more or less the same thing. File Operations (`foo_fileops`) is a built-in component that is included if you choose to install fb2k with some additional components.

First thing to do would be to set up your FileOps configs. Right click on any track and go to `File Operations > Move to > ...`.

<figure>
  <img src="/images/etc/fb2k/2015-11-08_00-26-49.png" alt="File Operations">
</figure>

Here, you can add, remove, or save presets for FileOps. The most important option here would be "File name pattern". I use the following pattern, to make it look more like iTunes:

```
%album artist%/%album%/[%discnumber%-]%tracknumber% %title%
```

You can learn more about defining file name patterns on this [wiki page](http://wiki.hydrogenaud.io/index.php?title=Foobar2000:File_operations).

In order to organise new music in your library, first you **must** move your new music into a placeholder directory inside your main library folder, like `_unsorted`. Then head over to `Library > Album List`, then right click on "All Music", then head over to `File Operations > Move to` then select your saved preset, like so.

<figure>
  <img src="/images/etc/fb2k/2015-11-08_00-35-07.png" alt="Moving tracks somewhere else in your system using FileOps.">
  <figcaption>Moving tracks somewhere else in your system using FileOps.</figcaption>
</figure>

You will now see a preview of the changes made in your directory. Click "Run" to confirm your changes.

### Tagging with Discogs

Required components:

* [Discogs Tagger](https://www.foobar2000.org/components/view/foo_discogs)

It's very important to properly tag your music library, for the sake of consistency, especially when you're sharing what you're listening to to services like [Last.fm](http://www.last.fm/).

Well, good news: `foo_discogs` does exist. Unfortunately, before you want to use it, you will have to create an account at <http://www.discogs.com/> in order to get an OAuth token to [access their API](https://www.discogs.com/developers/#page:authentication,header:authentication-discogs-auth-flow). If you don't want to do that, you can try [MusicBrainz tagger](https://www.foobar2000.org/components/view/foo_musicbrainz), which grabs data from MusicBrainz's database, though it's not as robust as the one for Discogs. (You can always use a third-party tagging tool like [Picard](https://picard.musicbrainz.org/).)

To use this component, right click on any track/album, and head over to `Tagging > Discogs > Write Tags`. It will then look up the Discogs database for your album details.

<figure>
  <img src="/images/etc/fb2k/2015-11-08_01-03-47.png" alt="foo_discogs automatically looks up your track on the Discogs database.">
  <figcaption>foo_discogs automatically looks up your track on the Discogs database.</figcaption>
</figure>

Once found, choose the appropriate release for the album, and click Next. (You can also manually type the Release ID, if you know it.)

<figure>
  <img src="/images/etc/fb2k/2015-11-08_01-05-57.png" alt="The Release screen of foo_discogs.">
</figure>

Review your changes in the next dialog box, and click on "Write Tags" to write the new ID3 tags to your tracks.

Though keep in mind that this only saves the album art into the album directory *without* writing it to the ID3 tags too. To do so, right click on the tracks again, and go to `Tagging > Batch attach pictures`.

<figure>
  <img src="/images/etc/fb2k/2015-11-08_01-08-51.png" alt="Manually attaching the album art to the ID3 tags.">
  <figcaption>Manually attaching the album art to the ID3 tags.</figcaption>
</figure>

Choose to overwrite the album art already attached to the track if necessary, then click "OK" to save your changes.

## Backing up your fb2k installation.

If in some cases you'll need to reinstall your computer, and you couldn't afford to lose your sick fb2k setup, you can back up your fb2k installation and transfer it to another computer. [This article on How-To Geek](http://www.howtogeek.com/howto/19035/backup-and-transfer-foobar2000-to-a-new-computer/) will explain how.

---

## Conclusion

In conclusion: yes, you *can* actually make your fb2k experience to be more bearable. Yes, fb2k is the one of the best, most customisable music players out there, and yes, you *should* use it yourself too.

Feel free to use this guide as you wish. Customisation is one of fb2k's prime experience, in fact, I *encourage* you to improve on this setup yourself. The setup demonstrated here is what has always worked for me, and people's preferences can be different, so feel free to change things up here and there if you don't like how some stuff works.

It's a tedious process at first, but trust me, it really *will* be worth it at the end of the day. Feel free to [tweet at me](https://twitter.com/resir014) if you need help in your setup procedure.
