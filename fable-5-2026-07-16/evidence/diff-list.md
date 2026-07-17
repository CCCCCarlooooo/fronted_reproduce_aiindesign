# 差异清单（成品 vs 原站，按场景配对，1440×900）

## 批 1（自诊断，全部关闭）
| # | 场景 | 原站表现（证据） | 成品表现（证据） | 严重度 | 修复方案 | 状态 |
|---|------|----------------|----------------|--------|---------|------|
| H1 | 14 页脚字标 | "Ai in Design™" 完整收进视口宽（original/scroll-12，宽≈1390） | 字号 305px 溢出，"Design" 右侧被裁（旧 replica/scroll-11/12） | High | JS fit-to-width 按容器宽动态字号 | 已修复✓（replica/scroll-12-max.png） |
| H2 | 14 页脚底栏 | DF/FC 品牌小标清晰 | "⟠" tofu 缺字 | High | 内联 SVG 小标替换 Unicode | 已修复✓ |
| M1 | 2 Partners | rule 位于 abs≈1043，顶部 ~140px 留白 | rule 紧贴 900 | Medium | padding-top:140px | 已修复✓ |
| M2 | 1 Hero | "Scroll to read" Beausite Regular | 误用 Geist Mono | Medium | 改 font-regular 17px | 已修复✓ |
| M3 | 1 Hero | 媒体底边 y=480（高424） | 高480、底536 | Medium | height:424px | 已修复✓ |

## 批 2（designer 复审意见仲裁）
| # | 场景 | 意见 | 仲裁 | 状态 |
|---|------|------|------|------|
| D1 | 4 统计面板 | 原紫/灰绿≈540/360（60/40），成品等分 | 与取证一致，采纳 | 已修复✓ flex 3:2（final-02-1800.png） |
| D2 | 6 Quote | 原黑块 x0–587 贴左缘，成品有 16px 左边距 | 与取证一致，采纳 | 已修复✓ margin-left:0、flex-basis 41.2%（final-04-3600.png） |
| D3 | 全局 header | 原站深滚截图（01–12）均无 header（下滚隐藏/上滚显示），成品常显遮内容；判 High | 与取证一致，采纳 | 已修复✓ scroll 方向监听 + .header-hidden（final-05/09/10 无 header） |
| D4 | 1b header 尺寸 | 原 logo 黑块 160px / 橙块 424px（止于584），成品黑块 138px | 与取证一致，采纳 | 已修复✓ min-width:160（DOM 测量 logoW=160, pillRight=584） |
| D5 | 8–10 滚动锚点 | carousel/coming-soon/黑底切换较原站提前 98–116/489px | 与取证一致（根因=上游区块高度差），采纳 | 已修复✓ 分区高度校准后 DOM 边界全部 ±1px：case-studies 7538、coming-soon 8578、footer 9544、methodology 10224；soon 视频顶 8641 vs 原 8644 |
| D6 | 13 Methodology | 相对节拍提前 ~146px | 采纳 | 已修复✓ margin-top 137（methodology abs 10224 vs 原 ~10225） |
| D7 | 菜单行 | 行内左缩进 16px、缩略图对齐 | 采纳 | 已修复✓ .menu-row padding:16px |
| D8 | 菜单滚动条 | 原截图右侧 15px 滚动条占位 | 环境差异（headless overlay scrollbar），Low，不修 | 保留说明 |
| D9 | 合作方 logo / DF·FC mark | 自绘近似非官方 SVG | Low：品牌矢量不逐一复制，布局节拍一致 | 保留说明 |

## 批 3（code-reviewer 意见仲裁）
| # | 意见 | 仲裁 | 状态 |
|---|------|------|------|
| C2 | rAF 全生命周期空转（High） | 采纳 | 已修复✓ 粒子存活时才运行 + visibilitychange |
| C3 | carousel 缺 touch-action/user-select（High） | 采纳 | 已修复✓ pan-y + user-select:none |
| C4 | 菜单动画竞态 | 采纳 | 已修复✓ killTweensOf + onComplete 守卫 |
| C5 | 缺 pointercancel | 采纳 | 已修复✓ endDrag 双事件 |
| C6 | resize 无防抖 | 采纳 | 已修复✓ rAF 合并（canvas 与 wordmark） |
| C7 | 粒子超限 splice O(n) | 采纳 | 已修复✓ 上限前 shift() |
| C11/12/15/16 | 菜单 dialog 语义/焦点、表单 label、装饰 SVG/视频 aria-hidden | 采纳 | 已修复✓ |
| C14 | --font-bold 未定义 | 采纳 | 已修复✓ :root 定义并直接引用 |
| C17 | clearRect 与变换耦合脆弱 | 采纳 | 已修复✓ 重置变换后清屏 |
| C18 | .rule-dark 冗余 | 采纳 | 已修复✓ 删除类与用法 |
| C19 | quote/giant-year toggleActions 缺省 | 采纳 | 已修复✓ play none none none |
| C1 | "GSAP 加载失败致内容永久隐藏"（High） | **驳回：与代码事实不符** —— 初始隐藏态仅由 gsap.fromTo 自身设置；GSAP 未加载时 hasGSAP=false，所有元素保持 CSS 自然可见，且 §4 同时 gate 了 gsap 与 ScrollTrigger | 不采纳（已注明） |
| C8 | scrub fromTo 初始位移致键盘跳转错位（Medium） | **驳回：与 ScrollTrigger 行为不符** —— scrub 状态由滚动位置实时插值，任何方式到达该位置都会重算；且触发区间均在视口外 | 不采纳（已注明） |
| C9 | 移除 Tailwind CDN（Medium） | **驳回：任务规格强制要求** "Tailwind CSS 与 GSAP 3 + ScrollTrigger 通过 CDN 引入" | 不采纳（已注明） |
| C10 | 表单 GET 跳转无反馈（Medium） | **驳回：规格要求** 所有按钮/链接跳转 example.com，表单 action 即此行为 | 不采纳（已注明） |
| C13 | 移动端响应式（Low） | 任务为 1440 桌面首页复刻，仅保留 1200px 安全断点 | 不采纳（已注明） |
| C20 | fonts loadingdone 额外监听（Low） | fonts.ready + resize 已覆盖 | 不采纳（已注明） |

## 残留 Low（如实说明）
- L1 合作伙伴 logo / DF·FC 品牌 mark 为自绘近似（品牌矢量不逐一复制）
- L2 webm 视频截图帧与原站截图帧不同（同源视频动态内容）
- L3 总滚动高 11176 vs 11209（差 0.3%，字体度量差异）
- L4 headless 无滚动条占位（原站截图含 15px 滚动条）

## 最终回归三件套（批 2/3 修复后）
1. console 零 error；20 个 hotlink 资源加载成功
2. grep：全部 href→example.com；index.html 内联 style=0、无内联 script；脚本顺序 Tailwind→GSAP→ScrollTrigger→script.js
3. 首屏 scroll=0 稳定态（final-00-0000.png）：loader 结束、内容完整、无初始隐藏
