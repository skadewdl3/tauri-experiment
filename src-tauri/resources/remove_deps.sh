#!/bin/sh

#####################################################################################
# Uninstall Dependencies
#
# This script is used to uninstall the mentioned dependencies
#####################################################################################
#
# Arguments
# 1 -> The dependency to be checked
#
#####################################################################################

dependency="$1"

if [ $dependency == "ufw" ]
then
    sudo apt-get --assume-yes --purge remove ufw
fi