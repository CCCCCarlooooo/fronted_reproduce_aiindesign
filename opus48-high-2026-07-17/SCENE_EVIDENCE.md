# 场景证据表 — stateofaidesign.com (AI in Design Report 2026)

取证环境：headless Chrome 1440×900，页面总滚动高度 **11219px**。
字体：**Beausite Classic Medium**(500, 显示大标题, letter-spacing≈-6%)、**Beausite Classic Regular**(400)、**Geist Mono**(等宽小标签)、**Inter**(正文)。

## 采样配色
| 名称 | 值 | 用途 |
|---|---|---|
| Orange | `#FE7141` rgb(254,113,65) | 顶栏左侧、Tools章节底、Submit按钮 |
| Lavender | `#CDABFE` rgb(205,171,254) | Craft章节底、案例卡底部条 |
| Sage | `#D1DDD3` rgb(209,221,211) | Katie Dill引言右栏、Teams章节底 |
| Black | `#000000` | 引言左栏、CTA按钮、末屏、底部 |
| Off-white | `#F7F6F4` rgb(247,246,244) | 末屏巨型"Ai in Design"字色 |
| Yellow | `#F0FF1C` rgb(240,255,28) | hover 高亮 |
| White | `#FFFFFF` | 默认背景 |

## 场景清单（按 DOM/滚动顺序）
| # | 滚动位置 | 主体 | 文案 | 配色 | 动效/交互 | 截图 |
|---|---|---|---|---|---|---|
| S1 首屏 | 0 | 顶栏(AiiD 26 橙块 + Read the Report + About/Case Studies) + 抽象拼贴媒体带 + 巨标题 | H1 "AI in Design Report 2026"（右下巨字120px）；左"How designers are evolving their tools, craft, and teams with AI"；底"BY DESIGNER FUND IN PARTNERSHIP WITH FOUNDATION CAPITAL" / "Scroll to read ↓" | 白底/黑字/橙块 | 巨标题 scrub 入场；媒体拼贴块；鼠标粒子拖尾 | orig_top.jpeg |
| S1.5 合作方 | ~1150 | 7个合作方logo(Notion,Sierra,Framer,Linear,Anthropic,Shopify,Stripe) + "AN INFLECTION POINT" + 大陈述句 + 会议室大图 | H1 "In 2025, designers were experimenting with AI. In 2026, they're rebuilding around it." | 白底黑字 | logo行；大图 fade-in | orig_1150.jpeg |
| S2 数据 | ~1800 | 会议室照片 + 900+/25+ 统计块 | "900+ Designers surveyed in 60+ countries." / "25+ Interviews with practitioners and leaders" | Lavender + Sage块 | 数字计数(0→900);块状 | orig_1800.jpeg |
| S3 引言 | ~3600 | 左黑栏(引号+Katie Dill肖像+HEAD OF DESIGN, STRIPE) 右Sage栏大引言 | "AI is sparking a creative renaissance in design. With new instruments, it's our chance to compose wholly new music." | 黑 + Sage | 分栏；橙条露出下章 | orig_3600.jpeg |
| S4 Tools(01) | ~4300 | 左"01 Tools"巨字 + 右标题/正文 + 下方章节清单 + Read the Tools Chapter黑按钮 + 半调紫色斑点图 | H1 "The great toolstack shakeup"；正文；5条清单 | Orange底黑字 | 章节进入；半调图 | orig_4300.jpeg |
| S5 Craft(02) | ~5200 | 左"02 Craft"巨字 + 右标题/正文/清单 + 花卉紫色艺术图 + Read the Craft Chapter | H1 "Craft in the age of infinite output"；5条清单 | Lavender底黑字 | 同上 | orig_5200.jpeg |
| S6 Teams(03) | ~6200/7000 | 左"03 Teams"(灰花卉拼贴图) + 右清单 + Read the Teams Chapter | H1 "Redesigning the design org"；5条清单 | Sage底黑字 | 同上 | orig_6200/7000.jpeg |
| S7 案例 | ~7600 | "VIDEO CASE STUDIES" + "Seven companies. Seven ways of navigating the same shift." + ←→ + 灰度案例卡横滑(Stripe/Sierra/Anthropic...) 底部lavender条 | 卡片: Coming soon / 公司名 / 副标 / Get notified→ | 白底黑字，卡灰度 | 水平轮播；箭头切换；hover | orig_7600.jpeg |
| S8 Coming soon | ~9200 | "COMING SOON" + H3 "Inside AI-native design teams" + 段落 + Get notified when they're released → | 段落列七公司 | 白底 | fade | orig_9200.jpeg |
| S9 订阅 | ~9200底 | 黑底 "Get new case studies & report markdown" + 邮件输入+Submit橙按钮 | 说明+订阅 | 黑底白字，橙按钮 | 表单 | orig_bottom(上) |
| S10 末屏 | ~10300-11219 | METHODOLOGY(This report draws from + 三统计) + 巨型"Ai in Design 2026"字 + 页脚(REPORT PARTNERS/REPORT + Designer Fund/Foundation Capital + Made in Framer) | 数字统计 | 黑底off-white巨字 | 视差；数字 | orig_bottom.jpeg |

## 资源（均 curl 200/206，ACAO:*，可 hotlink）
抽象拼贴/章节图(framerusercontent/images)：rd6RC3C2g35…png, Bjnduo…png, sVDqVY…jpg, vdlaU7…jpg, 9q6atf…png, aoiJOJ…png, qsqwQq…png, ytbls…jpg
会议室大图：ytblsBi2O0C6jtd1PYCTXAczI.jpg
字体(本地化,避免file://CORS)：fonts/BeausiteClassic-{Medium,Regular,Bold}.woff2
案例webm(206 range ok)：11fQjZ…webm, 60TSo4…webm, GxhkDL…webm 等

## 交互
- 鼠标粒子拖尾（原生Canvas，全局）
- 巨标题 scrub 入场（GSAP fromTo，progress=0 时不得永久透明/移出）
- 数字计数（900+, 25+, 统计）
- 章节章节色块切换
- 案例卡水平轮播（←→）
- hover 黄色/下划线反馈
- 所有链接 → https://example.com/
