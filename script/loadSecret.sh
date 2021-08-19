#!/bin/bash

if [ -n "$secretJs" ]; then
cat>content/.vuepress/secret.js<<EOF 
$secretJs
EOF
echo "ok"
else
echo "secretJs not define"
fi