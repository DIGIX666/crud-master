from flask import Flask, jsonify, request
from app import inventory  # Import the inventory module
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)

@app.route('/inventory', methods=['GET'])
def get_inventory():
    return jsonify(inventory.get_all_items()), 200

@app.route('/inventory/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = inventory.get_item(item_id)
    if item:
        return jsonify(item), 200
    return jsonify({'error': 'Item not found'}), 404

@app.route('/inventory', methods=['POST'])
def create_item():
    data = request.get_json()
    new_item = inventory.add_item(data)
    return jsonify(new_item), 201

@app.route('/inventory/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()
    updated_item = inventory.update_item(item_id, data)
    if updated_item:
        return jsonify(updated_item), 200
    return jsonify({'error': 'Item not found'}), 404

@app.route('/inventory/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    success = inventory.delete_item(item_id)
    if success:
        return jsonify({'message': 'Item deleted'}), 204
    return jsonify({'error': 'Item not found'}), 404

if __name__ == '__main__':
    app.run(port=5000)  # Run the server on port 5000
