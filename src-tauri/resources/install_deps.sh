#!/bin/sh

#####################################################################################
# Install Dependencies
#
# This script is used to install the required dependencies
#####################################################################################
#
# Arguments
# 1 -> The dependency to be checked
#
#####################################################################################

dependency="$1"

if [ $dependency == "ufw" ]
then
    sudo apt-get install ufw
fi