<p align="center">
  <a href="https://anime.danzaii.cn">
    <img src="./public/anideck-icon.svg" width="96" height="96" alt="AniDeck logo" />
  </a>
</p>

<h1 align="center">AniDeck</h1>

<p align="center">
  Apple TV style anime information deck, built with Next.js and designed for self-hosting.
</p>

<p align="center">
  <a href="https://anime.danzaii.cn">Live Demo</a>
  ·
  <a href="https://github.com/DanZai233/AniDeck/fork">Fork</a>
  ·
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDanZai233%2FAniDeck&project-name=anideck&repository-name=AniDeck&env=CRON_SECRET,NEWS_FEEDS&envDescription=Optional%20cache%20refresh%20secret%20and%20custom%20RSS%20feeds&envLink=https%3A%2F%2Fgithub.com%2FDanZai233%2FAniDeck%23environment-variables">Deploy to Vercel</a>
</p>

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDanZai233%2FAniDeck&project-name=anideck&repository-name=AniDeck&env=CRON_SECRET,NEWS_FEEDS&envDescription=Optional%20cache%20refresh%20secret%20and%20custom%20RSS%20feeds&envLink=https%3A%2F%2Fgithub.com%2FDanZai233%2FAniDeck%23environment-variables">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
  <a href="https://github.com/DanZai233/AniDeck/fork">
    <img src="https://img.shields.io/badge/Fork%20on-GitHub-24292f?style=for-the-badge&logo=github" alt="Fork on GitHub" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/DanZai233/AniDeck">
    <img src="https://img.shields.io/github/stars/DanZai233/AniDeck?style=flat-square&logo=github" alt="GitHub stars" />
  </a>
  <a href="https://github.com/DanZai233/AniDeck/fork">
    <img src="https://img.shields.io/github/forks/DanZai233/AniDeck?style=flat-square&logo=github" alt="GitHub forks" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT license" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vercel-ready-000?style=flat-square&logo=vercel" alt="Vercel ready" />
</p>

---

## What Is AniDeck?

AniDeck is a responsive anime information aggregator. It pulls public metadata,
news feeds, character data, wiki search results, and official source links into
an Apple TV inspired browsing experience.

It is meant for fans who want a clean homepage for trending shows, seasonal
anime, character discovery, and legal viewing entry points.

<table>
  <tr>
    <td><strong>Poster-first UI</strong><br />Hero carousel, horizontal rails, detail pages, and large artwork.</td>
    <td><strong>Tri-lingual titles</strong><br />Chinese, Japanese, and English display modes with URL language state.</td>
  </tr>
  <tr>
    <td><strong>Character discovery</strong><br />AniList characters, voice actors, and Moegirl search links.</td>
    <td><strong>Deploy anywhere</strong><br />Vercel, Node.js server, PM2, reverse proxy, or your own infrastructure.</td>
  </tr>
</table>

## Feature Cards

<table>
  <tr>
    <td width="33%">
      <h3>Home Deck</h3>
      <p>Trending, airing, seasonal, and upcoming anime rails with poster cards and a rotating hero section.</p>
    </td>
    <td width="33%">
      <h3>Anime Details</h3>
      <p>Banner, cover, score, episodes, duration, next airing time, genres, descriptions, and titles in three languages.</p>
    </td>
    <td width="33%">
      <h3>Official Sources</h3>
      <p>Aggregates public official links and platform search pages instead of mirroring or embedding unauthorized streams.</p>
    </td>
  </tr>
  <tr>
    <td width="33%">
      <h3>Characters</h3>
      <p>AniList character cards with avatars, roles, native names, voice actor names, and external profile links.</p>
    </td>
    <td width="33%">
      <h3>Moegirl</h3>
      <p>MediaWiki open search integration for work pages and character entry discovery with shorter search keywords.</p>
    </td>
    <td width="33%">
      <h3>News Feeds</h3>
      <p>RSS aggregation for anime news. You can replace the default feeds with your own sources.</p>
    </td>
  </tr>
  <tr>
    <td width="33%">
      <h3>JSON API</h3>
      <p>Built-in API routes for anime lists, anime detail, news, refresh, and health checks.</p>
    </td>
    <td width="33%">
      <h3>Mobile Ready</h3>
      <p>Designed for phones, tablets, desktops, and TV-like large screens without horizontal page overflow.</p>
    </td>
    <td width="33%">
      <h3>Cron Cache Warmup</h3>
      <p>Vercel Cron can call the refresh route every day to keep common data paths warm.</p>
    </td>
  </tr>
</table>

## Preview

| Home | Detail |
| --- | --- |
| Apple TV style hero carousel and poster rails | Posters, characters, sources, Moegirl, and episode links |

The public demo is available at [anime.danzaii.cn](https://anime.danzaii.cn).

## Data Sources

AniDeck currently uses these public sources:

| Source | Usage |
| --- | --- |
| AniList GraphQL | Trending anime, metadata, characters, official links, streaming episode links when provided |
| Bangumi API | Chinese titles and Chinese summaries |
| Moegirl MediaWiki API | Work page search and related character pages |
| Anime News Network RSS | News feed |
| MyAnimeList RSS | News feed |
| Jikan / MAL public data | Supplemental official and external links |

## Legal Boundary

AniDeck only aggregates public metadata, RSS news, wiki search results, and
official or licensed viewing entry points. It does not scrape pirate streaming
sites, bypass login, bypass region controls, break DRM, store videos, proxy
video files, or embed unauthorized media.

In this project, "playback source" means an official platform page, a source
link returned by public metadata, or an official search page. Examples include
Crunchyroll, Netflix, HIDIVE, Disney+, Hulu, Prime Video, Apple TV, Bilibili,
Tencent Video, iQIYI, Youku, ABEMA, d Anime Store, U-NEXT, Niconico, TVer,
Bandai Channel, YouTube official channels, Muse Asia, Ani-One Asia, and similar
licensed sources.

## One-click Deploy

The fastest path is Vercel:

<p>
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDanZai233%2FAniDeck&project-name=anideck&repository-name=AniDeck&env=CRON_SECRET,NEWS_FEEDS&envDescription=Optional%20cache%20refresh%20secret%20and%20custom%20RSS%20feeds&envLink=https%3A%2F%2Fgithub.com%2FDanZai233%2FAniDeck%23environment-variables">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
</p>

You can also fork first:

<p>
  <a href="https://github.com/DanZai233/AniDeck/fork">
    <img src="https://img.shields.io/badge/Fork%20this%20repository-24292f?style=for-the-badge&logo=github" alt="Fork this repository" />
  </a>
</p>

After clicking the Vercel button:

1. Sign in to Vercel.
2. Import the repository into your own GitHub account.
3. Set optional environment variables if you need custom feeds or protected refresh.
4. Click Deploy.
5. Add your own domain in Vercel Project Settings if needed.

## Environment Variables

All environment variables are optional for a basic deployment.

| Name | Required | Example | Description |
| --- | --- | --- | --- |
| `CRON_SECRET` | No | `a-long-random-secret` | Protects `/api/refresh`. Vercel Cron calls it with `Authorization: Bearer <secret>`. |
| `NEWS_FEEDS` | No | `Anime News Network\|https://...` | Overrides default RSS feeds. Use `name\|url`, separate multiple feeds with commas. |

Example:

```bash
CRON_SECRET=replace-with-a-long-random-secret
NEWS_FEEDS=Anime News Network|https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us,MyAnimeList|https://myanimelist.net/rss/news.xml
```

If `CRON_SECRET` is not set, `/api/refresh` stays publicly callable.

## Local Development

Requirements:

| Tool | Version |
| --- | --- |
| Node.js | `>= 20.9.0` |
| npm | Comes with Node.js |

Clone and run:

```bash
git clone git@github.com:DanZai233/AniDeck.git
cd AniDeck
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
npm run lint
npm run build
npm run start
```

## Deploy to Vercel Manually

```bash
npm install
npm run build
npx vercel deploy --prod
```

If you use Vercel Cron, keep `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/refresh",
      "schedule": "0 18 * * *"
    }
  ]
}
```

## Deploy to Your Own Server

AniDeck is a normal Next.js app. Any server that can run Node.js 20.9+ can host
it.

### 1. Build on the server

```bash
git clone git@github.com:DanZai233/AniDeck.git
cd AniDeck
npm ci
npm run build
npm run start
```

By default, `next start` listens on port `3000`.

### 2. Run with PM2

```bash
npm install -g pm2
pm2 start npm --name anideck -- run start
pm2 save
pm2 startup
```

### 3. Reverse proxy with Nginx

```nginx
server {
  listen 80;
  server_name anime.example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Then add HTTPS with Certbot or your preferred certificate manager.

### 4. Refresh data on your own server

Vercel Cron only runs on Vercel. On your own server, use system cron:

```bash
0 18 * * * curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://anime.example.com/api/refresh
```

If you did not set `CRON_SECRET`, remove the `Authorization` header.

## API Routes

| Route | Description |
| --- | --- |
| `/api/anime` | Home anime data. Add `?q=keyword` for search. |
| `/api/anime/[id]` | Anime detail by AniList id. |
| `/api/news` | Aggregated RSS news. |
| `/api/refresh` | Warm common caches. Optional `CRON_SECRET` protection. |
| `/api/health` | Checks upstream source availability. |

## Project Structure

```text
src/
  app/                 Next.js App Router pages and API routes
  components/          UI components for deck, cards, rails, and credits
  lib/                 Data clients, display helpers, i18n, and site metadata
public/
  anideck-icon.svg     App icon and README logo
vercel.json            Daily refresh cron
```

## Customization Ideas

- Replace `NEWS_FEEDS` with your preferred anime news RSS feeds.
- Change `SITE` in `src/lib/site.ts` to show your own author and repository.
- Add your own official source search templates in `src/lib/anilist.ts`.
- Adjust copy in `src/lib/i18n.ts` for a different tone or language set.
- Connect your own database or KV cache if you want persistent snapshots.

## Roadmap

- Optional user watchlist.
- More official regional source templates.
- Better screenshot assets for README.
- Lightweight admin page for feed configuration.
- Optional persistent cache layer.

## Contributing

Issues and pull requests are welcome. Please keep source integrations legal and
respectful of upstream terms. For playback links, prefer official pages,
licensed channels, and source URLs returned by public metadata providers.

## Author

Made by [DanZai233](https://github.com/DanZai233).

## License

[MIT](./LICENSE)
