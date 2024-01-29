#!/bin/bash
set -e
export  CI=true

cout(){
    YELLOW="\033[1;33m" # <-- [1 means bold [0 means not bold
    NC="\033[0m" # No Color

    echo "\\n${YELLOW}${1} ${NC}\\n" # <-- bash
}

cout "*** Run typecheck ***"
yarn typecheck
cout "*** Run lint ***"
yarn lint
cout "*** Clean old build ***"
yarn build
cout "*** Deploy ***"
yarn deploy