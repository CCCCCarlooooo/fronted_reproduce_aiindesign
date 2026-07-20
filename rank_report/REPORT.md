# 复刻评测总表 · stateofaidesign.com (AI in Design Report 2026)

尺:30 条(core 23);判定=人视角读并排考卷;排名=(core 通过, 总通过),同分并列;合格=core 全过且已判通过率≥2/3。

## 排名
1. **opus48** — core 13/23, 总 15/30 已判 ❌不合格
2. **fable5_high** — core 12/23, 总 15/30 已判 ❌不合格
2. **kimi_k3** — core 12/23, 总 15/30 已判 ❌不合格
4. **fable_5** — core 10/23, 总 13/30 已判 ❌不合格
4. **gpt56_high** — core 10/23, 总 13/30 已判 ❌不合格
6. **qwen37max** — core 7/23, 总 8/30 已判 ❌不合格

## 矩阵(✓/✗/－未判)

| 条目 | opus48 | fable5_high | kimi_k3 | fable_5 | gpt56_high | qwen37max |
|---|---|---|---|---|---|---|
| ★P0.load | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| ★P0.enter | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| ★P0.reenter.sticky_nav | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| ★P0.hover.scroll_to_read | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ★P1.enter | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| ★P1.hscroll.stats | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ★P1.hover.nav_about | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ★P1.hover.nav_case_studies | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| P1.reenter.sticky_nav | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| ★P2.enter.stats | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| P3.enter | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ |
| ★P4.enter.chapter_number | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ |
| ★P5.enter.tools_orange | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| ★P5.hover.read_the_tools_chapter | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ★P5.hover.read_the_craft_chapter | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ★P6.enter.chapter_number | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| ★P7.enter.teams_identity | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| ★P7.hover.read_the_teams_chapter | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| P7.hover.read_the_craft_chapter | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ★P8.enter.cases_intro | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| ★P8.hscroll.video_cards | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ |
| P8.hover.read_the_teams_chapter | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ★P9.enter.case_cards | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| ★P9.hover.case_card_stripe | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ★P9.hover.get_notified | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| P9.hover.cards_container | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| P10.enter | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| P10.hover.get_notified_when | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ★P11.enter.footer_stats | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ |
| ★P11.hover.submit | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ |

## 逐家未过项证据

### opus48
- ✗ **★P0.hover.scroll_to_read** 悬停「Scroll to read」时它从普通细字变成一整条橙色填充胶囊、文字反白。 — 复刻胶片只采到 read_the_report/nav 靶,Scroll to read 始终普通细字、未出现橙色填充胶囊反白(3 票:0-3)
- ✗ **★P1.hscroll.stats** 招牌横滑数字揭示:横向滑动时右侧数字从 0 一路滚动递增到 370 → 732+ → 900+(配文「Designers — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)
- ✗ **★P1.hover.nav_about** 悬停顶栏「About」导航链接时它变成紫色胶囊高亮。 — 复刻 About 导航 off/on 均为纯文字,未变紫色胶囊高亮(裁切放大确认无底色)(3 票:0-3)
- ✗ **★P1.hover.nav_case_studies** 悬停顶栏「Case Studies」导航链接时它变成紫色胶囊高亮。 — 复刻 Case Studies 导航 off/on 均纯文字,无紫色胶囊高亮(3 票:0-3)
- ✗ **P3.enter** 报告主旨文字段进场:居中多段说明文字「AI in Design 2026 aims to capture how AI  — 复刻该滚位帧带显示的是 25+ 统计带与「AI is sparking a creative renaissance」引语卡,未见「AI in Design 2026 aims to capture...」主旨段淡入
- ✗ **★P5.hover.read_the_tools_chapter** 招牌 CTA 反转:悬停「Read the Tools Chapter」黑条时整块由黑底白字反转为白底黑字,右箭头随之变 — 裁切确认 CTA 黑条 off/on 均黑底白字,未反转为白底黑字(3 票:0-3)
- ✗ **★P5.hover.read_the_craft_chapter** 悬停「Read the Craft Chapter」黑条时同样由黑底白字反转为白底黑字。 — 复刻 off/on 黑条保持黑底白字未反转,无白底黑字态(3 票:0-3)
- ✗ **★P7.hover.read_the_teams_chapter** 悬停「Read the Teams Chapter」黑条时由黑底白字反转为白底黑字。 — 裁切确认黑条 off/on 均保持黑底白字,未黑底→白底反转(3 票:0-3)
- ✗ **P7.hover.read_the_craft_chapter** 悬停本页「Read the Craft Chapter」黑条同样黑底→白底反转(与 Teams CTA 同签名反转)。 — 复刻本页 Read the Craft Chapter 黑条 off/on 均黑底白字,无反转
- ✗ **P8.hover.read_the_teams_chapter** 悬停本页上部「Read the Teams Chapter」黑条同样黑底→白底反转(与 page07 同签名反转)。 — 复刻本页 Read the Teams Chapter 黑条 off/on 均黑底白字,无黑底→白底反转
- ✗ **★P9.hover.case_card_stripe** 招牌案例卡悬停展开:悬停某张案例卡(如 Stripe)时它手风琴式展开,露出隐藏的问题文字(如「How do you b — 复刻 off/on 三卡等宽静止,Stripe 卡未手风琴展开、未露出隐藏问题文字、其余卡未收窄(3 票:0-3)
- ✗ **★P9.hover.get_notified** 悬停案例卡上的「Get notified」区域触发同一张卡展开、显出隐藏问题文字与 Get notified 按钮(手风 — 复刻 off/on 卡片无展开,未显出隐藏问题文字与 Get notified 展开态(3 票:0-3)
- ✗ **P9.hover.cards_container** 悬停三卡容器时三卡文字由淡显略变实(整体对比略增),变化较弱但可辨。 — 复刻三卡容器 off/on 静止无可辨对比变化,淡显→变实效果未采到(存疑,拿不准判 ✗)
- ✗ **P10.hover.get_notified_when** 悬停「Get notified when they're released」下划线链接时它变成黑色填充条、文字反白(细微 — 复刻本页为邮件表单(Submit/邮箱输入靶),未采到「Get notified when they're released」下划线链接的黑色填充反白效果
- ✗ **★P11.hover.submit** 页尾表单招牌:悬停「Submit」按钮时它由橙色态变成紫色填充。 — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)

### fable5_high
- ✗ **★P0.hover.scroll_to_read** 悬停「Scroll to read」时它从普通细字变成一整条橙色填充胶囊、文字反白。 — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)
- ✗ **★P1.hscroll.stats** 招牌横滑数字揭示:横向滑动时右侧数字从 0 一路滚动递增到 370 → 732+ → 900+(配文「Designers — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)
- ✗ **★P1.hover.nav_about** 悬停顶栏「About」导航链接时它变成紫色胶囊高亮。 — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)
- ✗ **★P1.hover.nav_case_studies** 悬停顶栏「Case Studies」导航链接时它变成紫色胶囊高亮。 — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)
- ✗ **★P4.enter.chapter_number** 章节封面招牌大编号进场:左下巨号先出「01」再补成「01 / Tools」逐帧成型;上半黑底引语卡「AI is spar — 上半黑底引语卡+下半橙色章节条在,但左下巨号 01/Tools 的逐帧成型没出现(3票:0-3)
- ✗ **★P5.hover.read_the_tools_chapter** 招牌 CTA 反转:悬停「Read the Tools Chapter」黑条时整块由黑底白字反转为白底黑字,右箭头随之变 — 悬停前后黑条一直是黑底白字,没反转成白底黑字(3票:0-3)
- ✗ **★P5.hover.read_the_craft_chapter** 悬停「Read the Craft Chapter」黑条时同样由黑底白字反转为白底黑字。 — 该页 Craft 黑条悬停前后无黑底↔白底反转(3票:0-3)
- ✗ **★P7.hover.read_the_teams_chapter** 悬停「Read the Teams Chapter」黑条时由黑底白字反转为白底黑字。 — 悬停前后黑条无黑底→白底反转(3票:0-3)
- ✗ **P7.hover.read_the_craft_chapter** 悬停本页「Read the Craft Chapter」黑条同样黑底→白底反转(与 Teams CTA 同签名反转)。 — 本页 Craft 黑条悬停前后无黑白反转(3票:0-3)
- ✗ **★P8.hscroll.video_cards** 招牌视频卡横滑:底部整排黑白视频/人像卡随横向滑动明显左移、换出后续卡片(真实横向位移浏览)。 — 帧间底排视频卡未见明显横向位移换卡,横滑浏览没复现(3票:0-3)
- ✗ **P8.hover.read_the_teams_chapter** 悬停本页上部「Read the Teams Chapter」黑条同样黑底→白底反转(与 page07 同签名反转)。 — 悬停前后黑条无黑底→白底反转(3票:0-3)
- ✗ **★P9.hover.case_card_stripe** 招牌案例卡悬停展开:悬停某张案例卡(如 Stripe)时它手风琴式展开,露出隐藏的问题文字(如「How do you b — 悬停前后卡片没有手风琴展开、隐藏的问题文字没露出(3票:0-3)
- ✗ **★P9.hover.get_notified** 悬停案例卡上的「Get notified」区域触发同一张卡展开、显出隐藏问题文字与 Get notified 按钮(手风 — 悬停 Get notified 前后卡片未展开、隐藏问题文字未出(3票:0-3)
- ✗ **P9.hover.cards_container** 悬停三卡容器时三卡文字由淡显略变实(整体对比略增),变化较弱但可辨。 — 帧间三卡文字浓淡无可辨变化(3票:0-3)
- ✗ **P10.hover.get_notified_when** 悬停「Get notified when they're released」下划线链接时它变成黑色填充条、文字反白(细微 — 悬停前后下划线链接未变成黑色填充反白条(3票:0-3)

### kimi_k3
- ✗ **★P0.hover.scroll_to_read** 悬停「Scroll to read」时它从普通细字变成一整条橙色填充胶囊、文字反白。 — 悬停 on 态仅给「Scroll to read」加下划线，未变橙色填充胶囊、文字未反白，招牌反转缺（3票:0-3）。
- ✗ **★P1.hscroll.stats** 招牌横滑数字揭示:横向滑动时右侧数字从 0 一路滚动递增到 370 → 732+ → 900+(配文「Designers — 复刻未采到该触发帧带（同协议录像下无此横滑数字揭示轨）。
- ✗ **★P1.hover.nav_about** 悬停顶栏「About」导航链接时它变成紫色胶囊高亮。 — 复刻未采到该触发帧带（同协议录像下无此 About 悬停靶）。
- ✗ **★P1.hover.nav_case_studies** 悬停顶栏「Case Studies」导航链接时它变成紫色胶囊高亮。 — 复刻未采到该触发帧带（同协议录像下无此 Case Studies 悬停靶）。
- ✗ **★P4.enter.chapter_number** 章节封面招牌大编号进场:左下巨号先出「01」再补成「01 / Tools」逐帧成型;上半黑底引语卡「AI is spar — 该页只出黑底引语卡「AI is sparking a creative renaissance…」，招牌巨号 01→01/Tools 逐帧成型与橙色「The great toolstack shakeup」章节条均缺（3票:0-3）。
- ✗ **★P5.hover.read_the_tools_chapter** 招牌 CTA 反转:悬停「Read the Tools Chapter」黑条时整块由黑底白字反转为白底黑字,右箭头随之变 — 复刻未采到该触发帧带（同协议录像下无此 CTA 反转靶）。
- ✗ **★P5.hover.read_the_craft_chapter** 悬停「Read the Craft Chapter」黑条时同样由黑底白字反转为白底黑字。 — 复刻未采到该触发帧带（同协议录像下无此 CTA 反转靶）。
- ✗ **★P7.enter.teams_identity** Teams 章节身份:绿灰版面「Teams」大标题 + 右侧说明段 + 下方黑白花卉/清单,底部黑条 CTA「Read  — 该页呈紫色数字列表式「03 Teams / Redesigning the design org」，缺原站绿灰版面 Teams 大标题身份与底部黑条 Read the Teams Chapter（3票:1-2）。
- ✗ **★P7.hover.read_the_teams_chapter** 悬停「Read the Teams Chapter」黑条时由黑底白字反转为白底黑字。 — 复刻未采到该触发帧带（同协议录像下无此 CTA 反转靶）。
- ✗ **P7.hover.read_the_craft_chapter** 悬停本页「Read the Craft Chapter」黑条同样黑底→白底反转(与 Teams CTA 同签名反转)。 — 复刻未采到该触发帧带（同协议录像下无此 CTA 反转靶）。
- ✗ **P8.hover.read_the_teams_chapter** 悬停本页上部「Read the Teams Chapter」黑条同样黑底→白底反转(与 page07 同签名反转)。 — off/on 两态黑条「Read the Teams Chapter」始终黑底白字，未反转为白底黑字。
- ✗ **★P9.hover.case_card_stripe** 招牌案例卡悬停展开:悬停某张案例卡(如 Stripe)时它手风琴式展开,露出隐藏的问题文字(如「How do you b — 悬停帧带三卡宽度不变、未见 Stripe 手风琴展开露出隐藏问题文字「How do you build a culture…」，招牌卡展开缺（3票:0-3）。
- ✗ **★P9.hover.get_notified** 悬停案例卡上的「Get notified」区域触发同一张卡展开、显出隐藏问题文字与 Get notified 按钮(手风 — 同上帧带无卡展开，Get notified 触发未显出隐藏问题文字与展开态（3票:0-3）。
- ✗ **P9.hover.cards_container** 悬停三卡容器时三卡文字由淡显略变实(整体对比略增),变化较弱但可辨。 — 悬停容器帧带三卡文字对比无可辨变化，拿不准存疑（3票:1-2）。
- ✗ **P10.hover.get_notified_when** 悬停「Get notified when they're released」下划线链接时它变成黑色填充条、文字反白(细微 — on 态链接仍为下划线+箭头，未变黑色填充条、文字未反白，效果缺。

### fable_5
- ✗ **★P0.load** 首访打开页面有一段进场:纯白起,顶部先铺开一块流动的抽象彩色色场(橙/粉/紫/绿混色),随后黑色大标题「AI in De — 原站白起→彩色色场铺开→黑标题落位到左下的分段进场，复刻里大标题从头到尾一直在，没有那段先色场后标题落位的过程（3票:1-2）
- ✗ **★P0.hover.scroll_to_read** 悬停「Scroll to read」时它从普通细字变成一整条橙色填充胶囊、文字反白。 — 原站悬停 Scroll to read 变整条橙色胶囊反白，复刻 off/on 两帧都是普通细字，没变橙胶囊（3票:0-3）
- ✗ **★P1.hscroll.stats** 招牌横滑数字揭示:横向滑动时右侧数字从 0 一路滚动递增到 370 → 732+ → 900+(配文「Designers — 原站横滑时右侧数字 0→370→732+→900+ 递增且紫面板推入，复刻横滑帧带里数字和紫面板全程没出现（3票:0-3）
- ✗ **★P1.hover.nav_about** 悬停顶栏「About」导航链接时它变成紫色胶囊高亮。 — 复刻未采到该触发帧带（同协议录像下无此效果/靶/轨）
- ✗ **★P1.hover.nav_case_studies** 悬停顶栏「Case Studies」导航链接时它变成紫色胶囊高亮。 — 复刻未采到该触发帧带（同协议录像下无此效果/靶/轨）
- ✗ **★P5.hover.read_the_tools_chapter** 招牌 CTA 反转:悬停「Read the Tools Chapter」黑条时整块由黑底白字反转为白底黑字,右箭头随之变 — 原站悬停该黑条整块反转为白底黑字，复刻 off/on 两帧黑条颜色没变（3票:0-3）
- ✗ **★P5.hover.read_the_craft_chapter** 悬停「Read the Craft Chapter」黑条时同样由黑底白字反转为白底黑字。 — 原站悬停 Craft 黑条反转为白底黑字，复刻 off/on 帧带黑条没出现白底反转（3票:0-3）
- ✗ **★P7.enter.teams_identity** Teams 章节身份:绿灰版面「Teams」大标题 + 右侧说明段 + 下方黑白花卉/清单,底部黑条 CTA「Read  — 原站是绿灰版面 Teams 大标题带说明段和底部 Read the Teams Chapter 黑条 CTA，复刻这页是紫色 02 Craft / 03 Teams 编号封面，没绿灰身份也没那条 CTA（3票:1-2）
- ✗ **★P7.hover.read_the_teams_chapter** 悬停「Read the Teams Chapter」黑条时由黑底白字反转为白底黑字。 — 复刻未采到该触发帧带（同协议录像下无此效果/靶/轨）
- ✗ **P7.hover.read_the_craft_chapter** 悬停本页「Read the Craft Chapter」黑条同样黑底→白底反转(与 Teams CTA 同签名反转)。 — 复刻未采到该触发帧带（同协议录像下无此效果/靶/轨）
- ✗ **P8.hover.read_the_teams_chapter** 悬停本页上部「Read the Teams Chapter」黑条同样黑底→白底反转(与 page07 同签名反转)。 — 原站悬停该黑条反转白底，复刻 off/on 两帧黑条都是黑底没反转
- ✗ **★P9.hover.case_card_stripe** 招牌案例卡悬停展开:悬停某张案例卡(如 Stripe)时它手风琴式展开,露出隐藏的问题文字(如「How do you b — 原站悬停 Stripe 卡手风琴展开露出隐藏问题文字、别卡收窄，复刻三卡问题文字 off/on 全程都摊开着，没有展开收拢动作（3票:0-3）
- ✗ **★P9.hover.get_notified** 悬停案例卡上的「Get notified」区域触发同一张卡展开、显出隐藏问题文字与 Get notified 按钮(手风 — 原站悬停 Get notified 触发卡展开显出隐藏问题，复刻 off/on 两帧卡片内容一样、无手风琴展开（3票:0-3）
- ✗ **P9.hover.cards_container** 悬停三卡容器时三卡文字由淡显略变实(整体对比略增),变化较弱但可辨。 — 原站悬停三卡容器文字由淡显略变实，复刻文字全程都是实的、off/on 无对比变化
- ✗ **P10.hover.get_notified_when** 悬停「Get notified when they're released」下划线链接时它变成黑色填充条、文字反白(细微 — 原站悬停该下划线链接变黑色填充条反白，复刻 off/on 两帧都是普通下划线加箭头没变黑条
- ✗ **★P11.enter.footer_stats** 页尾招牌统计数字递增:黑底页尾「This report draws from」三列数字进场时逐步累加到终值(345→…→ — 原站页尾三列数字 345→…→906 等逐步累加进场，复刻帧带里 906/25+/50+ 全程静止没有递增过程（3票:1-2）
- ✗ **★P11.hover.submit** 页尾表单招牌:悬停「Submit」按钮时它由橙色态变成紫色填充。 — 原站悬停 Submit 由橙色变紫色填充，复刻 off/on 两帧 Submit 都是橙色没变紫（3票:0-3）

### gpt56_high
- ✗ **★P0.load** 首访打开页面有一段进场:纯白起,顶部先铺开一块流动的抽象彩色色场(橙/粉/紫/绿混色),随后黑色大标题「AI in De — 复刻背景色场有轻微流变,但黑标题「AI in Design Report 2026」全程已在、无落位过程,色场偏灰非橙粉紫绿混色,末帧也无 Scroll to read 揭示,进场签名不像(3票:2-1)
- ✗ **★P0.hover.scroll_to_read** 悬停「Scroll to read」时它从普通细字变成一整条橙色填充胶囊、文字反白。 — off/on 两帧 Scroll to read 均为普通细字,未变整条橙色填充胶囊、无文字反白,悬停效果缺失(3票:3-0)
- ✗ **★P1.hscroll.stats** 招牌横滑数字揭示:横向滑动时右侧数字从 0 一路滚动递增到 370 → 732+ → 900+(配文「Designers — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)
- ✗ **★P1.hover.nav_about** 悬停顶栏「About」导航链接时它变成紫色胶囊高亮。 — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)
- ✗ **★P1.hover.nav_case_studies** 悬停顶栏「Case Studies」导航链接时它变成紫色胶囊高亮。 — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)
- ✗ **★P4.enter.chapter_number** 章节封面招牌大编号进场:左下巨号先出「01」再补成「01 / Tools」逐帧成型;上半黑底引语卡「AI is spar — 黑底引语卡 AI is sparking a creative renaissance… 在,但左下巨号「01」→「01 / Tools」逐帧成型的招牌大编号缺失(3票:2-1)
- ✗ **★P5.hover.read_the_tools_chapter** 招牌 CTA 反转:悬停「Read the Tools Chapter」黑条时整块由黑底白字反转为白底黑字,右箭头随之变 — off/on 两帧 Read the Tools Chapter 黑条均黑底白字,未反转为白底黑字,悬停反转缺失(3票:3-0)
- ✗ **★P5.hover.read_the_craft_chapter** 悬停「Read the Craft Chapter」黑条时同样由黑底白字反转为白底黑字。 — off/on 两帧 Read the Craft Chapter 黑条均无反转,悬停反转缺失(3票:3-0)
- ✗ **★P7.hover.read_the_teams_chapter** 悬停「Read the Teams Chapter」黑条时由黑底白字反转为白底黑字。 — off/on 两帧 Read the Teams Chapter 黑条均黑底白字,未反转为白底黑字,悬停反转缺失(3票:3-0)
- ✗ **P7.hover.read_the_craft_chapter** 悬停本页「Read the Craft Chapter」黑条同样黑底→白底反转(与 Teams CTA 同签名反转)。 — off/on 本页 Read the Craft Chapter 黑条无黑底→白底反转,缺失
- ✗ **P8.hover.read_the_teams_chapter** 悬停本页上部「Read the Teams Chapter」黑条同样黑底→白底反转(与 page07 同签名反转)。 — off/on 本页 Read the Teams Chapter 黑条均无黑底→白底反转,缺失
- ✗ **★P9.hover.case_card_stripe** 招牌案例卡悬停展开:悬停某张案例卡(如 Stripe)时它手风琴式展开,露出隐藏的问题文字(如「How do you b — 悬停帧带里三卡保持原样,未见手风琴展开露出「How do you build a culture…」隐藏问题文字、其余卡不收窄,展开效果缺失(3票:2-1)
- ✗ **★P9.hover.get_notified** 悬停案例卡上的「Get notified」区域触发同一张卡展开、显出隐藏问题文字与 Get notified 按钮(手风 — 悬停 Get notified 区域未触发卡片手风琴展开、无隐藏问题文字显出,三卡静止,缺失(3票:2-1)
- ✗ **P9.hover.cards_container** 悬停三卡容器时三卡文字由淡显略变实(整体对比略增),变化较弱但可辨。 — 悬停三卡容器帧带里文字对比无可辨变化,弱化显现效果未复刻
- ✗ **P10.hover.get_notified_when** 悬停「Get notified when they're released」下划线链接时它变成黑色填充条、文字反白(细微 — off/on 下划线链接均未变黑色填充条+反白,悬停效果缺失
- ✗ **★P11.enter.footer_stats** 页尾招牌统计数字递增:黑底页尾「This report draws from」三列数字进场时逐步累加到终值(345→…→ — 黑底页尾三列数字全程停在 906 / 25+ / 50+,无 345→…→906 逐步累加,招牌数字递增缺失(表单与超大 Ai in Design 字在)(3票:2-1)
- ✗ **★P11.hover.submit** 页尾表单招牌:悬停「Submit」按钮时它由橙色态变成紫色填充。 — off/on Submit 按钮均为橙色态,未变紫色填充,悬停效果缺失(3票:3-0)

### qwen37max
- ✗ **★P0.load** 首访打开页面有一段进场:纯白起,顶部先铺开一块流动的抽象彩色色场(橙/粉/紫/绿混色),随后黑色大标题「AI in De — 复刻末半自首帧起「AI in Design Report 2026」即静态铺满,无纯白起→顶部流动彩色色场→黑标题落位的分帧进场。(3票:0-3)
- ✗ **★P0.reenter.sticky_nav** 招牌 sticky 顶栏:向下滚动时顶栏隐藏,向上滚动时顶栏重新出现,露出「AiD 26 / Read the Repo — 上滚帧带只见「AiD 26」字标,未出现 Read the Report/About/Case Studies 顶栏与那条橙色高亮的隐藏/恢复。(3票:0-3)
- ✗ **★P0.hover.scroll_to_read** 悬停「Scroll to read」时它从普通细字变成一整条橙色填充胶囊、文字反白。 — off/on 两态「Scroll to read」都是细字+下箭头,毫无变橙色填充胶囊、文字反白。(3票:0-3)
- ✗ **★P1.hscroll.stats** 招牌横滑数字揭示:横向滑动时右侧数字从 0 一路滚动递增到 370 → 732+ → 900+(配文「Designers — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)。(3票:0-3)
- ✗ **★P1.hover.nav_about** 悬停顶栏「About」导航链接时它变成紫色胶囊高亮。 — 复刻该 hover 采到的是卡片帧,About 导航链接未见变紫色胶囊高亮,存疑判否。(3票:0-3)
- ✗ **★P1.hover.nav_case_studies** 悬停顶栏「Case Studies」导航链接时它变成紫色胶囊高亮。 — 同上,Case Studies 导航未见紫色胶囊高亮,off/on 无可辨差异。(3票:0-3)
- ✗ **P1.reenter.sticky_nav** 在引言页上滚同样露出 sticky 顶栏(橙色「Read the Report」高亮),回滚后引言与照片恢复——与全局  — 上滚帧带无橙色「Read the Report」sticky 顶栏露出/恢复。
- ✗ **P3.enter** 报告主旨文字段进场:居中多段说明文字「AI in Design 2026 aims to capture how AI  — 帧带里未见「AI in Design 2026 aims to capture…」多段说明整体淡入,复刻此处直接是 01 Tools 章节。
- ✗ **★P4.enter.chapter_number** 章节封面招牌大编号进场:左下巨号先出「01」再补成「01 / Tools」逐帧成型;上半黑底引语卡「AI is spar — 无左下巨号「01→01/Tools」逐帧成型,也无黑底引语卡与橙色章节条,复刻是紫粉花卉的另一版面。(3票:0-3)
- ✗ **★P5.enter.tools_orange** 01 Tools 章节正文身份:大面积橙色版面,中部紫色清单块「IN THIS CHAPTER, WE'LL COVER — 无大面积橙色版面、无两个黑条 CTA;复刻是白底「02 Craft」页,章节都错。(3票:0-3)
- ✗ **★P5.hover.read_the_tools_chapter** 招牌 CTA 反转:悬停「Read the Tools Chapter」黑条时整块由黑底白字反转为白底黑字,右箭头随之变 — 复刻无「Read the Tools Chapter」黑条,off/on 同为白底 Craft 页的橙字链接,无黑↔白反转。(3票:0-3)
- ✗ **★P5.hover.read_the_craft_chapter** 悬停「Read the Craft Chapter」黑条时同样由黑底白字反转为白底黑字。 — off/on 两态一致,仅一个橙色文字链接,无黑底白字→白底黑字反转。(3票:0-3)
- ✗ **★P6.enter.chapter_number** 章节封面招牌大编号进场:整幅紫色版面铺入,左侧大编号「02 / Craft」+ 右上标题「Craft in the ag — 复刻帧带为纯白空屏只剩 AiD 26 字标,完全无紫色版面与「02/Craft」大编号进场。(3票:0-3)
- ✗ **★P7.hover.read_the_teams_chapter** 悬停「Read the Teams Chapter」黑条时由黑底白字反转为白底黑字。 — off/on 皆白底「Read the Teams Chapter」橙字链接,无黑条反转。(3票:0-3)
- ✗ **P7.hover.read_the_craft_chapter** 悬停本页「Read the Craft Chapter」黑条同样黑底→白底反转(与 Teams CTA 同签名反转)。 — 同页 off/on 无黑底→白底反转,仅静态橙字链接。
- ✗ **★P8.hscroll.video_cards** 招牌视频卡横滑:底部整排黑白视频/人像卡随横向滑动明显左移、换出后续卡片(真实横向位移浏览)。 — 复刻未采到该触发帧带(同协议录像下无此效果/靶/轨)。(3票:0-3)
- ✗ **P8.hover.read_the_teams_chapter** 悬停本页上部「Read the Teams Chapter」黑条同样黑底→白底反转(与 page07 同签名反转)。 — 帧带缩略无法确认黑条反转,且复刻该 CTA 为橙字链接非黑条,存疑判否。
- ✗ **★P9.hover.case_card_stripe** 招牌案例卡悬停展开:悬停某张案例卡(如 Stripe)时它手风琴式展开,露出隐藏的问题文字(如「How do you b — 复刻卡片问题文字(How do you build a culture…)在 enter 就静态常显,无悬停手风琴展开、其余卡收窄的过程。(3票:0-3)
- ✗ **★P9.hover.get_notified** 悬停案例卡上的「Get notified」区域触发同一张卡展开、显出隐藏问题文字与 Get notified 按钮(手风 — off/on 皆为问题文字已全露的静态卡格,无 Get notified 触发的手风琴展开。(3票:0-3)
- ✗ **P9.hover.cards_container** 悬停三卡容器时三卡文字由淡显略变实(整体对比略增),变化较弱但可辨。 — 悬停三卡容器 off/on 无对比略增的可辨变化,两态一致。
- ✗ **P10.hover.get_notified_when** 悬停「Get notified when they're released」下划线链接时它变成黑色填充条、文字反白(细微 — off/on 皆橙字下划线链接,无变黑色填充条、文字反白。
- ✗ **★P11.hover.submit** 页尾表单招牌:悬停「Submit」按钮时它由橙色态变成紫色填充。 — Submit 按钮 off/on 皆深灰态,未见橙色→紫色填充的变化。(3票:0-3)
