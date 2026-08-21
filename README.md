# 苏州一日漫游

无构建步骤的静态网页。直接打开 `index.html`，或导入 Vercel 即可部署。

## 部署到 Vercel

1. 将本目录推送到新建的 GitHub 仓库。
2. 在 Vercel 选择 **Add New → Project** 并导入该仓库。
3. Framework Preset 选 **Other**，不填写 Build Command 或 Output Directory。
4. 首次推送会产生 Preview；合并到生产分支后发布到 Vercel 分配的 `*.vercel.app` 地址。

网页依赖网络加载 Leaflet、Cytoscape、OpenStreetMap 底图和外部核验链接；不包含密钥或后端服务。
