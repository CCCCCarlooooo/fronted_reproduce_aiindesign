# 场景证据表 — stateofaidesign.com 结构取证（2026-07-18, Fable 5）

> **重要说明（合规基线）**：应作者确认，本复刻为**技术复刻**：完整还原原站的场景结构、
> 滚动叙事节拍、布局比例、配色方向、动效与交互模式；**文案为原创占位内容，
> 不逐字复制原站文字；媒体不热链原站受版权资源**（用 picsum 自由图库 + Canvas 生成视觉替代）。
> 下表中"原站表现"仅描述结构与行为，用于工程对位。

## 全局取证

| 项目 | 值 |
|---|---|
| 生成器 | Framer |
| 总滚动高度 | 11209px（视口 1440×900，可滚动 10309px） |
| 字体 | 标题/正文：Beausite Classic（近似替代：Inter/系统 grotesque）；标签：Geist Mono（等宽） |
| 关键色值（DOM 采样） | 白 #FFFFFF · 黑 #000000 · 橙 #FE7141 · 薰衣草紫 #CDABFE · 鼠尾草绿 #D1DDD3 · 荧光黄绿 #F0FF1C（强调） |
| 媒体 | 6 个 webm 视频：hero 拼贴（intro 播一次 + loop 循环，容器高 480px）、3 个章节艺术图（571×369，扭曲花卉/半调风格）、1 个 coming-soon 大视频（1425×680） |
| Canvas | 原站无 canvas；动效为 Framer 滚动入场 + 视频 |
| Hero 行为 | 无 pinning，正常滚动离场；banner 内浮动小卡片带职位标签（烤入视频） |

## 场景表

| # | 场景 | 原站结构表现（截图证据） | 关键色 | 动效/交互 | 截图 |
|---|---|---|---|---|---|
| 1 | Hero 首屏 | 顶部导航：黑色 logo 块 + 橙色 "Read the Report +" 按钮 + 右侧 About / Case Studies+；其下 480px 全宽动画拼贴（扭曲花卉、漂浮职位标签卡）；下半：左侧两行小字副题，右侧超大两行标题；底部一行：左等宽小字署名、中 "Scroll to read"、右下箭头 | 白底黑字，banner 多彩 | intro 视频播一次转 loop；文字入场上移淡入 | original/00-scroll0.jpeg |
| 2 | 合作伙伴 | 细分隔线 + 等宽小写标签 "OUR PARTNERS"，7 个品牌 logo 一行均布 | 白底 | 滚动淡入 | original/01-scroll1000.jpeg |
| 3 | 转折点声明 | 等宽标签 + 左对齐大标题（3 行），其下全宽实景照片（两位设计师看笔记本） | 白底 | 标题滚动入场 | original/01,02 |
| 4 | 数据拼板 | 左 2/3 照片，右 1/3 两块堆叠色板：紫板 "900+ / Designers surveyed…"、绿板 "25+ / Interviews…" 大数字+小注 | 紫 #CDABFE、绿 #D1DDD3 | 色板滚动入场 | original/02-scroll2000.jpeg |
| 5 | 报告使命 | 右列文字块：中标题 + 3 段正文 + 下划线链接；左侧留白 | 白底 | 淡入 | original/03-scroll3000.jpeg |
| 6 | 引言 | 左黑板块：大引号 + 人物小portrait + 署名；右绿板块：超大引言文字（占屏约半） | 黑 + 绿 #D1DDD3 | 滚动进入时文字显现 | original/03,04 |
| 7 | 章节 01 Tools | 全宽橙色板：顶部细线，左"01/Tools"超大字，右中标题+正文；下方左半调艺术图（紫橙），右 "IN THIS CHAPTER, WE'LL COVER:" + 5 行下划线列表 + 黑色全宽 CTA 条 "Read the Tools Chapter →" | 橙 #FE7141 | 列表行悬停、CTA 箭头悬停位移 | original/04,05 |
| 8 | 章节 02 Craft | 同构，紫色板，橙色花卉艺术图 | 紫 #CDABFE | 同上 | original/05,06 |
| 9 | 章节 03 Teams | 同构，绿色板，黑白花卉+彩色小卡拼贴艺术图 | 绿 #D1DDD3 | 同上 | original/06,07 |
| 10 | 案例轮播 | 白底："VIDEO CASE STUDIES" 标签，左大标题两行，右上一对左右箭头；3+ 张卡片：黑白人物照 + 底部紫色条，卡下公司名 + 描述 + "Get notified →" | 白底、紫条 | 箭头切换轮播；卡片悬停 | original/07,08 |
| 11 | Coming soon 大视频 | 等宽标签 "COMING SOON"，右侧大视频（暖色调、播放按钮），下方左空右文：标题 + 段落 + "Get notified…→" | 白底 | 播放按钮悬停 | original/08,09 |
| 12 | 订阅（黑） | 全宽黑板：居中超大两行标题 + 副文 + 邮箱输入框 + 橙色按钮 + 法务小字 | 黑底白字、橙按钮 | 按钮悬停 | original/09,10 |
| 13 | 方法论数据条 | 黑底四列带竖线边框：等宽标签 "METHODOLOGY / This report draws from" + 三个大数字（906 / 25+ / 50+）各配小注 | 黑底白字 | 数字滚动入场（计数） | original/10 |
| 14 | 巨型页脚 | 黑底：巨型品牌字标（跨全宽，带 ™）→ 下方链接两组（REPORT PARTNERS / REPORT）+ 右侧巨型 "2026" → 底部版权行 + 出品方标识 | 黑底白字 | 字标滚动上升入场 | original/10,11 |

## 复刻内容映射（原创内容）

- 报告名：**Machine Craft Report 2026**（品牌字标 "MC™26" / "Machine Craft"）
- 出品方：Fieldnote Labs × North Loop Ventures（虚构）
- 合作伙伴 logo：7 个虚构品牌文字标（Vertex, Halcyon, Oxbow, Plume, Cinder, Marrow, Fielder）
- 章节：01 Tools / 02 Craft / 03 Teams（结构对位，正文原创）
- 数字：1,200+ 受访者 · 30+ 深访 · 60+ 公开来源（原创）
- 媒体：picsum.photos 自由图库（curl + 浏览器双重验证）+ 原生 Canvas 生成的流体/半调艺术图
- Hero 拼贴：原生 Canvas 实现流动渐变墨彩 + 漂浮标签卡，鼠标可交互（替代原站视频）
