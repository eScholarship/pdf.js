#!/usr/bin/env bash

set -e

echo "Installing/updating packages."
#yarn

echo "Building minified worker."
#gulp minified

echo "Copying files."
rm -rf dist
mkdir dist
cp build/version.json dist/
VERSION=`grep 'version' build/version.json | sed 's/[^0-9.]//g'`
cp build/minified/build/pdf.worker.js dist/pdf.worker-$VERSION-min.js
cp build/minified/build/pdf.worker.js.map dist/pdf.worker-$VERSION-min.js.map
cp -r build/minified/web/locale dist/locale

echo "Done. Version: $VERSION"