#!/usr/bin/env python3
"""补拼 hscroll 考卷:复刻的 rail id 与 ref 不同(class 名 vs framer 哈希),
exact-id 匹配漏了复刻自己录到的 page-level hscroll 帧带。
对 P1.hscroll.stats / P8.hscroll.video_cards 两条,用 page 级 glob 兜底:
取复刻 pages/page_XX_hscroll__*.png(有多条时取名字最长者,通常是主轨),
与 ref 对应 hscroll 帧带拼成对照图,写进已有 pairs/<name>/ 目录。
复刻本页无任何 hscroll 帧带 = 真缺失,不补(判定时按 ✗)。
"""
import sys, glob, os
sys.path.insert(0, "webdev/skills/web_repro_judge/scripts")
from compose_pairs import compose, safe_pair_filename
from pathlib import Path

BASE = Path("webdev/artifacts/repro_judge/aidesign_0719")
REF = BASE / "ref" / "pages"
REPROS = ["fable_5","fable5_high","gpt56_high","kimi_k3","opus48","qwen37max"]

# item_id, page, ref_strip, req
ITEMS = [
    ("P1.hscroll.stats", 1, "page_01_hscroll__framer-e5gf5_framer-1irzi_fr.png",
     "横滑露出调研规模数字递增(0→900+)紫色面板推入"),
    ("P8.hscroll.video_cards", 8, "page_08_hscroll__framer-qiwajr.png",
     "底部一排视频卡随横滑左移换出后续卡片"),
]

for name in REPROS:
    rep_pages = BASE / "repros" / name / "pages"
    pdir = BASE / "pairs" / name
    for item_id, page, ref_name, req in ITEMS:
        out_fp = pdir / safe_pair_filename(item_id)
        if out_fp.exists():
            continue  # exact-id already matched
        cands = sorted(glob.glob(str(rep_pages / f"page_{page:02d}_hscroll__*.png")),
                       key=lambda p: len(os.path.basename(p)), reverse=True)
        if not cands:
            print(f"[{name}] {item_id}: 复刻无 page{page:02d} hscroll 帧带(真缺失)")
            continue
        rep_fp = Path(cands[0])
        ref_fp = REF / ref_name
        compose(ref_fp, rep_fp, out_fp, item_id, req, name)
        extra = f" (另有 {len(cands)-1} 条轨未选)" if len(cands) > 1 else ""
        print(f"[{name}] {item_id}: 兜底拼 {rep_fp.name}{extra}")
print("DONE")
