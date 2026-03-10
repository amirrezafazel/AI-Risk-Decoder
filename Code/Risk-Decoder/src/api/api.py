from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
import numpy as np

app = FastAPI()

model = SentenceTransformer('./embeddingsModel')

class Query(BaseModel):
    text: str
    n: int = 1


# example placeholders
risks_text = ["risk example 1", "risk example 2"]
risks_embeddings = model.encode(risks_text)


@app.post("/best_match")
def best_match(query: Query):

    input_embedding = model.encode(query.text)

    hits = util.semantic_search(input_embedding, risks_embeddings, top_k=query.n)

    best = risks_text[hits[0][0]['corpus_id']]

    return {"result": best}

# To run the API, use the command: 
# uvicorn api:app --reload