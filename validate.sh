#!/usr/bin/env bash

set -u

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
WIKI_DIR="$ROOT_DIR/wiki"

if [[ ! -d "$WIKI_DIR" ]]; then
  echo "ERROR: wiki directory not found at $WIKI_DIR"
  exit 2
fi

FAILURES=0
INCOMING_TMP=""
CONTENT_TMP=""
GLOSSARY_LC_TMP=""
KEY_TERMS_TMP=""

report_fail() {
  echo "[FAIL] $1"
  FAILURES=$((FAILURES + 1))
}

report_pass() {
  echo "[PASS] $1"
}

is_excluded_front_matter() {
  local base
  base="$(basename "$1")"
  [[ "$base" == "README.md" || "$base" == "_template.md" ]]
}

is_content_file() {
  local base
  base="$(basename "$1")"
  [[ "$base" != "README.md" && "$base" != "_template.md" && "$base" != "_glossary.md" && "$base" != "_reference-table.md" ]]
}

is_excluded_link_checks() {
  local base
  base="$(basename "$1")"
  [[ "$base" == "_template.md" ]]
}

echo "Running PhizMusic wiki validation..."
echo

ALL_MD_FILES=("$WIKI_DIR"/*.md)

if [[ ! -e "${ALL_MD_FILES[0]}" ]]; then
  echo "ERROR: No markdown files found under $WIKI_DIR"
  exit 2
fi

echo "1) Front matter checks"
for f in "${ALL_MD_FILES[@]}"; do
  if is_excluded_front_matter "$f"; then
    continue
  fi

  first_line="$(awk 'NR==1{print; exit}' "$f")"
  if [[ "$first_line" != "---" ]]; then
    report_fail "$(basename "$f"): missing YAML front matter start delimiter"
    continue
  fi

  fm_end_line="$(awk 'NR>1 && $0=="---"{print NR; exit}' "$f")"
  if [[ -z "$fm_end_line" ]]; then
    report_fail "$(basename "$f"): missing YAML front matter end delimiter"
    continue
  fi

  front_matter="$(awk -v end="$fm_end_line" 'NR>1 && NR<end {print}' "$f")"

  if ! printf "%s\n" "$front_matter" | awk '/^title:[[:space:]]*.+/{found=1} END{exit found?0:1}'; then
    report_fail "$(basename "$f"): missing required front matter field 'title'"
  fi
  if ! printf "%s\n" "$front_matter" | awk '/^tier:[[:space:]]*.+/{found=1} END{exit found?0:1}'; then
    report_fail "$(basename "$f"): missing required front matter field 'tier'"
  fi
  if ! printf "%s\n" "$front_matter" | awk '/^scope-boundary:[[:space:]]*.+/{found=1} END{exit found?0:1}'; then
    report_fail "$(basename "$f"): missing required front matter field 'scope-boundary'"
  fi
done
report_pass "Front matter check complete"
echo

echo "2) Cross-reference checks"
INCOMING_TMP="$(mktemp)"
trap 'rm -f "${INCOMING_TMP:-}" "${CONTENT_TMP:-}" "${GLOSSARY_LC_TMP:-}" "${KEY_TERMS_TMP:-}"' EXIT

for f in "${ALL_MD_FILES[@]}"; do
  if is_excluded_link_checks "$f"; then
    continue
  fi
  src_base="$(basename "$f")"
  links="$(awk '
    {
      line=$0
      while (match(line, /\[[^][]+\]\(([^)]+)\)/)) {
        raw=substr(line, RSTART, RLENGTH)
        target=raw
        sub(/^\[[^][]+\]\(/, "", target)
        sub(/\)$/, "", target)
        print target
        line=substr(line, RSTART+RLENGTH)
      }
    }
  ' "$f")"

  while IFS= read -r target; do
    [[ -z "$target" ]] && continue

    if [[ "$target" == http://* || "$target" == https://* || "$target" == mailto:* || "${target:0:1}" == "#" ]]; then
      continue
    fi

    target_no_anchor="${target%%#*}"
    if [[ "$target_no_anchor" != *.md ]]; then
      continue
    fi

    target_base="$(basename "$target_no_anchor")"
    target_path="$WIKI_DIR/$target_base"

    if [[ ! -f "$target_path" ]]; then
      report_fail "$src_base links to missing file: $target"
      continue
    fi

    if [[ "$target_base" != "$src_base" ]]; then
      printf "%s\n" "$target_base" >> "$INCOMING_TMP"
    fi
  done <<< "$links"
done
report_pass "Cross-reference existence check complete"
echo

echo "3) Orphan checks"
for f in "${ALL_MD_FILES[@]}"; do
  base="$(basename "$f")"
  if [[ "$base" == "README.md" ]]; then
    continue
  fi
  if [[ "$base" == "_template.md" ]]; then
    continue
  fi
  if ! awk -v t="$base" '$0==t{found=1; exit} END{exit found?0:1}' "$INCOMING_TMP"; then
    report_fail "$base is orphaned (no incoming links)"
  fi
done
report_pass "Orphan check complete"
echo

echo "4) Simple version checks"
for f in "${ALL_MD_FILES[@]}"; do
  if ! is_content_file "$f"; then
    continue
  fi
  if ! awk '/> 🎯 \*\*Simple version\*\*:/{found=1} END{exit found?0:1}' "$f"; then
    report_fail "$(basename "$f"): missing '> 🎯 **Simple version**:' block"
  fi
done
report_pass "Simple version check complete"
echo

echo "5) Dodeka syllable checks"
for f in "${ALL_MD_FILES[@]}"; do
  if ! is_content_file "$f"; then
    continue
  fi
  if awk '/\bTi\b/{found=1} END{exit found?0:1}' "$f"; then
    report_fail "$(basename "$f"): found forbidden syllable 'Ti' (use 'Si')"
  fi
done
report_pass "Dodeka syllable check complete"
echo

echo "6) Line count checks"
for f in "${ALL_MD_FILES[@]}"; do
  lines="$(awk 'END{print NR}' "$f")"
  if [[ "$lines" -gt 500 ]]; then
    report_fail "$(basename "$f"): exceeds 500 lines ($lines)"
  fi
done
report_pass "Line count check complete"
echo

echo "7) Glossary coverage checks"
GLOSSARY_FILE="$WIKI_DIR/_glossary.md"
if [[ ! -f "$GLOSSARY_FILE" ]]; then
  report_fail "_glossary.md missing; cannot perform glossary coverage"
else
  KEY_TERMS_TMP="$(mktemp)"
  cat <<'EOF' > "$KEY_TERMS_TMP"
ADSR
auditory masking
chromatic step
combination tone
consonance
critical bandwidth
dissonance
fourier analysis
frequency ratio
harmonic series
inharmonic
missing fundamental
phon
prime limit
ratio-set
roughness
step-distance
step-number
step-set
step-subset
timbre
voice-leading
EOF

  CONTENT_TMP="$(mktemp)"
  for f in "${ALL_MD_FILES[@]}"; do
    if is_content_file "$f"; then
      awk '{print tolower($0)}' "$f" >> "$CONTENT_TMP"
    fi
  done

  GLOSSARY_LC_TMP="$(mktemp)"
  awk '{print tolower($0)}' "$GLOSSARY_FILE" > "$GLOSSARY_LC_TMP"

  while IFS= read -r term; do
    [[ -z "$term" ]] && continue
    term_lc="$(printf "%s" "$term" | awk '{print tolower($0)}')"
    if awk -v t="$term_lc" 'index($0,t){found=1; exit} END{exit found?0:1}' "$CONTENT_TMP"; then
      if ! awk -v t="$term_lc" 'index($0,t){found=1; exit} END{exit found?0:1}' "$GLOSSARY_LC_TMP"; then
        report_fail "Glossary missing key used term: '$term'"
      fi
    fi
  done < "$KEY_TERMS_TMP"
fi
report_pass "Glossary coverage check complete"
echo

if [[ "$FAILURES" -eq 0 ]]; then
  echo "Validation complete: 0 failures"
  exit 0
fi

echo "Validation complete: $FAILURES failure(s)"
exit 1
