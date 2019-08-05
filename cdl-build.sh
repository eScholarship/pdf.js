#!/usr/bin/env bash

set -e

echo "Installing/updating packages."
npm install

echo "Building minified worker."
./node_modules/.bin/gulp minified

echo "Copying files."
rm -rf dist
mkdir dist
cp build/version.json dist/
VERSION=`grep 'version' build/version.json | sed 's/[^0-9.]//g'`
cp build/minified/build/pdf.worker.js dist/pdf.worker-$VERSION-min.js
cp build/minified/build/pdf.worker.js.map dist/pdf.worker-$VERSION-min.js.map
cp -r build/minified/web/locale dist/locale
sed 's/images\//\/node_modules\/pdfjs-embed2\/web\/images\//g' build/minified/web/viewer.css > dist/viewer.css

echo "Done. Version: $VERSION"