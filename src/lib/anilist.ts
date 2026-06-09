export type AnimeTitle = {
  romaji?: string | null;
  english?: string | null;
  native?: string | null;
};

export type SourceLink = {
  site: string;
  url: string;
  type: "official" | "streaming" | "search" | "trailer" | "database";
  label?: string;
};

export type StreamingEpisode = {
  title: string;
  thumbnail?: string | null;
  url: string;
  site: string;
};

export type MoegirlPage = {
  title: string;
  url: string;
};

export type AnimeCharacter = {
  id: number;
  name: string;
  nativeName?: string;
  alternativeNames: string[];
  image?: string | null;
  role?: string | null;
  description?: string;
  voiceActor?: {
    name: string;
    nativeName?: string;
    image?: string | null;
  };
  anilistUrl: string;
  moegirlSearchQuery: string;
  moegirlSearchUrl: string;
};

export type AnimeCard = {
  id: number;
  idMal?: number | null;
  bangumiId?: number;
  moegirlSubject?: MoegirlPage;
  moegirlCharacters: MoegirlPage[];
  characters: AnimeCharacter[];
  title: string;
  titleZh?: string;
  titleEn?: string;
  titleJa?: string;
  romajiTitle: string;
  nativeTitle?: string;
  description?: string;
  descriptionZh?: string;
  coverImage: string;
  bannerImage?: string | null;
  accentColor?: string | null;
  format?: string | null;
  status?: string | null;
  episodes?: number | null;
  duration?: number | null;
  averageScore?: number | null;
  popularity?: number | null;
  season?: string | null;
  seasonYear?: number | null;
  genres: string[];
  nextAiringEpisode?: {
    episode: number;
    airingAt: number;
    timeUntilAiring: number;
  } | null;
  sourceLinks: SourceLink[];
  streamingEpisodes: StreamingEpisode[];
};

export type HomeAnime = {
  hero: AnimeCard;
  trending: AnimeCard[];
  airing: AnimeCard[];
  seasonal: AnimeCard[];
  upcoming: AnimeCard[];
};

type AnilistResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

type RawExternalLink = {
  site?: string | null;
  url?: string | null;
  type?: string | null;
  language?: string | null;
};

type RawStreamingEpisode = {
  title?: string | null;
  thumbnail?: string | null;
  url?: string | null;
  site?: string | null;
};

type RawMedia = {
  id: number;
  idMal?: number | null;
  title: AnimeTitle;
  description?: string | null;
  coverImage?: {
    extraLarge?: string | null;
    large?: string | null;
    color?: string | null;
  } | null;
  bannerImage?: string | null;
  format?: string | null;
  status?: string | null;
  episodes?: number | null;
  duration?: number | null;
  averageScore?: number | null;
  popularity?: number | null;
  season?: string | null;
  seasonYear?: number | null;
  genres?: string[] | null;
  nextAiringEpisode?: {
    episode: number;
    airingAt: number;
    timeUntilAiring: number;
  } | null;
  externalLinks?: RawExternalLink[] | null;
  streamingEpisodes?: RawStreamingEpisode[] | null;
  trailer?: {
    id?: string | null;
    site?: string | null;
    thumbnail?: string | null;
  } | null;
  characters?: {
    edges?: RawCharacterEdge[] | null;
  } | null;
};

type RawCharacterEdge = {
  role?: string | null;
  node?: {
    id: number;
    name?: {
      full?: string | null;
      native?: string | null;
      alternative?: string[] | null;
    } | null;
    image?: {
      large?: string | null;
      medium?: string | null;
    } | null;
    description?: string | null;
  } | null;
  voiceActors?: Array<{
    id: number;
    name?: {
      full?: string | null;
      native?: string | null;
    } | null;
    image?: {
      medium?: string | null;
    } | null;
  }> | null;
};

type HomeQueryData = {
  trending: { media: RawMedia[] };
  airing: { media: RawMedia[] };
  seasonal: { media: RawMedia[] };
  upcoming: { media: RawMedia[] };
};

type DetailQueryData = {
  Media: RawMedia | null;
};

const ANILIST_ENDPOINT = "https://graphql.anilist.co";
const BANGUMI_ENDPOINT = "https://api.bgm.tv/v0/search/subjects";
const JIKAN_ENDPOINT = "https://api.jikan.moe/v4";
const MOEGIRL_API_ENDPOINT = "https://zh.moegirl.org.cn/api.php";
const MOEGIRL_BASE_URL = "https://zh.moegirl.org.cn";

const MEDIA_FIELDS = `
  fragment MediaFields on Media {
    id
    idMal
    title {
      romaji
      english
      native
    }
    description(asHtml: false)
    coverImage {
      extraLarge
      large
      color
    }
    bannerImage
    format
    status
    episodes
    duration
    averageScore
    popularity
    season
    seasonYear
    genres
    nextAiringEpisode {
      episode
      airingAt
      timeUntilAiring
    }
    trailer {
      id
      site
      thumbnail
    }
    externalLinks {
      site
      url
      type
      language
    }
    streamingEpisodes {
      title
      thumbnail
      url
      site
    }
  }
`;

const HOME_QUERY = `
  ${MEDIA_FIELDS}
  query HomeAnime($season: MediaSeason, $seasonYear: Int) {
    trending: Page(page: 1, perPage: 18) {
      media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
        ...MediaFields
      }
    }
    airing: Page(page: 1, perPage: 18) {
      media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC, isAdult: false) {
        ...MediaFields
      }
    }
    seasonal: Page(page: 1, perPage: 18) {
      media(type: ANIME, season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, isAdult: false) {
        ...MediaFields
      }
    }
    upcoming: Page(page: 1, perPage: 18) {
      media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC, isAdult: false) {
        ...MediaFields
      }
    }
  }
`;

const DETAIL_QUERY = `
  ${MEDIA_FIELDS}
  query AnimeDetail($id: Int!) {
    Media(id: $id, type: ANIME, isAdult: false) {
      ...MediaFields
      characters(page: 1, perPage: 12, sort: [ROLE]) {
        edges {
          role
          node {
            id
            name {
              full
              native
              alternative
            }
            image {
              large
              medium
            }
            description(asHtml: false)
          }
          voiceActors(language: JAPANESE, sort: [RELEVANCE]) {
            id
            name {
              full
              native
            }
            image {
              medium
            }
          }
        }
      }
    }
  }
`;

const SEARCH_QUERY = `
  ${MEDIA_FIELDS}
  query SearchAnime($search: String!) {
    Page(page: 1, perPage: 18) {
      media(type: ANIME, search: $search, sort: SEARCH_MATCH, isAdult: false) {
        ...MediaFields
      }
    }
  }
`;

const STREAMING_KEYWORDS = [
  "crunchyroll",
  "netflix",
  "hidive",
  "hulu",
  "disney",
  "amazon",
  "prime video",
  "bilibili",
  "youtube",
  "iqiyi",
  "muse",
  "ani-one",
  "abema",
  "u-next",
  "niconico",
  "d anime",
  "dアニメ",
  "tver",
  "bandai",
  "tencent",
  "youku",
];

const OFFICIAL_SEARCH_PROVIDERS = [
  {
    site: "Crunchyroll",
    url: (query: string) => `https://www.crunchyroll.com/search?q=${query}`,
  },
  {
    site: "Netflix",
    url: (query: string) => `https://www.netflix.com/search?q=${query}`,
  },
  {
    site: "HIDIVE",
    url: (query: string) => `https://www.hidive.com/search?q=${query}`,
  },
  {
    site: "Disney+",
    url: (query: string) => `https://www.disneyplus.com/search?q=${query}`,
  },
  {
    site: "Hulu",
    url: (query: string) => `https://www.hulu.com/search?q=${query}`,
  },
  {
    site: "Prime Video",
    url: (query: string) =>
      `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${query}`,
  },
  {
    site: "Apple TV",
    url: (query: string) => `https://tv.apple.com/search?term=${query}`,
  },
  {
    site: "Bilibili",
    url: (query: string) => `https://www.bilibili.tv/search-result?q=${query}`,
  },
  {
    site: "哔哩哔哩",
    url: (query: string) =>
      `https://search.bilibili.com/all?keyword=${query}`,
  },
  {
    site: "爱奇艺",
    url: (query: string) =>
      `https://so.iqiyi.com/so/q_${query}`,
  },
  {
    site: "腾讯视频",
    url: (query: string) =>
      `https://v.qq.com/x/search/?q=${query}`,
  },
  {
    site: "优酷",
    url: (query: string) =>
      `https://so.youku.com/search_video/q_${query}`,
  },
  {
    site: "ABEMA",
    url: (query: string) =>
      `https://abema.tv/search?q=${query}`,
  },
  {
    site: "dアニメストア",
    url: (query: string) =>
      `https://animestore.docomo.ne.jp/animestore/sch_pc?searchKey=${query}`,
  },
  {
    site: "U-NEXT",
    url: (query: string) =>
      `https://video.unext.jp/search?query=${query}`,
  },
  {
    site: "Niconico",
    url: (query: string) =>
      `https://www.nicovideo.jp/search/${query}`,
  },
  {
    site: "TVer",
    url: (query: string) => `https://tver.jp/search/${query}`,
  },
  {
    site: "Bandai Channel",
    url: (query: string) =>
      `https://www.b-ch.com/search/?q=${query}`,
  },
  {
    site: "YouTube 官方",
    url: (query: string) =>
      `https://www.youtube.com/results?search_query=${query}%20anime%20official`,
  },
  {
    site: "YouTube Muse Asia",
    url: (query: string) =>
      `https://www.youtube.com/results?search_query=${query}%20Muse%20Asia%20official`,
  },
  {
    site: "YouTube Ani-One",
    url: (query: string) =>
      `https://www.youtube.com/results?search_query=${query}%20Ani-One%20Asia%20official`,
  },
  {
    site: "YouTube 木棉花",
    url: (query: string) =>
      `https://www.youtube.com/results?search_query=${query}%20木棉花%20官方`,
  },
];

export async function getHomeAnime(): Promise<HomeAnime> {
  const currentSeason = getCurrentAnimeSeason();
  const data = await anilistRequest<HomeQueryData>(HOME_QUERY, {
    season: currentSeason.season,
    seasonYear: currentSeason.year,
  });

  const [trending, airing, seasonal, upcoming] = await Promise.all([
    enrichAnimeList(data.trending.media.map(mapMedia), { jikan: false }),
    enrichAnimeList(data.airing.media.map(mapMedia), { jikan: false }),
    enrichAnimeList(data.seasonal.media.map(mapMedia), { jikan: false }),
    enrichAnimeList(data.upcoming.media.map(mapMedia), { jikan: false }),
  ]);
  const hero = trending[0] ?? airing[0] ?? seasonal[0] ?? upcoming[0];

  if (!hero) {
    throw new Error("No anime data returned from AniList");
  }

  return {
    hero,
    trending,
    airing,
    seasonal,
    upcoming,
  };
}

export async function getAnimeById(id: number): Promise<AnimeCard | null> {
  const data = await anilistRequest<DetailQueryData>(DETAIL_QUERY, { id });

  return data.Media ? enrichAnime(mapMedia(data.Media), { jikan: true }) : null;
}

export async function searchAnime(search: string): Promise<AnimeCard[]> {
  const data = await anilistRequest<{ Page: { media: RawMedia[] } }>(
    SEARCH_QUERY,
    { search },
  );

  return enrichAnimeList(data.Page.media.map(mapMedia), { jikan: false });
}

async function anilistRequest<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(ANILIST_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) {
    throw new Error(`AniList request failed: ${response.status}`);
  }

  const payload = (await response.json()) as AnilistResponse<T>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("AniList returned no data");
  }

  return payload.data;
}

function mapMedia(media: RawMedia): AnimeCard {
  const title = pickTitle(media.title);
  const sourceLinks = buildSourceLinks(media, title);
  const streamingEpisodes = normalizeStreamingEpisodes(media.streamingEpisodes);
  const characters = normalizeCharacters(media.characters?.edges);

  return {
    id: media.id,
    idMal: media.idMal,
    title,
    characters,
    moegirlCharacters: [],
    titleEn: media.title.english ?? undefined,
    titleJa: media.title.native ?? media.title.romaji ?? undefined,
    romajiTitle: media.title.romaji ?? title,
    nativeTitle: media.title.native ?? undefined,
    description: cleanText(media.description ?? ""),
    coverImage:
      media.coverImage?.extraLarge ??
      media.coverImage?.large ??
      "/window.svg",
    bannerImage: media.bannerImage,
    accentColor: media.coverImage?.color,
    format: media.format,
    status: media.status,
    episodes: media.episodes,
    duration: media.duration,
    averageScore: media.averageScore,
    popularity: media.popularity,
    season: media.season,
    seasonYear: media.seasonYear,
    genres: media.genres ?? [],
    nextAiringEpisode: media.nextAiringEpisode,
    sourceLinks,
    streamingEpisodes,
  };
}

async function enrichAnimeList(
  cards: AnimeCard[],
  options: { jikan: boolean },
): Promise<AnimeCard[]> {
  const enriched: AnimeCard[] = [];
  const concurrency = 6;

  for (let index = 0; index < cards.length; index += concurrency) {
    const chunk = cards.slice(index, index + concurrency);
    const results = await Promise.allSettled(
      chunk.map((card) => enrichAnime(card, options)),
    );

    for (let resultIndex = 0; resultIndex < results.length; resultIndex += 1) {
      const result = results[resultIndex];
      enriched.push(
        result.status === "fulfilled" ? result.value : chunk[resultIndex],
      );
    }
  }

  return enriched;
}

async function enrichAnime(
  card: AnimeCard,
  options: { jikan: boolean },
): Promise<AnimeCard> {
  const [bangumi, jikanSources, moegirlSubject] = await Promise.all([
    getBangumiMatch(card),
    options.jikan ? getJikanStreamingLinks(card.idMal) : Promise.resolve([]),
    options.jikan ? getMoegirlSubject(card) : Promise.resolve(null),
  ]);

  const titleZh = bangumi?.name_cn?.trim() || undefined;
  const titleJa = bangumi?.name?.trim() || card.titleJa;
  const descriptionZh = cleanBangumiSummary(bangumi?.summary);
  const moegirlByChineseTitle = titleZh
    ? await searchMoegirl(titleZh).then((pages) => pages[0] ?? null)
    : null;
  const subjectForMoegirl = moegirlByChineseTitle ?? moegirlSubject;
  const moegirlCharacters = subjectForMoegirl
    ? await getMoegirlCharacterPages(subjectForMoegirl, titleZh ?? card.title)
    : [];
  const sourceLinks = mergeSourceLinks([
    ...card.sourceLinks,
    ...jikanSources,
    ...(subjectForMoegirl
      ? [
          {
            site: "萌娘百科",
            url: subjectForMoegirl.url,
            type: "database" as const,
          },
        ]
      : []),
    ...(bangumi
      ? [
          {
            site: "Bangumi",
            url: `https://bgm.tv/subject/${bangumi.id}`,
            type: "database" as const,
          },
        ]
      : []),
  ]);

  return {
    ...card,
    bangumiId: bangumi?.id,
    moegirlSubject: subjectForMoegirl ?? undefined,
    moegirlCharacters,
    title: titleZh ?? card.title,
    titleZh,
    titleJa,
    descriptionZh,
    description: descriptionZh ?? card.description,
    sourceLinks,
  };
}

async function getMoegirlSubject(card: AnimeCard): Promise<MoegirlPage | null> {
  const queries = [
    card.titleZh,
    card.titleJa,
    card.titleEn,
    card.romajiTitle,
  ].filter(Boolean) as string[];

  for (const query of queries) {
    const pages = await searchMoegirl(query);
    const page = pages.find((candidate) =>
      normalizeKey(candidate.title).includes(normalizeKey(query)),
    );

    if (page ?? pages[0]) {
      return page ?? pages[0];
    }
  }

  return null;
}

async function searchMoegirl(query: string): Promise<MoegirlPage[]> {
  try {
    const params = new URLSearchParams({
      action: "opensearch",
      format: "json",
      search: query,
      namespace: "0",
      limit: "5",
    });
    const response = await fetch(`${MOEGIRL_API_ENDPOINT}?${params}`, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "danzai233/anideck/0.1 (https://vercel-appletv.vercel.app)",
      },
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as [
      string,
      string[],
      string[],
      string[],
    ];
    const titles = payload[1] ?? [];
    const urls = payload[3] ?? [];

    return titles
      .map((title, index) => ({
        title,
        url: urls[index],
      }))
      .filter((page) => page.title && page.url?.startsWith("http"));
  } catch {
    return [];
  }
}

async function getMoegirlCharacterPages(
  subject: MoegirlPage,
  subjectTitle: string,
): Promise<MoegirlPage[]> {
  try {
    const response = await fetch(subject.url, {
      headers: {
        Accept: "text/html",
        "User-Agent":
          "danzai233/anideck/0.1 (https://vercel-appletv.vercel.app)",
      },
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const pages = extractMoegirlLinks(html);
    const aliases = new Set(
      [subject.title, subjectTitle, ...pages.map((page) => page.title)]
        .filter((title) => title && !title.includes("(") && !title.includes("（"))
        .map(normalizeKey),
    );

    return pages
      .filter((page) => {
        const normalized = normalizeKey(page.title);
        return (
          page.title !== subject.title &&
          !page.title.startsWith("Template:") &&
          !page.title.startsWith("Category:") &&
          !page.title.startsWith("File:") &&
          !page.title.startsWith("萌娘百科:") &&
          [...aliases].some((alias) => normalized.includes(`(${alias})`))
        );
      })
      .slice(0, 16);
  } catch {
    return [];
  }
}

function extractMoegirlLinks(html: string): MoegirlPage[] {
  const links = new Map<string, MoegirlPage>();
  const pattern = /href="(\/[^"#?]+)"\s+title="([^"]+)"/g;
  let match = pattern.exec(html);

  while (match) {
    const [, href, rawTitle] = match;
    const title = decodeHtml(rawTitle).trim();

    if (!links.has(title)) {
      links.set(title, {
        title,
        url: `${MOEGIRL_BASE_URL}${href}`,
      });
    }

    match = pattern.exec(html);
  }

  return [...links.values()];
}

function normalizeCharacters(edges?: RawCharacterEdge[] | null): AnimeCharacter[] {
  const characters: AnimeCharacter[] = [];

  for (const edge of edges ?? []) {
    const node = edge.node;
    const name = node?.name?.full ?? node?.name?.native;

    if (!node || !name) {
      continue;
    }

    const voiceActor = edge.voiceActors?.[0];
    const description = cleanSpoilers(cleanText(node.description ?? ""));
    const moegirlSearchQuery = pickMoegirlCharacterQuery({
      alternativeNames: node.name?.alternative ?? [],
      name,
      nativeName: node.name?.native ?? undefined,
    });

    characters.push({
      id: node.id,
      name,
      nativeName: node.name?.native ?? undefined,
      alternativeNames: node.name?.alternative ?? [],
      image: node.image?.large ?? node.image?.medium,
      role: edge.role,
      description: description || undefined,
      voiceActor: voiceActor?.name?.full
        ? {
            name: voiceActor.name.full,
            nativeName: voiceActor.name.native ?? undefined,
            image: voiceActor.image?.medium,
          }
        : undefined,
      anilistUrl: `https://anilist.co/character/${node.id}`,
      moegirlSearchQuery,
      moegirlSearchUrl: buildMoegirlSearchUrl(moegirlSearchQuery),
    });
  }

  return characters;
}

function pickMoegirlCharacterQuery(character: {
  alternativeNames: string[];
  name: string;
  nativeName?: string;
}): string {
  const chineseAlias = character.alternativeNames.find(hasChineseText);

  return (
    chineseAlias ??
    (character.nativeName && character.nativeName !== character.name
      ? character.nativeName
      : character.name)
  );
}

function hasChineseText(value: string): boolean {
  return /[\u3400-\u9fff]/.test(value);
}

function buildMoegirlSearchUrl(query: string): string {
  const params = new URLSearchParams({
    search: query,
    title: "Special:搜索",
    profile: "default",
    fulltext: "1",
  });

  return `${MOEGIRL_BASE_URL}/index.php?${params}`;
}

function cleanBangumiSummary(summary?: string): string | undefined {
  const cleaned = summary
    ?.split("[简介原文]")[0]
    ?.replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return cleaned || undefined;
}

type BangumiSubject = {
  id: number;
  name?: string;
  name_cn?: string;
  summary?: string;
};

type JikanStreamingLink = {
  name?: string;
  url?: string;
};

async function getBangumiMatch(card: AnimeCard): Promise<BangumiSubject | null> {
  const keyword = card.titleJa ?? card.titleEn ?? card.romajiTitle ?? card.title;

  try {
    const response = await fetch(BANGUMI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent":
          "danzai233/anideck/0.1 (https://vercel-appletv.vercel.app)",
      },
      body: JSON.stringify({
        keyword,
        filter: {
          type: [2],
        },
      }),
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { data?: BangumiSubject[] };
    return payload.data?.[0] ?? null;
  } catch {
    return null;
  }
}

async function getJikanStreamingLinks(
  idMal?: number | null,
): Promise<SourceLink[]> {
  if (!idMal) {
    return [];
  }

  try {
    const response = await fetch(`${JIKAN_ENDPOINT}/anime/${idMal}/streaming`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as { data?: JikanStreamingLink[] };

    return (payload.data ?? [])
      .filter((link) => link.name && link.url?.startsWith("http"))
      .map((link) => ({
        site: link.name!,
        url: link.url!,
        type: "streaming" as const,
        label: "Jikan/MAL",
      }));
  } catch {
    return [];
  }
}

function buildSourceLinks(media: RawMedia, title: string): SourceLink[] {
  const links = new Map<string, SourceLink>();

  for (const link of media.externalLinks ?? []) {
    if (!link.url || !link.site) {
      continue;
    }

    const lowerSite = link.site.toLowerCase();
    const isStreaming =
      link.type === "STREAMING" ||
      STREAMING_KEYWORDS.some((keyword) => lowerSite.includes(keyword));
    const type = isStreaming ? "streaming" : "database";

    links.set(link.url, {
      site: link.site,
      url: link.url,
      type,
      label: link.language ?? undefined,
    });
  }

  if (media.trailer?.site === "youtube" && media.trailer.id) {
    const trailerUrl = `https://www.youtube.com/watch?v=${media.trailer.id}`;
    links.set(trailerUrl, {
      site: "YouTube 预告",
      url: trailerUrl,
      type: "trailer",
    });
  }

  const encodedTitle = encodeURIComponent(title);
  for (const provider of OFFICIAL_SEARCH_PROVIDERS) {
    const url = provider.url(encodedTitle);
    if (!links.has(url)) {
      links.set(url, {
        site: provider.site,
        url,
        type: "search",
      });
    }
  }

  return mergeSourceLinks([...links.values()]);
}

function mergeSourceLinks(links: SourceLink[]): SourceLink[] {
  const merged = new Map<string, SourceLink>();

  for (const link of links) {
    if (!link.url || merged.has(link.url)) {
      continue;
    }

    merged.set(link.url, link);
  }

  return [...merged.values()];
}

function normalizeStreamingEpisodes(
  episodes?: RawStreamingEpisode[] | null,
): StreamingEpisode[] {
  return (episodes ?? [])
    .filter((episode) => episode.url?.startsWith("http"))
    .map((episode, index) => ({
      title: episode.title?.trim() || `Episode ${index + 1}`,
      thumbnail: episode.thumbnail,
      url: episode.url!,
      site: episode.site?.trim() || "Official",
    }));
}

function pickTitle(title: AnimeTitle): string {
  return title.english ?? title.romaji ?? title.native ?? "Untitled";
}

function cleanText(value: string): string {
  return decodeHtml(
    value
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim(),
  );
}

function cleanSpoilers(value: string): string {
  return value
    .replace(/~![\s\S]*?!~/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/（/g, "(")
    .replace(/）/g, ")");
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_, code) =>
      String.fromCharCode(Number.parseInt(code, 16)),
    )
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function getCurrentAnimeSeason(): { season: string; year: number } {
  const now = new Date();
  const month = now.getUTCMonth() + 1;
  const year = now.getUTCFullYear();

  if (month >= 3 && month <= 5) {
    return { season: "SPRING", year };
  }

  if (month >= 6 && month <= 8) {
    return { season: "SUMMER", year };
  }

  if (month >= 9 && month <= 11) {
    return { season: "FALL", year };
  }

  return { season: "WINTER", year };
}
