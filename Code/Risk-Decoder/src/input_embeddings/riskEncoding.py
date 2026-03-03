from sentence_transformers import SentenceTransformer

# test case
database = [
    "How to reset my password",
    "Where can I find my billing statements",
    "Contacting technical support",
    "Changing my profile picture"
]

def construct_embeddings(data):
     model = SentenceTransformer('./embeddingsModel')
     return model.encode(data)

embeddings = construct_embeddings(database)

# TODO go through all risks, encode & add to database