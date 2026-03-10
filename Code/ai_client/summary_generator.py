import json
from pathlib import Path
from Code.ai_client.open_ai_client import ai_query



def generate_risk_summary(documents: dict) -> dict:
    coallessed_documents = [f"{title}: {content['content']}" for title, content in documents.items()]
    prompt = "\n".join(coallessed_documents)
    risk_summary = ai_query(prompt)
    return risk_summary


if __name__ == "__main__":
    DATABASE_PATH = Path("Data/database.json")

    with open(DATABASE_PATH, "r", encoding='utf-8') as f:
        data: dict = json.load(f)

    for company in data:
        documents = data[company]["documents"]
        # "risks" not in data[company] and
        if data[company]["id"] < 10:
            print(f"Generating risk summary for {company}")
            risks = generate_risk_summary(documents)
            data[company]["risks"] = risks["risks"]
    

    with open(DATABASE_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, sort_keys=True)

    print("Risks summarised")