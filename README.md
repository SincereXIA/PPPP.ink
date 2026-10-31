---
lastmod: '2021-12-10T02:30:30.529Z'
---
# PPPP.ink 粉墨

## PPPP.ink is a Personal Private Playground

SincereXIA 的个人博客

Powered by: [Astro](https://astro.build/)
Theme: [Retypeset](https://github.com/radishzzz/astro-theme-retypeset)

## 仓库分工

本仓库只维护正文、图片、附件和内容编辑配置。Astro、Retypeset 主题、组件、依赖和部署流水线已迁往 [PPPP.ink-site](https://github.com/SincereXIA/PPPP.ink-site)。不再引用 `Private.PPPP.ink`。

```text
content/README.md      历史首页配置（保留）
content/about.md       关于页正文
content/blogs/         博文和日记（包括文章附件）
content/docs/          专题文档与学习笔记
content/public/images/ 文章图片
image-sources.json     图片来源、引用和 SHA-256 校验值
.templates/            写作模板
.github/workflows/     内容更新后通知网站仓库重新构建
```

## 写作与图片

直接编辑 `content/` 下的 Markdown。文章图片保存在 `content/public/images/`，正文继续使用 `/images/文件名` 引用，现有文章链接无需修改。其他附件可以继续放在文章附近的 `attachments/` 目录。

首页缩略图默认使用正文第一张本地图片；可在 frontmatter 设置 `cover: /images/文件名` 指定封面，或设置 `cover: false` 关闭。正文与附件路径保持原有写法。

`publish: false`、`draft: true` 或带有非空 `keys` 的文章不会被发布或收录到搜索、RSS、站点地图。旧文章的原始 `.html` 链接由框架仓库映射保留；不要为了迁移修改正文文件名。

原始图床地址、恢复时的来源和 SHA-256 校验值记录在根目录的 `image-sources.json`。

## 预览和发布

本仓库不需要安装 Node.js 依赖。需要预览或校验图片时，在框架仓库中运行：

```bash
CONTENT_DIR=/绝对路径/PPPP.ink npm run dev
CONTENT_DIR=/绝对路径/PPPP.ink npm run check:images
CONTENT_DIR=/绝对路径/PPPP.ink npm run build
CONTENT_DIR=/绝对路径/PPPP.ink npm run check:images -- --dist
```

向本仓库 `main` 推送更新后，`notify-site.yml` 会通知框架仓库重新构建。框架仓库的 `main` 更新也会重新构建网站。流水线在开始时读取两个仓库最新的 `main`，并记录实际构建的两个提交 SHA。

首次启用时，在本仓库 Actions secrets 中设置 `SITE_WORKFLOW_TOKEN`：使用限定 `PPPP.ink-site` 仓库且拥有 **Actions: Read and write** 权限的 fine-grained PAT。部署密钥只放在框架仓库。完整配置见框架仓库 README。
