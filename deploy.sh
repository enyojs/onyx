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
	mkdir $TARGET/images/
	cp -R $SOURCE/images/*.* $TARGET/images/
	cp -R $SOURCE/*.txt $TARGET
fi
