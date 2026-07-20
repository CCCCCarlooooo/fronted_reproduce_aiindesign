# 交付报告 — Machine Craft Report 2026（fable5-high-2026-07-18）

## 合规基线（应作者要求执行的方案）
本作品是对 stateofaidesign.com 首页的**技术复刻**：完整还原其场景结构、滚动叙事节拍、
布局比例、配色方向、动效与交互模式；**全部文案为原创虚构内容**（虚构报告
"Machine Craft Report 2026"、虚构机构 Fieldnote Labs / North Loop Ventures、7 个虚构
品牌），**未热链或复制原站任何受版权媒体/文字**。媒体来自 picsum 自由图库与原生
Canvas 生成的艺术图；字体以 Inter / IBM Plex Mono 替代原站商用字体。

## 成品文件
- `fable5-high-2026-07-18/index.html` — 结构；CDN（Tailwind / GSAP 3.12.5 / ScrollTrigger）+ 相对路径引入本地两文件；script.js 为经典脚本，位于 CDN 之后、`</body>` 前
- `fable5-high-2026-07-18/styles.css` — 全部自定义样式（preloader、Canvas 层、颗粒/暗角、悬停态、场景版式）
- `fable5-high-2026-07-18/script.js` — 全部逻辑：原生 Canvas hero 拼贴（有机剪影 + 漂浮照片卡 + 鼠标扰动/墨点）、全局鼠标墨迹拖尾（原生 Canvas + Vanilla JS）、3 张生成式章节艺术图（DPR 适配）、GSAP 滚动叙事（34 个 ScrollTrigger：入场、视差、计数器、页脚字标 scrub）、轮播、表单、媒体兜底

双击 index.html（file://）即可运行；已实测 file:// 下零 JS 报错。

## 场景与交互（14 场景全部实现）
Hero 动画拼贴（Canvas 替代原站视频，鼠标吸引扰动 + 墨点 + 标签视差）→ 合作伙伴条 →
转折点声明 + 全宽照片（clip+scale scrub 入场）→ 数据拼板（紫/绿色板 + 计数）→ 使命文字块 →
黑绿引言分栏 → 三章节色板（橙/紫/绿，列表悬停、CTA 悬停箭头位移、艺术图视差）→
案例轮播（箭头控制 + 悬停去灰）→ Coming-soon 海报（播放钮悬停）→ 黑色订阅区（表单交互）→
方法论计数条 → 巨型页脚字标 + 2026（scrub 上升）。preloader 2.5s 超时兜底；图片 error
兜底为渐变面板；prefers-reduced-motion 支持。

## 证据材料位置
- 场景证据表：`SCENE_EVIDENCE.md`（14 场景 × 结构/色值/动效/截图路径）
- 原站截图（12 个滚动位置，0~100%）：`screenshots/original/`
- 成品截图（11 个滚动位置 + 修复版 v2/final）：`screenshots/repro/`
- 差异清单（3 轮，含证据仲裁）：`DIFF_LIST.md`

## 回归三件套（终审，全部通过）
1. headless 渲染：JS 错误 0；8/8 图片加载成功（curl + 浏览器双重验证）；favicon 404 已消除
2. 静态校验：全部 `<a>` → https://example.com/；无大段内联 style/script；相对路径与脚本顺序正确
3. 首屏稳定态：scroll=0 完整（`screenshots/repro/00-scroll0-final.jpeg`），loader 不阻塞，GSAP 初始态不藏内容

## 独立复审结果
- **code-reviewer**（18 项）：采纳修复 10 项（监听节流、resize 状态保留、章节图 DPR、
  图片兜底时序、preloader 时序等）；4 项经代码路径仲裁不成立（GSAP 缺失时 from 态
  不会施加，内容保持可见），4 项 Low 如实记录
- **designer**（11 项，评估保真 88-92%）：采纳修复 7 项（nav CTA 排布、章节标题字重、
  CTA 右溢出、partners 间距、favicon、grain 平铺、badge 可读性）；2 项与取证测量矛盾
  未采纳（stats 栅格等价、photo scale 为有意初始态）；另修复复审后发现的章节栅格
  41%+59%+gap 溢出 24px 问题（右列改 1fr，CTA 精确到边）

## 残留 Low 项（如实说明）
- D7 案例卡尺寸 460×300 vs 原站 476×310（<5% 容差）
- D8 字体：Beausite Classic 为商用字体不可自由分发，以 Inter 同类 grotesque 替代
- D9 hero 为 Canvas 生成拼贴而非摄影视频（合规基线的有意替换）
- 总滚动高度 10727 vs 原站 11209（Δ-4.3%，场景节拍逐一对位）
