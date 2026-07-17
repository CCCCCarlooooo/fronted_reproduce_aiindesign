# AI in Design — 首页高保真复刻对比

多模型对 [stateofaidesign.com](https://stateofaidesign.com/) 首页的高保真静态复刻对比仓库。

每个变体为 **纯静态三文件**（`index.html` + `styles.css` + `script.js`），通过 CDN 引入 Tailwind CSS 与 GSAP 3 + ScrollTrigger，**无需构建**，双击 `index.html` 即可本地打开。

## 目录结构

| 目录 | 说明 |
|------|------|
| `kimi-k3-high-2026-07-18/` | Kimi K3 高保真复刻（2026-07-18，含 evidence） |
| `qwen37max-high-2026-07-18/` | Qwen 3.7 Max 复刻（2026-07-18） |
| `opus48-high-2026-07-17/` | Opus 4.8 高保真复刻（含本地字体、交付报告） |
| `qwen37max-high-2026-07-17/` | Qwen 3.7 Max 复刻（2026-07-17） |
| `qwen37max-high-2026-07-16/` | Qwen 3.7 Max 复刻（2026-07-16） |
| `gpt56-high-2026-07-16/` | GPT 5.6 复刻 + 像素 diff 证据 |
| `fable-5-2026-07-16/` | Fable 5 复刻 + 滚动对照证据 |
| `evidence/` | 原站滚动取证截图与文案/资源 JSON |
| `例子prompt` | 复刻用提示词模板 |

## 本地预览

任选一个变体目录：

```bash
# 方式一：直接用浏览器打开
open opus48-high-2026-07-17/index.html

# 方式二：本地静态服务（推荐，避免 file:// 限制）
npx serve opus48-high-2026-07-17
# 或
python3 -m http.server 8080 --directory opus48-high-2026-07-17
```

## 技术约定

- 三文件分离，禁止 React / Vue / 构建工具
- 链接统一指向 `https://example.com/`
- 核心鼠标交互（粒子拖尾等）为原生 Canvas + Vanilla JS
- 各目录内 `*_REPORT.md` / `SCENE_EVIDENCE.md` / `screenshots` 为取证与交付材料

## 目标站点

- 原站：https://stateofaidesign.com/
- 复刻范围：首页滚动叙事、交互与视觉风格
