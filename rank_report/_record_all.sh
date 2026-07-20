#!/usr/bin/env bash
# 串行录像 6 份复刻(一个接一个,避免资源争抢导致时序失真)。
# 每份:起本地 http.server → record_pages.py --pages 12 --wait-ms 6000 → 停服务。
set -u
ROOT="/Users/carlo/dev/vca_all/pipeline/prompt-pipeline"
SRC="/Users/carlo/dev/fronted_reproduce_aiindesign"
OUT="$ROOT/webdev/artifacts/repro_judge/aidesign_0719/repros"
REC="$ROOT/webdev/skills/web_motion_observe/scripts/record_pages.py"
mkdir -p "$OUT"

# name  dir  port
ROWS=(
  "fable_5|fable-5-2026-07-16|8910"
  "fable5_high|fable5-high-2026-07-18|8911"
  "gpt56_high|gpt56-high-2026-07-16|8912"
  "kimi_k3|kimi-k3-high-2026-07-18|8913"
  "opus48|opus48-high-2026-07-17|8914"
  "qwen37max|qwen37max-high-2026-07-18|8915"
)

for row in "${ROWS[@]}"; do
  IFS='|' read -r name dir port <<< "$row"
  echo "REC_START name=$name dir=$dir port=$port"
  ( cd "$SRC/$dir" && python3 -m http.server "$port" >/dev/null 2>&1 ) &
  srv=$!
  sleep 2
  python3 "$REC" \
    --url "http://localhost:$port/" \
    --out "$OUT/$name" \
    --pages 12 --wait-ms 6000 \
    > "$OUT/${name}.reclog" 2>&1
  rc=$?
  kill "$srv" 2>/dev/null
  wait "$srv" 2>/dev/null
  pv=$(python3 -c "import json,sys; print(json.load(open('$OUT/$name/capture_manifest.json'))['protocol_version'])" 2>/dev/null || echo "NO_MANIFEST")
  echo "REC_DONE name=$name rc=$rc protocol=$pv"
done
echo "ALL_RECORDING_DONE"
