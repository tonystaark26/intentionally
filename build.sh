#!/bin/sh
# Wraps src/app.html into an installable offline web app in docs/ (served by GitHub Pages)
set -e
cd "$(dirname "$0")"
OUT=docs
mkdir -p $OUT
{
  echo '<!doctype html>'
  echo '<html lang="en"><head>'
  echo '<meta charset="utf-8">'
  echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  echo '<meta name="theme-color" content="#7b1e2c">'
  echo '<link rel="manifest" href="manifest.webmanifest">'
  echo '<link rel="icon" href="icon.svg" type="image/svg+xml">'
  echo '<link rel="apple-touch-icon" href="icon-192.png">'
  echo '<meta name="apple-mobile-web-app-capable" content="yes">'
  echo '<style>[hidden]{display:none!important} body{margin:0} :root{padding-top:env(safe-area-inset-top,0px)}</style>'
  echo '</head><body>'
  cat src/app.html
  echo '</body></html>'
} > $OUT/index.html
cp src/manifest.webmanifest src/sw.js src/icon.svg $OUT/
[ -f src/icon-192.png ] && cp src/icon-*.png $OUT/ || true
VER=$(md5sum $OUT/index.html | cut -c1-8)
sed -i "s/__VERSION__/$VER/" $OUT/sw.js
echo "built $OUT (cache $VER)"
