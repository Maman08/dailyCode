from flask import Flask, jsonify
from pymongo import MongoClient

app=Flask(__name__)

client = MongoClient('mongodb://mongo:27017/')

db = client['mydatabase']

@app.route('/insert')
def insert():
    db.teams.insert_one({'name': 'Team A', 'score': 10})
    return jsonify({'message': 'Data inserted successfully'})


if __name__=='__main__':
    app.run(debug = True , host='0.0.0.0', port=5000)