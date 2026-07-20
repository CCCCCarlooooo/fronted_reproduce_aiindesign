# COVERAGE_AUDIT — aidesign_0719 · web_repro_judge 出题定标

- 站点:stateofaidesign.com (AI in Design Report 2026)
- 协议:web_motion_observe / web_repro_judge 1.2.0 · n_pages=12 · viewport 1440×900 · wait_ms=6000
- 证据:70 帧带(逐张看过)+ MOTION_OBS_ZH.md + capture_manifest.json
- CHECKLIST:同目录 CHECKLIST.json,共 30 条(core 23)

## A. 招牌动效 10 条覆盖表(对照 MOTION_OBS 末尾「招牌速览」)

| # | 招牌动效 | 映射条目 | 覆盖 |
|---|---|---|---|
| 1 | load 首屏进场(白→彩色色场 morph + 大标题落位) | P0.load | ✅ |
| 2 | 横滑数字递增(page01,0→370→732+→900+ + 紫面板推入) | P1.hscroll.stats | ✅ |
| 3 | 统计数字递增(page02 7+→25+;page11 345→906 等) | P2.enter.stats / P11.enter.footer_stats | ✅ |
| 4 | 章节大编号进场(page04「01」/ page06「02」) | P4.enter.chapter_number / P6.enter.chapter_number | ✅ |
| 5 | 章节 CTA 黑↔白反转(page05 / page07 / page08) | P5.hover.read_the_tools_chapter、P5.hover.read_the_craft_chapter、P7.hover.read_the_teams_chapter、P7.hover.read_the_craft_chapter、P8.hover.read_the_teams_chapter | ✅ |
| 6 | 视频卡横滑(page08) | P8.hscroll.video_cards | ✅ |
| 7 | 案例卡悬停展开(page09) | P9.hover.case_card_stripe、P9.hover.get_notified | ✅ |
| 8 | sticky 顶栏隐藏/恢复(reenter) | P0.reenter.sticky_nav(核心)、P1.reenter.sticky_nav | ✅ |
| 9 | 导航链接悬停变紫胶囊(page01 About / Case Studies) | P1.hover.nav_about、P1.hover.nav_case_studies | ✅ |
| 10 | 页尾 Submit 悬停变紫填充(page11) | P11.hover.submit | ✅ |

**招牌 10 条:全覆盖。**

## B. 每页每触发核对(有证据是否已出题)

| 页 | enter | idle | reenter | hover(靶) | hscroll |
|---|---|---|---|---|---|
| 00 | ✅ P0.enter | 略(idle≈静止,color 带微 morph,语义近不动,不单出) | ✅ P0.reenter.sticky_nav | ✅ scroll_to_read | 无 rail |
| 01 | ✅ P1.enter | 略(idle act=0) | ✅ P1.reenter.sticky_nav | ✅ about ✅ case_studies;略 read_the_report(act≈0 无变化)、other 容器(act≈0) | ✅ framer-e5gf5_framer-1irzi_fr |
| 02 | ✅ P2.enter.stats | 略(act=0) | 略(reenter 仅回滚恢复,无新招牌;statsは enter 已出) | 无靶 | 无 rail |
| 03 | ✅ P3.enter | 略(act=0) | 略(仅衔接恢复) | 无靶 | 无 rail |
| 04 | ✅ P4.enter.chapter_number | 略(act=0) | 略(仅衔接恢复) | 无靶 | 无 rail |
| 05 | ✅ P5.enter.tools_orange | 略(act≈0.03) | 略(仅衔接恢复) | ✅ tools ✅ craft;_2 实例同签名不单出 | 无 rail |
| 06 | ✅ P6.enter.chapter_number | 略(act=0) | 略(仅衔接恢复) | 无靶 | 无 rail |
| 07 | ✅ P7.enter.teams_identity | 略(act≈0.05) | 略(仅衔接恢复) | ✅ teams ✅ craft;_2 实例同签名不单出 | 无 rail(在 page08 视口才驱动) |
| 08 | ✅ P8.enter.cases_intro | 略(act≈0.05) | 略(仅衔接恢复) | ✅ teams;_2 同签名不单出 | ✅ framer-qiwajr |
| 09 | ✅ P9.enter.case_cards | 略(act=0) | 略(仅衔接恢复) | ✅ card_2wo5y3 ✅ get_notified ✅ hk9z8i-container;get_notified _2/_3 同签名不单出 | 无 rail(manifest 为 dup:page08,已在 p08 采,不出) |
| 10 | ✅ P10.enter | 略(act=0) | 略(仅衔接恢复) | ✅ get_notified_when | 无 rail |
| 11 | ✅ P11.enter.footer_stats | 略(act=0) | 略(仅衔接恢复) | ✅ submit;略 input 输入框(act≈0.0004 无本体变化) | 无 rail |

## C. 「有证据但未出题」清单

**清单为空。** 所有高 activity 触发、所有 hover targets、所有非空 rails 均已覆盖或按下列诚实理由略过。

## D. 诚实略过项(有 activity 或有靶但无可辨语义效果 / 同签名重复)

无可辨效果(帧带 off→on 无变化,不出题):
- page01 `cta_read_the_report_read_the_rep`:顶栏「Read the Report」按钮 off→on act≈0,无悬停反馈。
- page01 `other_framer-1lc5sim_framer-1t2pd8`:非语义容器靶 act≈0.0003,无变化。
- page11 `input_framer-form-input_framer-for`:邮件输入框 off→on 本体无变化,仅右下角点阵图案极微像素差(act≈0.0004),语义不明。

同签名重复实例靶(选代表靶,note 已说明,不逐个出):
- page05 `cta_read_the_tools_chapter_2` / `cta_read_the_craft_chapter_2` = 与主靶同为黑↔白反转。
- page07 `cta_read_the_teams_chapter_2` / `cta_read_the_craft_chapter_2` = 同上。
- page08 `cta_read_the_teams_chapter_2` = 同上。
- page09 `cta_get_notified_2` / `cta_get_notified_3` = 与 `cta_get_notified` 同为悬停卡手风琴展开(帧里各自展开 Sierra / Anthropic 卡)。

idle:全站基本静止(除 page00 顶部色带极轻微 morph),无自播视频/循环动画在 idle 触发下可辨,故不单出 idle 题。
reenter:除全局 sticky 顶栏(已出 P0/P1)外,其余页 reenter 仅为上滚衔接上页 + 回滚恢复本页,无独立新招牌,不重复出题。

## E. 冻结判定

- 招牌 10 条:全覆盖 ✅
- 「有证据未出题」清单:空 ✅
- 每条 hover(12)/hscroll(2)的 target.id / rail.id 均用脚本核对命中 ref/pages 帧带文件:15/15 命中,0 miss ✅
- CHECKLIST.json:合法 JSON,30 条(core 23)✅

**可冻结。**
