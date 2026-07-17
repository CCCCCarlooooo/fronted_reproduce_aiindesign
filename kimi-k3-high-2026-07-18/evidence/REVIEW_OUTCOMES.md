# 独立复审处理记录

两类复审均已实际派发独立子 agent 完成（非主 agent 自审）。

## Designer 视觉终审（6 Medium / 9 Low，0 High）

| 条目 | 处理 | 说明 |
|------|------|------|
| H-1 统计色块 51:49 → 原站 60:40 | ✅ 已修 | .stat-purple flex:1.5 / .stat-green flex:1，r02 复截确认 |
| H-2 coming 区下方留白不足 | ✅ 已修 | padding-bottom 140→270px，coming-h margin-top 44→64px，r10 复截确认 |
| H-3 页脚字标笔划偏细 | ✅ 已修 | font-weight 700→900，ls -0.055→-0.045em，r12 复截确认 |
| H-4 hero 标题行距断裂感 | ✅ 已修 | line-height 0.95→0.98 |
| H-5 inflection 标题字重偏轻 | ✅ 已修 | font-weight 500→600，padding-top 48→60px |
| H-6 卡片区"右移 580px" | ❌ 未采纳 | **与取证不符**：r08_cases.png 显示卡片从 x=16 正常起始；该条目是把 r09（滚动相位在卡片下方）误判为布局缺陷。截图相位差，非布局错误 |
| M-1 顶栏隐藏位移 -100% → -118px | ✅ 已修 | translateY(calc(-100% - 10px)) |
| 统计 sticky 190vh 偏大 | ✅ 已修 | 190vh→150vh（原站容器 1350px≈150vh） |
| L-1~L-9（字体替代/品牌文字 logo/intro 视频/视频帧差等） | ⚠️ 记录 | 固有局限或原站本身不一致，保留 |

## Code-reviewer 代码审查（0 High / 6 Medium / 8 Low）

| 条目 | 处理 | 说明 |
|------|------|------|
| M1 Canvas 未适配 DPR | ✅ 已修 | resizeCanvas 乘 devicePixelRatio + setTransform |
| M2 rAF 空转 | ✅ 已修 | 粒子清空后暂停循环，mousemove 重启 |
| M3 video error 绑定时机 | ✅ 已修 | 改为 IIFE 顶部 capture 阶段委托监听 |
| M4 播放按钮不可交互 | ✅ 已修 | span→button + aria-label |
| M5 GSAP CDN 失败无兜底 | ✅ 已修 | hideLoader 中检测 window.gsap，缺失时强制 hero 可见 |
| M6 轮播无边界反馈 | ✅ 已修 | 首尾 disabled 态（scroll 监听 + 初始化） |
| L1 mousemove 无节流 | ⚠️ 未采纳 | 粒子上限 220 + 速度自适应数量，开销可控；rAF 暂停已解决空转 |
| L2 resize 无防抖 | ✅ 已修 | 150ms 防抖 |
| L3 表单无后端 | ⚠️ 记录 | 复刻范围，UI 反馈已足够 |
| L4 Tailwind Play CDN | ⚠️ 保留 | 任务规范强制要求 CDN 引入 Tailwind |
| L5 字体加载兜底 | ⚠️ 未采纳 | preconnect + display=swap 已足够，Google Fonts 稳定性高 |
| L6 触摸设备粒子无效 | ⚠️ 记录 | 桌面优先复刻，移动端粒子为非关键装饰 |
| L7 章节视频无 poster | ⚠️ 未采纳 | **与取证一致**：原站这些视频同样无 poster（poster=""） |
| L8 .case-q 隐藏 | ⚠️ 记录 | **与取证一致**：原站卡片同样不显示问题文案（s09） |

## 复审后回归三件套
- headless 零 JS 报错 ✅（console 无 error）
- 静态校验：链接全 example.com ✅ / 无内联 style-script ✅ / 相对引入+脚本顺序 ✅
- 首屏稳定态：loader 结束、标题 opacity 1、视频播放中、无 ScrollTrigger 初始隐藏 ✅（r00 复截）
