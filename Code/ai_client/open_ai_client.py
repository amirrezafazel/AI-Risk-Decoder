import os
from pathlib import Path
from dotenv import load_dotenv

from openai import OpenAI

load_dotenv()

API_KEY = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=API_KEY, max_retries=0) 

SYSTEM_PROMPT_PATH = Path("Code/ai_client/ai_summary_prompt.txt")
SYSTEM_PROMPT = SYSTEM_PROMPT_PATH.read_text(encoding="utf8")



def request_with_system_prompt(prompt: str, model: str = "gpt-5.2") -> str:
    resp = client.responses.create(
        model=model,
        input=[
            {"role": "system", "content": [{"type": "input_text", "text": SYSTEM_PROMPT}]},
            {"role": "user", "content": [
                {"type": "input_text", "text": prompt},
            ]},
        ],
    )

    return resp.output_text

if __name__ == "__main__":
    print(request_with_system_prompt("what is 5 + 4"))