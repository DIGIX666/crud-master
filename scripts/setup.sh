#!/bin/bash

# Update package lists
sudo apt-get update

# Install necessary packages
sudo apt-get install -y python3-pip postgresql postgresql-contrib rabbitmq-server

sudo -u postgres psql -c "CREATE USER apiuser WITH PASSWORD 'crud-master';"
sudo -u postgres psql -c "CREATE DATABASE movies_db OWNER apiuser;"
sudo -u postgres psql -c "CREATE DATABASE billing_db OWNER apiuser;"

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

pip3 install flask psycopg2-binary
# Install PM2 globally
npm install pm2 -g

# Install Python dependencies for each application
cd /vagrant/srcs/inventory-app
pip3 install -r requirements.txt

cd /vagrant/srcs/billing-app
pip3 install -r requirements.txt

# Install Node.js dependencies for API Gateway
cd /vagrant/srcs/api-gateway
npm install

# Start RabbitMQ service
sudo systemctl start rabbitmq-server

# Enable RabbitMQ to start on boot
sudo systemctl enable rabbitmq-server

echo "Setup complete."


##### login to pqsl as user 'apiuser'
# psql -U apiuser -d movies_db -h localhost -W
