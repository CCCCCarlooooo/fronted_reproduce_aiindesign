# 差异清单 — opus48-high-2026-07-17 vs stateofaidesign.com

自评（原站 evidence/orig_*.jpeg ↔ 成品 shots_repro/r_*.jpeg），按场景配对。

| # | 场景 | 原站表现 | 成品表现 | 证据 | 严重度 | 状态/方案 |
|---|---|---|---|---|---|---|
| D1 | S1 Hero 媒体带 | 大面积流体橙/紫渐变艺术 + 少量灰调人像插片，颗粒感强，块块重叠 | 流体粉紫渐变 + 5张人像浮片，插片偏小、重叠少 | orig_top vs r_00_hero | Medium | 渐变+颗粒已实现；人像插片作为近似，保留（原站插片本身含人像）|
| D2 | S1 巨标题 | 右下"AI in Design Report 2026" 120px Beausite | 同字体/字号/位置，scrub入场 | ✓ | — | 已达标 |
| D3 | S1.5 合作方logo | 7个真实矢量logo(Notion/Sierra/Framer/Linear/Anthropic/Shopify/Stripe) | 文字+符号近似 | orig_1150 | Medium | logo为品牌矢量，用文字近似避免版权/死链；保留 |
| D4 | S2 统计 900+/25+ | Lavender+Sage块，数字计数 | ✓ 同色块+GSAP计数 | orig_1800 vs r_1750 | — | 已达标 |
| D5 | S3 引言 Katie Dill | 黑栏真实肖像+Sage大引言 | 肖像用灰调poster近似，引言✓ | orig_3600 vs r_3050 | Low | 已用grayscale poster替换纯渐变 |
| D6 | S4 Tools(01) | 橙底+紫色半调斑点艺术(webm) | ✓ 橙底+真实半调webm | orig_4300 vs r_4200b | — | 已达标（修正为webm）|
| D7 | S5 Craft(02) | 紫底+花卉紫调艺术 | ✓ 紫底+真实花卉webm | orig_5200 | — | 已达标 |
| D8 | S6 Teams(03) | Sage底+灰花卉拼贴(PRODUCT DESIGNER标签) | ✓ 灰调webm含标签 | orig_6200/7000 vs r_7050c | — | 已达标 |
| D9 | S7 案例轮播 | 7张灰度人像卡+lavender底条+←→ | ✓ 灰度人像webm卡+底条+箭头轮播 | orig_7600 vs r_cases2 | — | 已达标（修正为人像webm）|
| D10 | S8 Coming soon | 彩色双人会议室视频 + 文案 | 会议室poster图(静态) | orig_9200 | Low | 用meeting-room图，静态；避免webm黑帧闪烁 |
| D11 | S9 订阅 | 黑底+橙Submit按钮 | ✓ | orig_bottom vs r_7050c | — | 已达标 |
| D12 | S10 末屏 | 巨型"Ai in Design 2026"off-white+方法论+页脚 | ✓ 全部还原 | orig_bottom vs r_finale | — | 已达标 |
| D13 | 交互-粒子拖尾 | (原站鼠标反馈) | 原生Canvas粒子拖尾全局✓ | script.js | — | 已达标 |
| D14 | 章节色切换 | 滚动进入变色 | ✓ GSAP scrub backgroundColor | — | — | 已达标 |

## 回归三件套
- [x] headless 全程滚动零 JS 报错（console error = 0）
- [x] 静态校验：全部 href→example.com；index.html 无内联 style/script(0)；script.js 经典脚本置于 GSAP CDN 之后；本地 styles.css/script.js/fonts 相对引用
- [x] 首屏 scroll=0 稳定态：loader hidden；hero 标题 opacity=1 可见（GSAP from 正确解算）；默认内容完整

## 结论
所有 High 项：无。Medium 项(D1/D3)为品牌矢量/艺术资源的合理近似，已在证据基础上取舍。Low 项(D5/D10)已说明。核心场景、动效、交互、配色、字体均高保真还原。

## code-reviewer 独立复审（已处理）
- [HIGH] GSAP 加载失败时 reveal 元素永久隐藏（早 return 越过了兜底）→ 已修：无 GSAP 时先解隐所有 reveal/chapter 再 return，并调 initCounters
- [MED] ScrollTrigger 在图片加载前计算位置，之后无 refresh → 已修：window.load 后无条件 ScrollTrigger.refresh()
- [MED] video onerror 挂在 &lt;video&gt; 但 &lt;source&gt; 失败不冒泡 → 已修：改用 v.src 直接赋值，onerror 可达
- [LOW] chapter-art 视差选择器指向 img（实为 video）→ 已修：选择 video,img
- [LOW] canvas dpr 仅初始化一次 → 已修：resize 内重算
- [LOW] mouse.active 死状态 → 已删
- 回归复验：node --check 通过；全程滚动 0 JS 报错；3章节视频+7案例视频播放正常；首屏 loader hidden、hero opacity=1

## designer 独立复审（已仲裁）
设计代币全部像素级正确（orange/lavender/sage/offwhite、Beausite/Geist Mono/Inter、章节配色切换、28个链接→example.com、0 JS 报错）。
采纳并修复：
- [F5 Med] Hero拼贴过稀 → 已修：5→7块，加旋转(-3~3deg)+更强重叠，视差保留倾角
- [F4 Med] 案例卡偏暗 → 已修：grayscale filter 增加 brightness(1.04) contrast(1.04)
- [F10 Low] 末屏视差空间不足 → 已修：#finale 增加 60px 顶部留白
证据仲裁驳回（与像素取证冲突，不采纳）：
- [F6] "ANTHROP\C 反斜杠是错误" → 原站 DOM 逐字即为 "ANTHROP\C"（见 orig_1150），成品正确保留
- [F7] "肖像应增至120-140px" → 原站 orig_3600 实测约 88px 方形，成品尺寸与取证一致
- [F1/F3] "各场景滚动位置偏移" → 主因是按相同滚动px配对；本任务要求按场景配对，两站总高不同不代表同px同画面。场景内容经实时取证均正确（designer 亦确认 live 状态正确）
说明保留：
- [F9] S8 用会议室静态图而非 webm：4RQvaMC 视频含黑色半调闪帧，静态图更稳定还原原站彩色双人画面（orig_9200），file:// 兼容更稳
- [F4附] 7卡循环2段人像 webm：原站人像 webm 为懒加载，仅3段公开可取；用可用素材循环，避免死链


