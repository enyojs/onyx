#!/bin/sh
cd $(dirname $0)
../../../enyo/tools/minify.sh package.js -output ../build/onyx
