# 交付报告 — stateofaidesign.com 首页复刻（fable-5-2026-07-16）

## 成品文件
- `fable-5-2026-07-16/index.html` — 结构 + CDN 引入（Tailwind / GSAP 3 / ScrollTrigger）+ 相对路径引入本地 styles.css、script.js（经典脚本，置于 </body> 前、GSAP 之后）
- `fable-5-2026-07-16/styles.css` — 全部自定义样式（loader、Canvas、菜单、章节滑层、轮播、页脚巨字等）
- `fable-5-2026-07-16/script.js` — 全部自定义逻辑（loader 兜底、hero 双视频切换、GSAP 滚动叙事、全屏菜单、轮播箭头+拖拽、原生 Canvas 粒子拖尾、巨字自适应、离屏视频暂停）

## 场景与动效实现概述
- 场景 0 loader：AiiD 26 黑块 logo，window load / 2.6s 超时双保险，GSAP 上滑揭开
- 场景 1 hero：56px 头部（黑 logo 块 + 橙 CTA + About/Case Studies+），424px 热感拼贴 webm（intro 播一次→loop 循环，poster 图兜底），120px Beausite 大标题入场
- 场景 2 partners：细线 + mono 标签 + 7 个近似品牌 logo
- 场景 3 inflection：50px 标题 reveal
- 场景 4 founders：sticky 照片（左 66%）+ 淡紫/灰绿统计面板右滑入 + 照片视差
- 场景 5 mission：右列 28px 标题 + 3 段文案 reveal
- 场景 6 quote：黑块（引号+头像+Katie Dill）+ 灰绿 50px 引文
- 场景 7-9 chapters：橙/淡紫/灰绿三张全屏滑层 sticky 堆叠（后章盖前章，与原站 1150px 步进一致），花朵 webm、清单行、黑 CTA 条箭头滑动
- 场景 10 carousel：7 张 460px 案例卡（grayscale→hover 显色、accent 条、Coming soon 角标、Get notified 箭头），左右箭头翻页 + 指针拖拽
- 场景 11 coming soon：4RQ webm 自动循环 + 播放按钮 hover 放大
- 场景 12-14 footer：订阅表单（白输入+橙 Submit）、methodology 4 列白线表格、"Ai in Design™" 巨字 JS 按容器宽自适应 + 滚动升起、2026 巨字、链接列、底栏

## 鼠标交互
- 原生 Canvas 粒子拖尾（品牌四色柔和光斑、随速度增量发射、DPR 感知、130 粒上限）— 已验证画布逐帧渲染（像素采样非零）
- Case Studies+ 悬停淡紫、点击全屏菜单（行 stagger 入场、ESC/×关闭、行 hover 其余变淡）
- 卡片灰度→显色、CTA/通知行箭头滑动、清单行 hover 缩进、播放按钮 hover 放大

## 证据位置
- 场景证据表：`evidence/scene-evidence-table.md`
- 差异清单：`evidence/diff-list.md`
- 原站截图（13 个滚动位 + 菜单/悬停态）：`evidence/original/`
- 成品截图（13 个滚动位 + 菜单/轮播/粒子态）：`evidence/replica/`

## 资源验证
20 个 hotlink 资源（2 hero webm、3 章节 webm、1 预告 webm、7 案例图、poster、创始人图、头像、3 字体 woff2、YouTube 缩略图）curl 全部 200/206；成品页 network 面板复核实际加载成功、无失败资源。

## 回归三件套（最终轮）
1. headless 渲染 console 零 error；媒体加载无失败
2. grep 校验：全部 href 指向 example.com（除本地 styles.css / data: favicon）；index.html 内联 style 计数 0、无内联 script 块；脚本顺序 Tailwind→GSAP→ScrollTrigger→script.js
3. 首屏 scroll=0 稳定态截图：loader 正常结束、hero 完整、无 ScrollTrigger 初始隐藏

## 独立复审
- designer 复审（实际派发，逐场景配对图审查）：结论"视觉高保真度较高，无阻断性 High"。提出的 M/H 项——统计面板 60/40 比例、Quote 黑块贴左缘、header 深滚隐藏行为、header logo 块 160px、场景 08–10 滚动锚点偏移（98–116/489px）、methodology 节拍、菜单行内缩——全部与像素取证一致，已采纳修复并复截确认（final-*.png，DOM 边界对齐至 ±1px）。Low 项（菜单滚动条占位、自绘品牌 mark）保留并注明。
- code-reviewer 复审（实际派发）：3 High / 7 Medium / 9 Low。采纳并修复 13 项（rAF 空转、touch-action、菜单竞态 killTweens、pointercancel、resize 防抖、粒子 O(1) 上限、dialog 语义+焦点、label、aria-hidden、--font-bold、clearRect 变换重置、rule-dark 冗余、toggleActions）。驳回 6 项并注明依据：C1"GSAP 失败致永久隐藏"与代码事实不符（隐藏态仅由 GSAP 自身设置）；C8 与 ScrollTrigger scrub 实时插值行为不符；C9 移除 Tailwind、C10 表单跳转与任务规格强制条款冲突；C13 移动端响应式超出 1440 桌面复刻范围；C20 已有 fonts.ready 覆盖。修复后重新执行回归三件套通过。
- 仲裁记录详见 `evidence/diff-list.md` 批 2/批 3 表格。

## 残留 Low 偏差（如实说明）
- L1 合作伙伴 logo 为自绘近似（官方品牌 SVG 路径未逐一复制），布局与节拍一致
- L2/L3 视频为同源 webm，截图帧与原站截图帧不同（动态内容随时间变化）
- L4 总滚动高度 11114 vs 原站 11209（差 <1%，因字体渲染宽度差）
- 原站 hero 顶部拼贴内的 FOUNDER/CREATIVE DIRECTOR 标签系烧录在视频画面内，复刻通过同源视频呈现
