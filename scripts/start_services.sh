#!/bin/bash

# Start the inventory API
cd /vagrant/srcs/inventory-app
nohup python3 server.py &

# Start the billing API
cd /vagrant/srcs/billing-app
nohup python3 server.js &

# Start the API Gateway
cd /vagrant/srcs/api-gateway
nohup node server.js &

echo "All services started."
