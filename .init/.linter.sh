#!/bin/bash
cd /home/kavia/workspace/code-generation/compshop-online-120497-ac221bb0/computer_shop_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

