from sentence_transformers import SentenceTransformer
import os

# this downloaded + saved the model
save_path = os.path.abspath('./embeddingsModel')
print("Saving to:", save_path)
save_path = os.path.abspath('./embeddingsModel')
print("Files saved:", os.listdir(save_path))
model_name = 'all-MiniLM-L6-v2'
model = SentenceTransformer(model_name)
model.save('./embeddingsModel')
