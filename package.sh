#!/bin/sh

# If no npm, need install nodejs
which npm &>/dev/null || echo "Must install nodejs first, https://nodejs.org/zh-cn/download/ or using homebrew"

# If no gulp, install it
which gulp &>/dev/null || (echo "Will install gulp first"; npm install --global gulp-cli)

# Install all packages
echo "Update All Node Packages"
npm install

# Get current timestamp
ts=`date +%s`

# Gen Production Package
echo ""
echo "Gen Production Package"
gulp --gulpfile package.js package --time=$ts

# Gen Test Server Package
echo ""
echo "Gen Test Server Package"
gulp --gulpfile package.js package --time=$ts --test

echo ""
echo "All Finish"
echo ""
