import type { AnimeCard } from "./anilist";

export type Locale = "zh" | "ja" | "en";

export const LOCALES: Array<{ code: Locale; label: string }> = [
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
];

export const COPY = {
  zh: {
    searchPlaceholder: "搜索番剧",
    trendingBadge: "热门趋势",
    details: "查看详情",
    openSource: "打开来源",
    sourcePolicy: "来源策略",
    sourcePolicyBody: "官方/授权入口优先",
    nextEpisode: "下一集",
    episodeCount: "集数",
    noAiring: "暂无放送时间",
    unknownEpisodes: "未公开",
    searchResults: (query: string) => `“${query}” 的结果`,
    noSearchResults: "没有找到相关番剧。",
    trending: "热门番剧",
    airing: "正在更新",
    seasonal: "本季新番",
    upcoming: "即将开播",
    news: "二次元资讯",
    back: "返回",
    score: "评分",
    duration: "单集",
    unknown: "未知",
    episodes: "剧集入口",
    noEpisodes: "暂无逐集官方入口；可以从右侧来源打开平台片库或搜索页。",
    officialSources: "官方来源",
    discovery: "搜索与资料",
    characters: "角色信息",
    charactersKicker: "Characters",
    moegirlCatalog: "萌娘百科收录",
    openMoegirl: "打开萌百",
    searchMoegirl: "搜索萌百",
    openAniList: "AniList 详情",
    voiceActor: "声优",
    roleMain: "主角",
    roleSupporting: "配角",
    roleBackground: "背景",
    noCharacters: "暂无角色信息。",
    noMoegirlCharacters: "暂未从作品页匹配到角色条目。",
    openPlayback: "打开播放",
    officialSearch: "官方搜索",
    noSources: "暂无来源。",
    languageTitle: "三语标题",
    titleZh: "中文",
    titleJa: "日本語",
    titleEn: "English",
    pending: "待补充",
  },
  ja: {
    searchPlaceholder: "作品を検索",
    trendingBadge: "人気急上昇",
    details: "詳細を見る",
    openSource: "配信元を開く",
    sourcePolicy: "ソース方針",
    sourcePolicyBody: "公式/正規配信を優先",
    nextEpisode: "次回",
    episodeCount: "話数",
    noAiring: "放送予定なし",
    unknownEpisodes: "未公開",
    searchResults: (query: string) => `「${query}」の検索結果`,
    noSearchResults: "該当する作品が見つかりません。",
    trending: "人気作品",
    airing: "放送中",
    seasonal: "今期アニメ",
    upcoming: "放送予定",
    news: "アニメニュース",
    back: "戻る",
    score: "評価",
    duration: "各話",
    unknown: "不明",
    episodes: "エピソード",
    noEpisodes: "公式の各話リンクは未取得です。右側の配信元または検索ページを開けます。",
    officialSources: "公式ソース",
    discovery: "検索・資料",
    characters: "キャラクター",
    charactersKicker: "Characters",
    moegirlCatalog: "萌娘百科の収録",
    openMoegirl: "萌百を開く",
    searchMoegirl: "萌百で検索",
    openAniList: "AniList 詳細",
    voiceActor: "声優",
    roleMain: "メイン",
    roleSupporting: "サブ",
    roleBackground: "背景",
    noCharacters: "キャラクター情報なし。",
    noMoegirlCharacters: "作品ページからキャラクター項目を検出できませんでした。",
    openPlayback: "再生ページを開く",
    officialSearch: "公式検索",
    noSources: "ソースなし。",
    languageTitle: "三言語タイトル",
    titleZh: "中文",
    titleJa: "日本語",
    titleEn: "English",
    pending: "未補完",
  },
  en: {
    searchPlaceholder: "Search anime",
    trendingBadge: "Trending",
    details: "View Details",
    openSource: "Open Source",
    sourcePolicy: "Source Policy",
    sourcePolicyBody: "Official/licensed links first",
    nextEpisode: "Next",
    episodeCount: "Episodes",
    noAiring: "No airing time",
    unknownEpisodes: "Unannounced",
    searchResults: (query: string) => `Results for “${query}”`,
    noSearchResults: "No matching anime found.",
    trending: "Trending Anime",
    airing: "Now Airing",
    seasonal: "This Season",
    upcoming: "Coming Soon",
    news: "Anime News",
    back: "Back",
    score: "Score",
    duration: "Runtime",
    unknown: "Unknown",
    episodes: "Episode Links",
    noEpisodes: "No official episode links yet; use the source/search links on the right.",
    officialSources: "Official Sources",
    discovery: "Search & Data",
    characters: "Characters",
    charactersKicker: "Characters",
    moegirlCatalog: "Moegirlpedia Entries",
    openMoegirl: "Open Moegirl",
    searchMoegirl: "Search Moegirl",
    openAniList: "AniList Details",
    voiceActor: "Voice",
    roleMain: "Main",
    roleSupporting: "Supporting",
    roleBackground: "Background",
    noCharacters: "No character data.",
    noMoegirlCharacters: "No character pages matched from the work page yet.",
    openPlayback: "Open Playback",
    officialSearch: "Official Search",
    noSources: "No sources.",
    languageTitle: "Trilingual Titles",
    titleZh: "中文",
    titleJa: "日本語",
    titleEn: "English",
    pending: "Pending",
  },
} satisfies Record<Locale, Record<string, string | ((query: string) => string)>>;

export function getLocale(value?: string | null): Locale {
  return value === "ja" || value === "en" ? value : "zh";
}

export function titleForLocale(anime: AnimeCard, locale: Locale): string {
  if (locale === "zh") {
    return anime.titleZh ?? anime.titleEn ?? anime.titleJa ?? anime.title;
  }

  if (locale === "ja") {
    return anime.titleJa ?? anime.romajiTitle ?? anime.title;
  }

  return anime.titleEn ?? anime.romajiTitle ?? anime.title;
}

export function titleRows(anime: AnimeCard) {
  return {
    zh: anime.titleZh,
    ja: anime.titleJa ?? anime.romajiTitle,
    en: anime.titleEn ?? anime.romajiTitle,
  };
}

export function withLocale(path: string, locale: Locale, query?: string): string {
  const params = new URLSearchParams();
  params.set("lang", locale);

  if (query) {
    params.set("q", query);
  }

  return `${path}?${params.toString()}`;
}
