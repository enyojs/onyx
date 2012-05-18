#!/bin/bash

SOURCE=$(cd `dirname $0`; pwd)

# target location
TARGET=$1

if [ x$TARGET = x ]; then

cat <<EOF
Must supply target folder parameter, e.g.:

  deploy.bat ../deploy/lib/onyx
EOF
else
	cp -r $SOURCE/images $TARGET
	cp -r $SOURCE/*.txt $TARGET
fi
