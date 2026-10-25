---
lastmod: '2021-12-10T02:30:30.529Z'
---
# PPPP.ink 粉墨

## PPPP.ink is a Personal Private Playground

SincereXIA 的个人博客

Powered by: [VuePress](https://vuepress.vuejs.org/)
Theme: [vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)

## 图片维护

文章图片保存在 `content/.vuepress/public/images/`，通过 `/images/文件名` 引用，随博客一起部署。
原始图床地址、恢复时的来源和 SHA-256 校验值记录在 `script/image-sources.json`。

执行 `npm run check:images` 检查图片和引用；构建后执行 `npm run check:images -- --dist`，同时检查发布目录中的图片。
