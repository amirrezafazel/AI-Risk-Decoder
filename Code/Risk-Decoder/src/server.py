from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer, util
import numpy as np
import os

app = Flask(__name__)
CORS(app)


# Load model once at startup (not per-request!)
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'embeddingsModel')
model = SentenceTransformer(MODEL_PATH)

state = {
    "user_embedding": None
}

@app.route('/calculate_embedding', methods=['POST'])
def calculate_embedding():
    user_input = request.json.get('user_input')
    state["user_embedding"] = model.encode(user_input)
    return jsonify({"status": "ok"})

@app.route('/best_match', methods=['POST'])
def best_match():
    if state["user_embedding"] is None:
        return jsonify({"error": "No embedding calculated yet"}), 400
    data = request.json
    record = data.get('record')
    n = data.get('n', 1)
    
    risks_text = [r["description"] for r in record["risks"]]
    risks_embeddings = [np.array(r["embedding"]) for r in record["risks"]]
    
    user_emb = np.array(state["user_embedding"])
    similarities = [np.dot(user_emb, r) / (np.linalg.norm(user_emb) * np.linalg.norm(r)) for r in risks_embeddings]
    best_idx = np.argmax(similarities)
    return jsonify({"result": risks_text[best_idx]})

if __name__ == '__main__':
    app.run(port=5000)
