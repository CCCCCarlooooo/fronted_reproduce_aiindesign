# 场景证据表 — stateofaidesign.com 首页（1440×900，总滚动高度 11209px）

字体：Beausite Classic Medium/Regular/Bold（framerusercontent woff2 hotlink）、Geist Mono（gstatic）。
全局色板（DOM computed 取证）：
- 橙 `#FE7141` rgb(254,113,65)（CTA、Tools 章节底色、Submit、accent 条）
- 淡紫 `#CDABFE` rgb(205,171,254)（Craft 章节、导航菜单、统计面板、accent 条）
- 灰绿 `#D1DDD3` rgb(209,221,211)（Teams 章节、引言面板、统计面板2）
- 黑 `#000` / 白 `#FFF` / 米白 `#F7F6F4`（黑底文字/Logo）
- 页边距 16px；细分隔线 rgba(0,0,0,.9) 1px（白底）与 rgba(255,255,255,.3)（黑底）

| # | 场景 | 滚动区间 | 原站文案（逐字） | 主体/媒体 | 关键色 | 动效/交互 | 截图 |
|---|------|---------|----------------|-----------|--------|-----------|------|
| 0 | Loader/Logo intro | 加载时 | — | AiiD 26 logo intro（Framer "Logo Intro Container"） | 黑/白 | logo 显现后揭开页面 | — |
| 1 | Hero | 0–900 | "How designers are evolving their tools, craft, and teams with AI" / "AI in Design Report 2026"(h1 120px/lh114/ls-7.2) / "BY DESIGNER FUND IN PARTNERSHIP WITH FOUNDATION CAPITAL"(mono) / "Scroll to read"+↓ | 顶部480px 热感花朵/人像拼贴视频：intro `11fQjZ8SBLFtf9GDiGqEbzqKI8.webm`(播一次)→loop `60TSo4WrKzA27Mp4KCDTmVbhc.webm`；poster `LKdFBU4cZXjWWQJR62rMmwUFg.jpg`；画面内含 FOUNDER / CREATIVE DIRECTOR 标签(烧在视频里) | 橙/粉/绿/紫拼贴+白 | 视频自动播放；标题入场；Scroll cue | scroll-00-0000.png |
| 1b | Header | 首屏顶部 | "AiiD™26" 黑块 / "Read the Report +" 橙块 / "About" / "Case Studies +" | — | 黑/橙#FE7141/白 | Case Studies 悬停变淡紫#CDABFE；点击开全屏淡紫菜单；Read the Report 点击开 584px 橙色章节抽屉 | hover-nav-casestudies.png, nav-dropdown-open.png, read-report-menu.png |
| 2 | Partners | 900–1298 | "OUR PARTNERS"(mono 13) | 7 logo：Notion, SIERRA, Framer, Linear, ANTHROP\C, shopify, stripe | 黑白 | 顶部细线；logo 行 | scroll-01-0900.png |
| 3 | Inflection | 1298–1613 | "AN INFLECTION POINT"(mono) / "In 2025, designers were experimenting with AI. In 2026, they're rebuilding around it."(50px/50/ls-2) | 纯文字 | 黑白 | 标签+标题上移入场 | scroll-01-0900.png |
| 4 | Founders sticky | 1613–2963 | "900+ / Designers surveyed in 60+ countries."(22px) "25+ / Interviews with practitioners and leaders" | 创始人照片 `ytblsBi2O0C6jtd1PYCTXAczI.jpg`(左2/3, 949px)；右1/3 两块面板 | 面板1 淡紫#CDABFE、面板2 灰绿#D1DDD3 | sticky 停留；大数字 ~90px | scroll-02-1800.png |
| 5 | Mission | 2963–3723 | "AI in Design 2026 aims to capture how AI is transforming tech design across designers' desks and within their teams."(28px) + 3 段 16px + "Sign up for new releases."(下划线) | 右列文字（x≈603，宽565） | 黑白 | 段落 reveal | scroll-03-2700.png |
| 6 | Quote | 3723–4338 (615h) | ""(50px) / 头像 / "Katie Dill"(16) / "HEAD OF DESIGN, STRIPE"(mono 12 灰) / "AI is sparking a creative renaissance in design. With new instruments, it's our chance to compose wholly new music."(50px/50) | 头像 `ILvJ4Wz4i6yJ8F12oB7DbSiYhI.png` 88px | 左黑块(0–586px)+右灰绿#D1DDD3 | 引文 reveal | scroll-04-3600.png |
| 7 | Chapter 01 Tools | 4338–5488 sticky | "01/Tools"(80px/76/ls-4.8) "The great toolstack shakeup"(40px) + 章节导语段 + "IN THIS CHAPTER, WE'LL COVER:"(mono) + 5 行清单 + "Read the Tools Chapter"→ | 花朵半调视频 `GxhkDLcDBfujafaVJCiFKoxE.webm`(571×369) | 橙 #FE7141 全屏底 | 滑层堆叠(下一章盖上一章)；清单行细线；黑色 CTA 条 hover 箭头滑动 | scroll-05-4500.png |
| 8 | Chapter 02 Craft | 5488–6638 sticky | "02/Craft" "Craft in the age of infinite output" + 导语 + 5 行清单 + "Read the Craft Chapter" | 橙花视频 `lL79Fmd1Pvt2WDRdt11xdoPD3Uw.webm` | 淡紫 #CDABFE | 同上 | scroll-06-5400.png |
| 9 | Chapter 03 Teams | 6638–7538 sticky | "03/Teams" "Redesigning the design org" + 导语 + 5 行清单 + "Read the Teams Chapter" | 灰花+卡片视频 `n4xIX9MPpD5lGFog1WLZ2I2UQyY.webm` | 灰绿 #D1DDD3 | 同上 | scroll-07-6300.png |
| 10 | Case carousel | 7538–8579 | "VIDEO CASE STUDIES"(mono) / "Seven companies. Seven ways of navigating the same shift."(40px) / 每卡：Coming soon + 公司名(28) + 标题(20) + 描述(16) + "Get notified"→ | 7 卡 460px：Stripe `9q6atfyx…png`、Sierra `BjnduoVw…png`、Anthropic `qsqwQqO5…png`、Shopify `sVDqVYB6…jpg`、Notion `vdlaU7hX…jpg`、Linear `aoiJOJb5…png`、Framer `rd6RC3C2…png` | 缩略图 grayscale(1)，accent 条：Stripe 橙 其余淡紫 | 左右箭头翻页；卡片 hover 去灰显色；Get notified hover 箭头 | scroll-08-7200.png, carousel-card-hover.png |
| 11 | Coming soon video | 8579–9545 | "COMING SOON"(mono) / "Inside AI-native design teams"(26px) / "Seven video case studies with the design teams at Anthropic, Framer, Linear, Notion, Shopify, Sierra, and Stripe. Go inside the workflows they've rebuilt, the tradeoffs they're navigating, and how they're operating differently as a team." / "Get notified when they're released"→ | 预告视频 `4RQvaMC0xNnbs7f7MQ6hG63i2pM.webm`(右侧57%宽,自动循环) + 播放按钮; YouTube hoAse4DybPY | 白底 | 视频 hover 播放按钮；链接行 hover | scroll-09-8100.png, scroll-10-9000.png |
| 12 | Footer subscribe | 9545–10400 | "Get new case studies & report markdown"(48px 白) / "Download the markdown version of the report, ready to drop into any tool. Get notified as new case studies go live."(20px) / "Your email" + "Submit" / "By subscribing, you agree to receive communications from Designer Fund and Foundation Capital in accordance with their privacy policies." | 表单 | 黑底、白输入框、橙 Submit | 入场 reveal | scroll-11-9900.png |
| 13 | Methodology | ~10270 | "METHODOLOGY"(mono) "This report draws from"(28px) / "906 Survey responses" "25+ Interviews" "50+ Public sources"(数字~96px) | 4 列表格白细线分隔 | 黑底米白#F7F6F4 | 数字 reveal | scroll-11-9900.png |
| 14 | Giant wordmark + footer | 10400–11209 | "Ai in Design™"(全宽巨字) / "2026"(右对齐巨字) / "REPORT PARTNERS": Anthropic Framer Stripe Sierra Notion Shopify Linear / "REPORT": Read the Report About Case Studies / "©2026 Designer Fund, Foundation Capital. All rights reserved" / "Made in Framer by ++hellohello" | SVG 风格巨字(米白 #F7F6F4) | 黑底米白 | 巨字滚动揭示 | scroll-12-10309.png |

## 鼠标交互证据
1. 导航 "Case Studies +" hover → 背景变淡紫（hover-nav-casestudies.png）；点击 → 全屏淡紫菜单，双列 7 行案例（名称+上标序号+Coming soon+彩色缩略图），左上 "Case Studies"，右上 ×，底部版权行（nav-dropdown-open.png）
2. 导航 "Read the Report +" 点击 → 左侧 584px 橙色 "Report Chapters" 抽屉，Tools/Craft/Teams 三行与关闭按钮（read-report-menu.png）
3. 轮播卡缩略图 `filter: grayscale(1)`（DOM 证据），hover 恢复彩色
4. "Get notified" 行有独立 "Hover state" 层（DOM）→ 箭头/文字滑动
5. 黑色 "Read the X Chapter" CTA 条 + 右箭头
6. 复刻要求新增：原生 Canvas 粒子拖尾（品牌四色柔和光斑），不替代上述具体交互

## 资源验证（curl 全部 200/206，2026-07-16）
见交付报告；所有链接改指 https://example.com/
