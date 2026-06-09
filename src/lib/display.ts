export function formatStatus(status?: string | null): string {
  const labels: Record<string, string> = {
    RELEASING: "更新中",
    FINISHED: "已完结",
    NOT_YET_RELEASED: "未开播",
    CANCELLED: "已取消",
    HIATUS: "暂停",
  };

  return status ? (labels[status] ?? status) : "未知";
}

export function formatFormat(format?: string | null): string {
  const labels: Record<string, string> = {
    TV: "TV",
    TV_SHORT: "短篇",
    MOVIE: "剧场版",
    SPECIAL: "特别篇",
    OVA: "OVA",
    ONA: "ONA",
    MUSIC: "音乐",
  };

  return format ? (labels[format] ?? format) : "动画";
}

export function formatSeason(season?: string | null, year?: number | null) {
  const labels: Record<string, string> = {
    WINTER: "冬",
    SPRING: "春",
    SUMMER: "夏",
    FALL: "秋",
  };

  if (!season && !year) {
    return "档期未知";
  }

  return `${year ?? ""}${season ? labels[season] ?? season : ""}`.trim();
}

export function formatAiringTime(timestamp?: number): string {
  if (!timestamp) {
    return "";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp * 1000));
}

export function formatNewsDate(value?: string): string {
  if (!value) {
    return "刚刚";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}
