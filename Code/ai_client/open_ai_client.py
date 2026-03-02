import os
import json
from pathlib import Path
from dotenv import load_dotenv

from openai import OpenAI

load_dotenv()

API_KEY = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=API_KEY, max_retries=0) 

SYSTEM_PROMPT_PATH = Path("Code/ai_client/ai_summary_prompt.txt")
SYSTEM_PROMPT = SYSTEM_PROMPT_PATH.read_text(encoding="utf8")

OUTPUT_SCHEMA_PATH = Path('Code/ai_client/response_output_schema.json')
with open(OUTPUT_SCHEMA_PATH, "r") as f:
    schema = json.load(f)



def ai_query(prompt: str, model: str = "gpt-5-mini") -> dict:
    resp = client.responses.create(
        model=model,
        input=[
            {"role": "system", "content": [{"type": "input_text", "text": SYSTEM_PROMPT}]},
            {"role": "user", "content": [
                {"type": "input_text", "text": prompt},
            ]},
        ],
        text=schema
    )

    return json.loads(resp.output_text)

if __name__ == "__main__":
    print(ai_query("Describe the risks of grok"))