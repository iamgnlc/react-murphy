#!/bin/bash
set -e
export  CI=true

cout(){
    YELLOW="\033[1;33m" # <-- [1 means bold [0 means not bold
    NC="\033[0m" # No Color

    echo "\\n${YELLOW}${1} ${NC}\\n" # <-- bash
}

cout "*** Run typecheck ***"
npm run typecheck
cout "*** Run lint ***"
npm run lint
cout "*** Clean old build ***"
npm run build
cout "*** Deploy ***"
npm run deploy