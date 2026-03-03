from sentence_transformers import SentenceTransformer, util
import numpy as np

# calculates + saves embedding of user_input
def calculate_embedding(user_input):
     model = SentenceTransformer('./embeddingsModel')
     np.save('my_embedding.npy', model.encode(user_input))

# takes embeddings and returns best n matching with input embeddings 
def best_match(databaseID, n = 1):
    risks_text = ...                 # TODO when database is populated
    risks_embeddings = ...           # TODO when database is populated
    model = SentenceTransformer('./embeddingsModel')
    input_embedding = np.load('my_embedding.npy')
    hits = util.semantic_search(input_embedding, risks_embeddings, top_k=n)
    return risks_text[hits[0][0]['corpus_id']]
