---
featured: true
category: article
layout: post
title: 'Dynamic broadcast overlays with Google Sheets and web technologies'
lead: 'How we built the broadcast package for the Asia/OCE Trackmania Championship.'
header_image: /assets/article/2022/dynamic-broadcast-overlays-with-google-sheets-and-web-technologies/header.png
date: '2022-06-01T12:00:00+07:00'
---

The [Asia and Oceania Trackmania Championship](https://liquipedia.net/trackmania/Asia_and_Oceania_Trackmania_Championship/2022/Spring) concluded last Sunday with a $350+ prize pool given out to the winners. It is the premier Trackmania competition for the Asia, Middle East, and Oceania regions that has been going strong for 1 year.

From the beginning, we've always wanted to push the limits on the production quality of all our broadcasts. And for this season, we decided to innovate by providing a customised, editable broadcast dashboard.

This post outlines how we managed to put our simple, yet powerful broadcast overlays together. It is mostly meant for the technically-minded, but it's laid out so that everyone can still grasp the basics.

## Design + implementation

Since I'm already heavily familiar with web technologies, I've always tried to use it for everything. The power of OBS Studio's browser source is that you can put anything within the frame of a browser. This allows greater flexibility for our designs, without being restricted by the limitations of OBS Studio's built-in sources.

You can also feed in dynamic data and change elements of the overlay in real-time. With dynamic data being fetched through a web API, overlay changes can feel as fast as almost immediately. This allows us to avoid the clunky process of editing a source within OBS itself.

I've used similar tech for my own personal [livestream overlays](https://github.com/resir014/stream-overlays). So I figured it would be a good way to push this idea to the limit by putting it in a fast-paced environment of live esports broadcasting.

The design was made by [Lvyathan](https://twitter.com/Lvyathan), who also have been doing our graphic design for the past few seasons of AOTC. We initially sketched the designs in a tool called [Figma](https://www.figma.com/), which is commonly used for web projects.

<figure>
  <img src="/assets/article/2022/dynamic-broadcast-overlays-with-google-sheets-and-web-technologies/design-sketches.png" alt="Design sketches made in Figma, including some graphics that didn't make the cut." />
  <figcaption>Design sketches made in Figma, including some graphics that didn't make the cut.</figcaption>
</figure>

For the web itself, we've decided to use tools that we're already familiar with, React with [Next.js](https://nextjs.org/) for the framework, and [Tailwind.css](https://tailwindcss.com/) for styling. Each overlay is generated as a Next.js page that the OBS browser source can point to. You can arrange these page URLs any way you like, e.g. `/scenes/next-match`. They're designed to fit within a 1920x1080 screen, the standard for 1080p broadcasts.

Under the hood, we use [React Query](https://react-query.tanstack.com/) as our all-in-one data fetching logic. We use this to fetch dynamic data from our overlay, as well as handling data caching and polling API requests to make overlay updates seamless.

But of course, there's one missing piece of the puzzle: Google Sheets.

## The power of Google Sheets

Why Google Sheets? Well, because it's flexible enough to be turned into anything! It allows us to develop additional tools for our overlay without extra overhead. That's why we decided to use it to provide a "broadcast dashboard" spreadsheet, which producers can use to modify the display of each overlay.

During the broadcast, we wanted to have some form of "player card" to provide a small bio for each player participating in a certain match. We compiled those data from players through a Google form. This data will serve as a lookup table for the players.

The dashboard spreadsheet was put up with the help of fellow organiser [NachoQT](https://nachoqt.carrd.co/). Through some lookup tables and fancy function magic, we were able to compile the data for all players competing. We then turn these into a "broadcast dashboard", which producers can use to modify the display of each overlay.

<figure>
  <img src="/assets/article/2022/dynamic-broadcast-overlays-with-google-sheets-and-web-technologies/dashboard-example.png" alt="Screenshot of the broadcast dashboard spreadsheet." />
  <figcaption>Screenshot of the broadcast dashboard spreadsheet.</figcaption>
</figure>

Note the different tabs for languages at the bottom. This will be explained later.

To fetch the data from the spreadsheet, we use the [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet) package from npm. This is a small subset of the core [Google APIs npm package](https://www.npmjs.com/package/googleapis), which is a huge package that contains APIs for _all Google products_. So that's a bit too overkill for us.

First, we will need to create a service account. This is the standard authentication method to communicate with Google's API. The [google-spreadsheet documentation](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account) provides a guide on how you

After following the steps above, you should have your service account key like this.

```json
{
  "type": "service_account",
  "project_id": "[redacted]",
  "private_key_id": "[redacted]",
  "private_key": "[redacted]",
  "client_email": "[redacted]",
  "client_id": "[redacted]",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/[redacted]"
}
```

We will take the `client_email` and `private_key` to use in the next step. Keep it safe and store it in an environment variable, or somewhere else that you use to handle secrets.

Then, we prepare the API by initialising a `GoogleSpreadsheet` object, and pass in our target spreadsheet ID. The spreadsheet ID is the long string of text in any Google spreadsheet URL.

After that, we pass in the service account credentials that we just received.

```ts
// utils/google-sheets.ts

import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function getGoogleSheetById(sheetId: string | number) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '',
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
  });

  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetId];

  return sheet;
}
```

Now we can use this object in any of our Google Sheets API calls. [...]

```ts
// pages/api/matches/get-latest-result.ts

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const locale = parseString(req.query.locale);
    const sheet = await getGoogleSheetById(DEFAULT_SHEET_ID);
    await sheet.loadCells('B14:D17');

    res.status(200).json([
      {
        name: sheet.getCellByA1('C14').value,
        country: sheet.getCellByA1('B14').value,
        result: sheet.getCellByA1('D14').value,
      },
      {
        name: sheet.getCellByA1('C15').value,
        country: sheet.getCellByA1('B15').value,
        result: sheet.getCellByA1('D15').value,
      },
      {
        name: sheet.getCellByA1('C16').value,
        country: sheet.getCellByA1('B16').value,
        result: sheet.getCellByA1('D16').value,
      },
      {
        name: sheet.getCellByA1('C17').value,
        country: sheet.getCellByA1('B17').value,
        result: sheet.getCellByA1('D17').value,
      },
    ]);
  } else {
    res.status(404).json({
      message: 'Not found.',
    });
  }
}
```

[using react-query to poll data]

## Internationalisation (i18n) and multiple-language overlays

From the beginning, we planned to have our broadcast available in multiple languages. Of course, since different broadcasts may cover different matches at once, we need to spl

Thankfully, Next.js' [internationalisation (i18n) routes](https://nextjs.org/docs/advanced-features/i18n-routing) has us covered.

[easily add new languages, e.g. French]. This means we can also use additional tools to add localised strings for the overlays. Although we didn't implement that due to time constraints.

[...]

## Results

The result is a clean, fluid overlay. Here are some examples on how it looked in action.

<p><iframe src="https://clips.twitch.tv/embed?clip=DeterminedRelievedSeahorseResidentSleeper-gRZL5gBFrjROuBxo&parent=resir014.xyz" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe></p>

<p><iframe src="https://clips.twitch.tv/embed?clip=ImpartialGracefulJellyfishPupper-hZNa06b-5nIlZ2tZ&parent=resir014.xyz" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe></p>

<p><iframe src="https://clips.twitch.tv/embed?clip=SuperAlertScallionDoritosChip-F8czHCvaEJFvi0B7&parent=resir014.xyz" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe></p>

As a way to give back to the community, I've made the source code to the overlays open-source and available on [GitHub](https://github.com/Trackmania-Asia-OCE/aotc-broadcast-package). Feel free to take it apart, fork it, and learn from it!

## Future work

[improve reliability]
