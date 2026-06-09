import { XMLParser } from "fast-xml-parser";

export type NewsItem = {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedAt?: string;
  summary?: string;
  image?: string;
};

type FeedSource = {
  name: string;
  url: string;
};

const DEFAULT_FEEDS: FeedSource[] = [
  {
    name: "Anime News Network",
    url: "https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us",
  },
  {
    name: "MyAnimeList",
    url: "https://myanimelist.net/rss/news.xml",
  },
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  processEntities: true,
});

export async function getNews(limit = 16): Promise<NewsItem[]> {
  const feeds = getFeedSources();
  const results = await Promise.allSettled(feeds.map(fetchFeed));

  return results
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .sort((left, right) => {
      const leftTime = left.publishedAt ? Date.parse(left.publishedAt) : 0;
      const rightTime = right.publishedAt ? Date.parse(right.publishedAt) : 0;

      return rightTime - leftTime;
    })
    .slice(0, limit);
}

function getFeedSources(): FeedSource[] {
  const customFeeds = process.env.NEWS_FEEDS?.split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, ...urlParts] = entry.split("|");
      const url = urlParts.join("|") || name;

      return {
        name: urlParts.length ? name : new URL(url).hostname,
        url,
      };
    });

  return customFeeds?.length ? customFeeds : DEFAULT_FEEDS;
}

async function fetchFeed(source: FeedSource): Promise<NewsItem[]> {
  const response = await fetch(source.url, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml",
      "User-Agent": "AniStreamBoard/0.1 (+https://vercel.com)",
    },
    next: { revalidate: 60 * 20 },
  });

  if (!response.ok) {
    throw new Error(`${source.name} RSS failed: ${response.status}`);
  }

  const xml = await response.text();
  const data = parser.parse(xml);
  const channel = data.rss?.channel ?? data.feed ?? {};
  const rawItems = toArray(channel.item ?? channel.entry);

  return rawItems
    .map((item, index) => normalizeItem(item, source, index))
    .filter((item): item is NewsItem => Boolean(item));
}

function normalizeItem(
  item: Record<string, unknown>,
  source: FeedSource,
  index: number,
): NewsItem | null {
  const title = getText(item.title);
  const link = getLink(item.link);

  if (!title || !link) {
    return null;
  }

  const publishedAt =
    getText(item.pubDate) || getText(item.published) || getText(item.updated);
  const rawSummary = getText(item.description) || getText(item.summary);
  const summary = cleanSummary(rawSummary) || undefined;
  const image = getImage(item, rawSummary);

  return {
    id: getText(item.guid) || `${source.url}-${index}-${link}`,
    title: decodeHtml(title),
    link,
    source: source.name,
    publishedAt: publishedAt ? new Date(publishedAt).toISOString() : undefined,
    summary,
    image,
  };
}

function getText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }

  if (value && typeof value === "object" && "#text" in value) {
    return String((value as { "#text": unknown })["#text"]).trim();
  }

  return "";
}

function getLink(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return getLink(value[0]);
  }

  if (value && typeof value === "object") {
    const link = value as Record<string, unknown>;
    return getText(link["@_href"]) || getText(link.href);
  }

  return "";
}

function getImage(item: Record<string, unknown>, summary?: string): string {
  const mediaThumbnail = getMediaUrl(item["media:thumbnail"]);
  const mediaContent = getMediaUrl(item["media:content"]);
  const enclosure = getMediaUrl(item.enclosure);
  const summaryImage = summary?.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];

  return mediaThumbnail || mediaContent || enclosure || summaryImage || "";
}

function getMediaUrl(value: unknown): string {
  if (Array.isArray(value)) {
    return getMediaUrl(value[0]);
  }

  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    return getText(objectValue["@_url"]) || getText(objectValue.url);
  }

  return "";
}

function cleanSummary(value: string): string {
  return decodeHtml(
    value
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
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

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}
