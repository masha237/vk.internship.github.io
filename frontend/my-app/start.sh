#!/bin/bash

rm -r node_modules
rm -r build

npm install
npm build
npm start


