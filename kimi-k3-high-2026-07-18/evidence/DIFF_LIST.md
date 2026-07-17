# 差异清单 — 原站 vs 成品（按场景配对）

截图： 原站 evidence/original/s00–s12，成品 evidence/repro/r00–r13
配对方式： 按场景锚点（hero 0 / partners ~900 / stats ~1600 / about ~3000 / quote ~4000 / chapters ~4400+ / cases ~7100 / coming ~8400 / subscribe ~9500 / footer ~10400）

| # | 场景 | 原站表现 | 成品表现 | 严重度 | 状态 |
|---|------|---------|---------|--------|------|
| 1 | 首屏 | 视频拼贴被 1425×480 容器裁剪，视频内偏移 -210px | 初版视频全高 100vh → 已修：33.33vw 裁剪 + translateY(-23.33%)，r00 验证 | High | ✅ 已修复 |
| 2 | 页脚 | "2026" 位于链接行右侧，与字标分离 | 初版 2026 与字标重叠 → 已重构为 foot-mid 行，r12 验证 | High | ✅ 已修复 |
| 3 | 订阅区 | 黑底暗纹几乎不可见 | 初版 opacity .55 过亮 → 改 .22 | Medium | ✅ 已修复 |
| 4 | 导航 | 橙色按钮宽约 425px | 初版 260px → 改 425px | Medium | ✅ 已修复 |
| 5 | 全局 | Beausite Classic（商业字体，无公开 URL） | Inter 替代，字重/字距已对齐（-0.06em 大标题） | Low | ⚠️ 不可消除（字体无公开源） |
| 6 | 场景2 | 7 个品牌 SVG logo | 文字近似（Notion/SIERRA/Framer/Linear/ANTHROP\C/shopify/stripe） | Low | ⚠️ 字体 logo 无法逐字标复刻 |
| 7 | 首屏 | intro 视频（11fQjZ，播一次）+ loop 视频双视频序列 | 仅 loop 视频 | Low | ⚠️ 单循环已覆盖视觉主体 |
| 8 | 场景9 | 卡片 "Get notified" 上边框长度不一（225~460px） | 统一 240px | Low | ⚠️ 原站本身不一致 |
| 9 | 首屏 | 标题 Beausite 120px 宽 806px | Inter 120px 略窄 | Low | 同 #5 |

## 验证记录
- r00 首屏： 拼贴 480px 裁剪、tagline、标题、底行全部对齐 ✓
- r01 partners / r02 stats / r03 about / r04 quote： 与原站 s01/s02/s03/s04 一致 ✓
- r05–r07 章节 sticky 堆叠： 橙/紫/绿三章 + 对应视频 + 列表 + 黑色 CTA ✓
- r08/r09 卡片轮播： 黑白照片 + Coming soon + 紫条 + Get notified；箭头 476px 步进验证 ✓
- r10 coming / r11 subscribe / r12 footer ✓
- r13 导航下拉： Read the Report + 展开章节列表，+ 旋转变 × ✓
- 媒体： 15/15 浏览器内加载成功（curl 200/206 + 页面实测 OK），零失败请求 ✓
- 导航滚动隐藏/回滚显示实测 ✓；计数动画 900+/25+/906/50+ 实测 ✓
