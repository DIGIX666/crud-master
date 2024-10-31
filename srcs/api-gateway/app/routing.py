import requests
import pika
import json
from flask import request, jsonify

# Configuration for Inventory API and RabbitMQ
INVENTORY_API_URL = "http://localhost:5000"  # Replace with the actual URL of the Inventory API
RABBITMQ_HOST = "localhost"
QUEUE_NAME = "billing_queue"

def setup_routes(app):
    # Route for forwarding requests to the Inventory API
    @app.route('/api/inventory', methods=['GET', 'POST', 'PUT', 'DELETE'])
    def handle_inventory():
        try:
            # Forward the request to the Inventory API
            method = request.method
            if method == 'GET':
                response = requests.get(f"{INVENTORY_API_URL}/inventory")
            elif method == 'POST':
                response = requests.post(f"{INVENTORY_API_URL}/inventory", json=request.get_json())
            elif method == 'PUT':
                response = requests.put(f"{INVENTORY_API_URL}/inventory", json=request.get_json())
            elif method == 'DELETE':
                response = requests.delete(f"{INVENTORY_API_URL}/inventory", json=request.get_json())
            return jsonify(response.json()), response.status_code
        except requests.exceptions.RequestException as e:
            return jsonify({'error': str(e)}), 500

    # Route for sending billing requests to RabbitMQ
    @app.route('/api/billing', methods=['POST'])
    def handle_billing():
        data = request.get_json()
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_HOST))
            channel = connection.channel()
            channel.queue_declare(queue=QUEUE_NAME, durable=True)

            # Publish the message to the billing queue
            message = json.dumps(data)
            channel.basic_publish(
                exchange='',
                routing_key=QUEUE_NAME,
                body=message,
                properties=pika.BasicProperties(
                    delivery_mode=2,  # Make message persistent
                ))
            connection.close()

            return jsonify({'status': 'Billing request received'}), 200
        except pika.exceptions.AMQPConnectionError as e:
            return jsonify({'error': str(e)}), 500
