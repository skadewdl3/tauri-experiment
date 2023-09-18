#!/bin/sh

#####################################################################################
# Check Dependencies
#
# This script is used to check if the required dependencies are installed
#####################################################################################
#
# Arguments
# 1 -> The dependency to be checked
#
#####################################################################################

dependency="$1"

if [ $dependency == "ufw" ]
then
    echo "Hello World"
    sudo ufw status
fi