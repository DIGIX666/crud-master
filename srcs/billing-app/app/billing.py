import psycopg2
import pika
import json
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request

load_dotenv()

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST'),
        database=os.getenv('DB_BILLING'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD')
    )
    return conn

# Function to process messages from RabbitMQ
def process_billing_message(ch, method, properties, body):
    message = json.loads(body)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO billing (user_id, number_of_items, total_amount) VALUES (%s, %s, %s)', 
                (message['user_id'], message['number_of_items'], message['total_amount']))
    conn.commit()
    cur.close()
    conn.close()
    ch.basic_ack(delivery_tag=method.delivery_tag)

def setup_rabbitmq():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='billing_queue', durable=True)
    channel.basic_consume(queue='billing_queue', on_message_callback=process_billing_message)
    print('Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

@app.route('/billing', methods=['POST'])
def add_billing():
    data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO billing (user_id, number_of_items, total_amount) VALUES (%s, %s, %s) RETURNING id', 
                (data['user_id'], data['number_of_items'], data['total_amount']))
    billing_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'status': 'Billing added', 'billing_id': billing_id}), 201

if __name__ == '__main__':
    app.run(port=5001)
