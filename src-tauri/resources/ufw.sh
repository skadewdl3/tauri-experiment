#!/bin/sh

#####################################################################################
# Uncomplicated Firewall
#
# This script is used to control the uncomplicated firewall
# dependency from the frontend 
#####################################################################################
#
# Arguments
# 1 -> The command to execute
#
#####################################################################################

command="$1"
if [ $command == "probe" ]
then
    sudo ufw status verbose

elif [ $command == "status" ]
then
    sudo ufw status

elif [ $command == "enable" ]
then
    sudo ufw enable

elif [ $command == "disable" ]
then
    sudo ufw disable
fi