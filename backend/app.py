from flask import Flask, request, jsonify #frameork web
from sqlalchemy import create_engine, text #interagir com o banco de dados
import os #acessar system 

app = Flask(__name__)

# Database conexão strings
db1_url = os.getenv('DB1_URL')
db2_url = os.getenv('DB2_URL')

# Criação database engines
engine_db1 = create_engine(db1_url)
engine_db2 = create_engine(db2_url)

@app.route('/items/db1', methods=['POST'])
def add_item_db1():
    data = request.json     #recebe dados json da requição 
    item_name = data.get('name')
    with engine_db1.connect() as conn_db1:
        conn_db1.execute(text("INSERT INTO items (name) VALUES (:name)"), {"name": item_name})
    return jsonify({'message': 'Item adicionado no DB1'}), 201

@app.route('/items/db1', methods=['DELETE'])
def delete_item_db1():
    item_name = request.args.get('name')   #parametros URL
    with engine_db1.connect() as conn_db1:
        conn_db1.execute(text("DELETE FROM items WHERE name = :name"), {"name": item_name})
    return jsonify({'message': 'Item removido do DB1'}), 200

@app.route('/items/db1', methods=['GET'])
def list_items_db1():
    with engine_db1.connect() as conn_db1:
        result = conn_db1.execute(text("SELECT name FROM items")).fetchall() #obtem todos os resultados da consulta
    items = [row['name'] for row in result]
    return jsonify({'items': items}), 200

@app.route('/items/db2', methods=['POST'])
def add_item_db2():
    data = request.json
    item_name = data.get('name')
    with engine_db2.connect() as conn_db2:
        conn_db2.execute(text("INSERT INTO items (name) VALUES (:name)"), {"name": item_name})
    return jsonify({'message': 'Item adicionado no DB2'}), 201

@app.route('/items/db2', methods=['DELETE'])
def delete_item_db2():
    item_name = request.args.get('name')
    with engine_db2.connect() as conn_db2:
        conn_db2.execute(text("DELETE FROM items WHERE name = :name"), {"name": item_name})
    return jsonify({'message': 'Item removido do DB2'}), 200

@app.route('/items/db2', methods=['GET'])
def list_items_db2():
    with engine_db2.connect() as conn_db2:
        result = conn_db2.execute(text("SELECT name FROM items")).fetchall()
    items = [row['name'] for row in result]
    return jsonify({'items': items}), 200

@app.route('/compare', methods=['GET'])
def compare():
    item = request.args.get('item')
    with engine_db1.connect() as conn_db1:
        result_db1 = conn_db1.execute(text("SELECT * FROM items WHERE name = :name"), {"name": item}).fetchone() #unico resultado da consulta
    with engine_db2.connect() as conn_db2:
        result_db2 = conn_db2.execute(text("SELECT * FROM items WHERE name = :name"), {"name": item}).fetchone()
    
    return jsonify({ #retorna uma resposta json
        'item': item,
        'in_db1': result_db1 is not None,
        'in_db2': result_db2 is not None
    })

#executando aplicação flask 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
