#!/bin/bash

# Get the PIDs of the Python processes and kill them
pkill -f server.py

# Get the PID of the Node.js process and kill it
pkill -f server.js

echo "All services stopped."
