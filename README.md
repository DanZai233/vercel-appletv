# AniDeck

Apple TV 风格的二次元资讯与番剧来源聚合站，适合部署到 Vercel。

## 功能

- 首页海报墙：热门趋势、正在更新、本季新番、即将开播
- 中日英三语：`?lang=zh`、`?lang=ja`、`?lang=en` 切换界面与主标题
- 番剧详情页：海报、横幅、三语标题、简介、评分、集数、放送时间、标签
- 角色信息：从 AniList 拉角色头像、角色名、日语声优和简介，并提供 AniList 角色详情入口
- 萌娘百科：用 MediaWiki `opensearch` 自动匹配作品页，并从作品页内链提取萌百收录的角色条目
- 中文名/中文简介：从 Bangumi 公开 API 补充 `name_cn` 与中文摘要
- 来源聚合：优先展示 AniList 与 Jikan/MAL 返回的官方 streaming/external links，并提供更多官方平台搜索入口
- 剧集入口：如果公开数据源提供逐集 streaming episode 链接，会在详情页展示并跳转到原站播放
- 资讯聚合：默认抓取 Anime News Network 与 MyAnimeList RSS
- 搜索：`/?q=番名`
- JSON API：`/api/anime`、`/api/anime?q=...`、`/api/anime/[id]`、`/api/news`
- Vercel Cron：`/api/refresh` 每日预热缓存

## 合法边界

项目只聚合公开元数据、RSS 资讯、官方/授权平台入口和官方搜索页。不抓取盗版资源站、不绕过登录/地区/DRM、不转存或嵌入未经授权的视频流。

“播放源”在这里指官方平台播放页或官方平台搜索页，例如 Crunchyroll、Netflix、HIDIVE、Disney+、Hulu、Prime Video、Apple TV、Bilibili、爱奇艺、腾讯视频、优酷、ABEMA、dアニメストア、U-NEXT、Niconico、TVer、Bandai Channel、YouTube 官方、Muse Asia、Ani-One Asia、木棉花等。不同数据源不一定提供逐集链接；拿不到时会显示平台入口，而不是伪造可播放地址。

萌娘百科内容只做标题、入口链接和轻量索引，不搬运长正文。角色卡的基础资料来自 AniList；萌百模块显示该作品页中可识别的萌百角色条目。角色卡上的萌百搜索会优先使用中文别名，没有中文名时才退回日文名或英文名，避免把番名拼进搜索词导致无结果。

## 本地开发

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 环境变量

```bash
# Vercel Cron 调用 /api/refresh 时校验
CRON_SECRET=replace-with-a-long-random-secret

# 可选：覆盖默认 RSS，格式是 name|url，多条用英文逗号分隔
NEWS_FEEDS=Anime News Network|https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us,MyAnimeList|https://myanimelist.net/rss/news.xml
```

## Vercel 部署

```bash
vercel deploy -y
```

如果要让 `vercel.json` 里的 Cron 在生产环境执行，请在 Vercel 项目里设置 `CRON_SECRET`。当前 Cron 是每日一次，Hobby 计划可用；Pro 计划可以按需要改成小时级。
