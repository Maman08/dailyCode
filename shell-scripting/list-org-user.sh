#!/bin/bash

# load the env variables
-f flag checks for the file presense
if [ -f .env ]; then
   source .env
else 
   echo ".env file is not found"
   exit 1
fi      


