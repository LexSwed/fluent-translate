#!/bin/bash
cd packages/extension

sed -ie 's|\(.*"version"\): "\(.*\)",.*|\1: '"\"$1\",|" package.json
sed -ie 's|\(.*"version"\): "\(.*\)",.*|\1: '"\"$1\",|" dist/manifest.json

zip -r EdgeTranslate.zip dist