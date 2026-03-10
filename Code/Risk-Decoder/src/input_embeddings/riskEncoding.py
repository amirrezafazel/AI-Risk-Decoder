from sentence_transformers import SentenceTransformer
import json

def construct_embeddings(data):
     model = SentenceTransformer('./embeddingsModel')
     return model.encode(data)
 
with open(r"C:\Users\marap\source\repos\AI-Risk-Decoder\Data\database.json") as f:
    data = json.load(f)

for product in data.values():
    if "risks" in product:
        descriptions = [risk["description"] for risk in product["risks"]]
        embeddings = construct_embeddings(descriptions)

        for risk, embedding in zip(product["risks"], embeddings):
            risk["embedding"] = embedding.tolist()

with open(r"C:\Users\marap\source\repos\AI-Risk-Decoder\Data\database.json", "w") as f:
    json.dump(data, f, indent=2)