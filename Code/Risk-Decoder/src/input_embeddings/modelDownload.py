from sentence_transformers import SentenceTransformer

# this downloaded + saved the model
model_name = 'all-MiniLM-L6-v2'
model = SentenceTransformer(model_name)
model.save('./embeddingsModel')