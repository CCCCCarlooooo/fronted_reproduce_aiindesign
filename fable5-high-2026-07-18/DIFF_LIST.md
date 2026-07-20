# 差异清单 — 场景配对诊断（原站结构 vs 成品）

> 配对方式：按场景号（见 SCENE_EVIDENCE.md），非相同滚动百分比。
> 原站截图：screenshots/original/ · 成品截图：screenshots/repro/
> 注：文案与媒体为约定的原创替换（合规基线），不列为差异；仅评估结构 / 比例 / 色彩方向 / 动效。

## 第一轮：主线诊断（自查）

| # | 场景 | 原站表现 | 成品表现 | 证据 | 严重度 | 修复方案 | 状态 |
|---|---|---|---|---|---|---|---|
| D1 | 1 Hero | 拼贴 banner 电影感强：深色有机形体高对比、明亮"照片卡片"漂浮、暗角颗粒 | Canvas 混色过于柔和发灰 | orig/00 vs repro/00 | High | 重写渲染：深苔藓底、高对比有机剪影、漂浮渐变照片卡、保留鼠标扰动 | ✅（repro/00-scroll0-v2） |
| D2 | 1 Hero | 大标题在右半区左对齐（起点 x≈603 = 42%） | 大标题右对齐贴右缘 | orig/00 vs repro/00 | Medium | 标题改 left:42% 左对齐 | ✅ |
| D3 | 6 引言 | portrait 色调中性克制 | 彩色复古照片跳脱 | orig/03 vs repro/03 | Medium | grayscale(0.85)+contrast 滤镜 | ✅（repro/03b） |
| D4 | 7-9 章节 | 列表行宽 ≈455px，CTA 条通右缘 | 列表行通到视口右缘 | orig/04 vs repro/06 | Medium | ul 限宽 455px | ✅（repro/04b） |
| D5 | 14 页脚 | 巨型字标横贯全宽 | 字标约 76% 宽 | orig/11 vs repro/10 | Low | 调大 clamp 至 97.8% 宽 | ✅（designer 复measure 1408/1440） |
| D6 | 4 数据板 | 大数字视觉更重 | 72px 稍轻 | orig/02 vs repro/02 | Low | 增至 84px | ✅ |
| D7 | 10 案例卡 | 卡宽 476×图高 310 | 460×300 | orig/08 vs repro/07 | Low | 偏差 <5%，接受 | 保留 |
| D8 | 全局 | Beausite Classic 字体 | Inter 替代 | 全部 | Low | 商用字体不可自由热链（合规基线） | 保留 |
| D9 | 1 Hero | 摄影素材拼贴视频 | Canvas 生成拼贴 | orig/00 | Low | 约定的原创替换 | 保留 |

## 第二轮：code-reviewer 独立复审（18 项）

采纳并修复：M1 缓存 hero tags（去每帧 querySelectorAll）✅ · M2 拖尾监听 rAF 帧门 ✅ · M3 resize 保留动画状态（Δ宽>200 才重播种）✅ · M4 墨点上限 50→30 ✅ · M5 章节艺术图 DPR 渲染（Retina 清晰）✅ · M6 图片 error 监听前先查 complete/naturalWidth ✅ · M7 hero intro 延至 preloader 渐隐后（450ms）✅ · L5 methodology 加 reveal ✅ · L6 canvas 加 role="img" ✅ · L9 preloader 立即 pointer-events:none ✅

**仲裁未采纳（与取证/代码事实不符）**：
- H1"GSAP 失败时 hero 文字永久隐藏"：`yPercent:108` 等 from 态仅由 `gsap.fromTo` 在运行时施加；GSAP 缺失时 `playHeroIntro`/`initScrollStory` 直接早退，元素保持 CSS 默认**可见**态。已实测（无 GSAP 分支代码路径审查）。
- H2"feature-poster 可能永久 clip 隐藏"：同理，from 态只在 GSAP+ST 均存在时施加；且该元素恒在首屏外，trigger 必然可达。
- H4"元素引用先于 DOMContentLoaded"：经典脚本置于 </body> 前是本任务规格的固定要求，解析时 DOM 已就绪；属防御性建议，不构成缺陷。
- L1/L3/L4/L7/L8/L10：微小或不适用，如实记录不改。

## 第三轮：designer 独立复审（High 2 / Medium 4 / Low 5，评估保真 88-92%）

采纳并修复：H1 nav CTA 内容排布（480px 宽、内容居中 gap-3，替代 pl-56/gap-24 的失衡内边距）✅ · M1 章节 CTA 条 -16px 右溢出到视口边缘 ✅ · M2 .chapter-name font-weight 500 ✅ · M3 case 卡"Coming soon"加 text-shadow 提升可读性（原站为无底色白字，故不加色块底，用阴影折中）✅ · M4 partners 底距 pb-24→pb-16 ✅ · L3 favicon（内联 SVG data URI，消除 404）✅ · L4 grain 平铺 280px ✅

**仲裁未采纳（与取证不符）**：
- H2"stats 应改 2fr/1fr"：原站测量照片 934px/面板 462px；现 grid-cols-3+span-2 产出 936/464，与建议的 2fr/1fr（933/466）等价（差 <1%），无实质差异，维持现状。
- L5"照片 763px 高于 720px"：这是 scrub 动画在 progress=0 的**有意** scale(1.06) 初始态，容器 overflow hidden，滚动后收敛到 720px；符合设计。
- L1/L2：在既定容差内，接受。

## 终审回归三件套（全部修复后）
1. **headless 渲染**：JS 报错 0（仅 Tailwind CDN 生产提示 warn）；8/8 图片加载成功；favicon 404 已消除
2. **grep/静态校验**：全部 `<a>` 均指向 https://example.com/；index.html 无大段内联 style/script（仅 hero-tag 三个坐标属性）；本地相对引入；script.js 为经典脚本、位于 GSAP/ScrollTrigger CDN 之后、`</body>` 前
3. **首屏稳定态**：scroll=0 完整（repro/00-scroll0-final.jpeg），preloader 2.5s 超时兜底不阻塞，GSAP 初始态不隐藏内容
4. 交互实测：轮播按钮位移 ✅ · 订阅表单校验与提示 ✅ · 拖尾粒子（trailLen 0→6，painted 72px）✅ · hero 标签视差（transform 更新）✅ · 计数器（1,214/30+/60+ 到位）✅
