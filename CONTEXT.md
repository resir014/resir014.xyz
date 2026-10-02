# resir014.xyz

Resi Respati's personal website: a publishing site for dated writing and media, standalone pages, and a project portfolio. It is an IndieWeb site, so content follows IndieWeb conventions and is published with microformats2 (https://indieweb.org/microformats) so other sites and readers can parse it.

## Language

### IndieWeb

**IndieWeb**:
The set of conventions for owning your content and identity on your own domain. It is the specification all content on this site follows.

**Microformats**:
The microformats2 class vocabulary that makes the site's HTML machine-readable (e.g. `h-entry`, `h-card`, `p-name`, `dt-published`). A **Post** or **Page** is only complete if it carries the right microformats.
_Avoid_: Semantic classes, metadata classes

**Entry**:
The microformats representation (`h-entry`) of a single **Post** or **Page**: its name, content, published date, **Permalink**, and author.

**Author card**:
The microformats representation (`h-card`) of Resi as the author of an **Entry**.
_Avoid_: Bio, profile box

**IndieWeb post type**:
The IndieWeb name for a kind of post (article, bookmark, photo, video, jam, note). Every **Post kind** is an **IndieWeb post type** and takes its meaning from the IndieWeb definition.

**Permalink**:
The canonical, permanent URL of an **Entry** (`u-url`).

**Identity link**:
A `rel="me"` link from the site to one of Resi's profiles elsewhere, which proves those profiles belong to the same person.
_Avoid_: Social link (when you mean the verification link)

### Content

**Post**:
A dated entry on the site's timeline. Every post has exactly one **Post kind**, and its date and slug come from the name of its file.
_Avoid_: Entry, blog post (when the kind is not an **Article**)

**Post kind**:
The type of a **Post**: **Article**, **Bookmark**, **Jam**, **Photo**, or **Video**. Each kind is an **IndieWeb post type**. The kind decides which section a post appears in, how its **Permalink** is shaped, and which **Microformats** it carries.
_Avoid_: Category (in code the frontmatter field is `category`, but that word is reserved here for **Project category**)

**Article**:
A long-form written **Post** with a title (IndieWeb "article"). Articles are the only kind shown under "Posts" and included in the **Feed**.
_Avoid_: Blog post, essay

**Bookmark**:
A **Post** that shares an external link (IndieWeb "bookmark", `u-bookmark-of`). It has no page of its own and only appears in the reading list.
_Avoid_: Link post, reading-list item

**Jam**:
A **Post** that shares a piece of music Resi is currently into, usually as an embedded video (IndieWeb "jam"). IndieWeb has no standard markup for jams.
_Avoid_: Song, track post

**Photo**:
A **Post** built around a single image, with an optional caption (IndieWeb "photo", `u-photo`). Frozen: existing **Photos** and their permalinks stay live, but no new ones are authored.

**Video**:
A **Post** built around an embedded video (IndieWeb "video"). Frozen: existing **Videos** and their permalinks stay live, but no new ones are authored.

**Page**:
An undated, standalone piece of content at a top-level URL (e.g. About, Uses, Contact).
_Avoid_: Static page

**Etc page**:
An undated, standalone piece of content kept in the miscellaneous "etc" section, apart from the main **Pages**.

**TIL entry**:
A bite-size Entry recording one thing Resi recently learned, numbered rather than dated in its URL (`/til/<n>`), with the number fixed by its source filename. It still carries a `date` in frontmatter and full **Microformats** (`h-entry`, `dt-published`, **Author card**), like every other **Entry**.
_Avoid_: Note (a distinct, unused **Post kind** in code), TIL post

**Project**:
A portfolio item describing something Resi built or contributed to. Each project belongs to exactly one **Project category**.

**Project category**:
The group a **Project** is shown under: portfolio, open-source ("oss"), or other.

### Content attributes

**Lead**:
The short summary shown under a title and used as the description in previews and the **Feed**.
_Avoid_: Excerpt, subtitle

**Header image**:
The hero image of a **Post** or **Page**, also used as its social preview image.
_Avoid_: Cover, thumbnail

**Featured**:
A flag that promotes an **Article**, **Photo**, or **Project** into the highlighted slots on the homepage and section indexes.

**Syndication**:
The list of external copies of a **Post** (`u-syndication`), following the IndieWeb practice of publishing on your own site first and then copying elsewhere (POSSE).
_Avoid_: Cross-post, share

**Callout**:
A highlighted box in the body of a **Post** or **Page**, either default or warning.
_Avoid_: Alert, notice (the markup class is `message`)

**Content asset**:
An image or file belonging to a specific piece of content and stored alongside it in the content tree.

### Site surfaces

**Feed**:
The syndicated list of **Articles**, published as RSS, Atom, and JSON Feed.
_Avoid_: Newsletter

**Dashboard**:
The page that shows live stats pulled from Twitch, YouTube, and Spotify. It is the only surface whose data is not fixed at build time.

**Linktree**:
The page listing every place Resi can be found online, grouped by category.

**Flavour text**:
The randomly chosen tagline on the homepage.
_Avoid_: Splash text

**Design system**:
The site's shared visual building blocks (avatar, badge, divider, logo, message box) and the brand's colour and type tokens.

**Chungking**:
The current, deprecated **Design system**, which a future rebrand will replace.
_Avoid_: using "design system" to mean Chungking specifically; always name it

## Relationships

- Every **Post** and **Page** is an **Entry**, and every **Entry** has one **Permalink** and one **Author card**.
- A **Post** has exactly one **Post kind**. Only **Articles** appear in the **Feed**.
- Every **Post kind** except **Bookmark** has its own permalink.
- A **Project** has exactly one **Project category**.
- A **Header image** or **Callout** can belong to a **Post** or a **Page**.
- A **TIL entry** is an **Entry** but neither a **Post** (no **Post kind**, number instead of date-derived slug) nor a top-level **Page** (nested, numbered collection).

## Example dialogue

> **Dev:** Should the new photo post show up in the RSS feed?
> **Resi:** No. The **Feed** is **Articles** only. A **Photo** is its own **Post kind**.
> **Dev:** And the "category" field in its frontmatter says `photo`. Is that a **Project category**?
> **Resi:** No, that field holds the **Post kind**. **Project categories** only exist on **Projects**.
> **Dev:** If I want it on the homepage I mark it **Featured**?
> **Resi:** Yes. The homepage shows the most recent **Featured** **Photo**.

## Flagged ambiguities

- **"Posts"**: the `/posts/` section and the **Feed** contain only **Articles**, but in code "post" also means any **Post kind**. Here, **Post** means any kind; use **Article** when you mean the section.
- **"Category"**: the frontmatter field `category` holds the **Post kind** on posts and the **Project category** on projects. Always name the specific concept.
- **"Feed"**: in this glossary **Feed** means the RSS/Atom/JSON syndication of **Articles**. The IndieWeb also has a microformats feed (`h-feed`) for a list of **Entries** on an HTML page. Say "h-feed" explicitly when you mean that one.
- **"Note"**: code recognises a `note` **Post kind** with a `/notes/` path, but no notes exist and there is no route. Treat it as not being a **Post kind** until one is published.
