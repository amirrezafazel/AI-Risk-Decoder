import pandas as pd
import sys
import os

# Path to your new incidents database
DB_PATH = "../../Aiid/incidents.csv"

def search_database(keyword):
    if not os.path.exists(DB_PATH):
        print(f" Error: Database not found at {DB_PATH}. Did you run convert_bson.py?")
        return

    # Load data - using usecols makes this MUCH faster
    df = pd.read_csv(DB_PATH, usecols=['title', 'url', 'description'])

    # Filter for the keyword in title or description
    results = df[df['title'].str.contains(keyword, case=False, na=False) |
                 df['description'].str.contains(keyword, case=False, na=False)]

    if results.empty:
        print(f"No incidents found for: '{keyword}'")
    else:
        print(f"🔎 Found {len(results)} incidents for '{keyword}':\n")
        # Print top 3 matches
        for _, row in results.head(3).iterrows():
            print(f" {row['title']}")
            print(f"{row['url']}\n")

if __name__ == "__main__":
    # This allows you to run: python3 run_search.py "Your Keyword"
    if len(sys.argv) > 1:
        search_term = " ".join(sys.argv[1:])
        search_database(search_term)
    else:
        print("Usage: python3 run_search.py <keyword>")