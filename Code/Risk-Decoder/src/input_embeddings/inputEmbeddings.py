from sentence_transformers import SentenceTransformer, util
import numpy as np

# calculates + saves embedding of user_input
def calculate_embedding(user_input):
     model = SentenceTransformer('./embeddingsModel')
     np.save('my_embedding.npy', model.encode(user_input))

# takes embeddings and returns best n matching with input embeddings 
def best_match(service_name, record, user_embedding = 0, n = 1):
    if not user_embedding:
        return []
    risks_text = [r["description"] for r in record["risks"]]
    risks_embeddings = [r["embedding"] for r in record["risks"]]
    model = SentenceTransformer('./embeddingsModel')
    input_embedding = np.load('my_embedding.npy')
    hits = util.semantic_search(input_embedding, risks_embeddings, top_k=n)
    return risks_text[hits[0][0]['corpus_id']]
