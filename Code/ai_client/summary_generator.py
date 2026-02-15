import json
from pathlib import Path
from Code.ai_client.open_ai_client import request_with_system_prompt



def generate_risk_summary(documents: dict[str, str]):
    coallessed_documents = [f"{title}: {content}" for title, content in documents.items()]
    prompt = "\n".join(coallessed_documents)
    risk_summary = request_with_system_prompt(prompt)
    return risk_summary


if __name__ == "__main__":
    DATABASE_PATH = Path("Data/database.json")

    with open(DATABASE_PATH, "r", encoding='utf-8') as f:
        data: dict[str, dict[str, str]] = json.load(f)

    for company, documents in data.items():
        print(company)
        print(generate_risk_summary(documents))
        break

