#!/bin/bash

if ! which brew &> /dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
fi

if ! which gm &> /dev/null; then
  brew install graphicsmagick
fi

node index.js
