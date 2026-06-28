#!/usr/bin/env bash
# Downloads all JDF WordPress-hosted images into public/images/jdf/
# Run from project root: bash scripts/download-images.sh

DEST="public/images/jdf"
mkdir -p "$DEST"

BASE="https://jumuiyafoundation.org/wp-content/uploads"

# Format: "local-filename|remote-url"
IMAGES=(
  "partners-logo-01.png|$BASE/2020/07/partners-logo-01-free-img.png"
  "partners-logo-02.png|$BASE/2020/07/partners-logo-02-free-img.png"
  "partners-logo-03.png|$BASE/2020/07/partners-logo-003-free-img.png"
  "partners-logo-04.png|$BASE/2020/07/partners-logo-04-free-img.png"
  "partners-logo-05.png|$BASE/2020/07/partners-logo-05-free-img.png"
  "partners-logo-06.png|$BASE/2020/07/partners-logo-06-free-img.png"
  "moisa.jpg|$BASE/2026/02/Moisa.jpg"
  "irene.jpg|$BASE/2026/02/irene.jpg"
  "testimonial-1.jpg|$BASE/2026/02/testimonial-1.jpg"
  "testimonial-4.jpg|$BASE/2026/02/testimonial-4.jpg"
  "testimonial-5.jpg|$BASE/2026/02/testimonial-5.jpg"
  "what-we-do-05.jpg|$BASE/2020/07/what-we-do-05-free-img.jpg"
  "what-we-do-06.jpg|$BASE/2020/07/what-we-do-06-free-img.jpg"
  "what-we-do-07.jpg|$BASE/2020/07/what-we-do-07-free-img.jpg"
  "women-empowerment-01.jpg|$BASE/2021/03/women-empowerment-01.jpg"
)

SUCCESS=0
FAIL=0

for entry in "${IMAGES[@]}"; do
  filename="${entry%%|*}"
  url="${entry##*|}"
  dest="$DEST/$filename"

  # Skip already-valid downloads
  if [ -f "$dest" ] && file "$dest" | grep -qE 'image|PNG|JPEG|GIF|WebP'; then
    printf "  SKIP  %s\n" "$filename"
    SUCCESS=$((SUCCESS + 1))
    continue
  fi

  printf "  GET   %-45s" "$filename"
  if curl -sSL --max-time 20 --retry 3 --retry-delay 2 "$url" -o "$dest" 2>/dev/null; then
    if file "$dest" | grep -qE 'image|PNG|JPEG|GIF|WebP'; then
      printf "✓\n"
      SUCCESS=$((SUCCESS + 1))
    else
      printf "✗  (not an image)\n"
      rm -f "$dest"
      FAIL=$((FAIL + 1))
    fi
  else
    printf "✗  (curl failed)\n"
    FAIL=$((FAIL + 1))
  fi
done

echo ""
echo "Done: $SUCCESS downloaded/skipped, $FAIL failed"
echo "Saved to: $DEST/"
