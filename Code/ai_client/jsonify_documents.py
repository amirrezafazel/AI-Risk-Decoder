import json
from pathlib import Path

DATA_PATH = Path("Data")
OUTPUT_PATH = Path("Data/database.json")

output_data = {}

for company_dir in DATA_PATH.iterdir():
    if company_dir.is_dir():
        company_name = company_dir.name
        
        company_entry = {}
        for doc_file in company_dir.iterdir():
            if doc_file.is_file():
                try:
                    content = doc_file.read_text(encoding='utf-8', errors='ignore')
                    
                    company_entry[doc_file.name] = content
                    
                except Exception as e:
                    print(f"Could not read {doc_file.name}: {e}")
        
        output_data[company_name] = company_entry

with open(OUTPUT_PATH, "w", encoding='utf-8') as f:
    json.dump(output_data, f, indent=4)

print("Export Complete")