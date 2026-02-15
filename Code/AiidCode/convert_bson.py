import bson
import pandas as pd
import os

# Path logic:
# 1. Go up from 'Aiid' (subfolder)
# 2. Go up from 'Code'
# 3. Enter the top-level 'Aiid' folder
bson_path = "../../Aiid/mongodump_full_snapshot/aiidprod/reports.bson"
output_csv = "../../Aiid/incidents.csv"

def convert_to_csv():
    # Use os.path.abspath to ensure the path is resolved correctly based on script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    absolute_bson_path = os.path.abspath(os.path.join(script_dir, bson_path))
    absolute_output_path = os.path.abspath(os.path.join(script_dir, output_csv))

    if not os.path.exists(absolute_bson_path):
        print(f"Error: Could not find file at: {absolute_bson_path}")
        print("Please check if your mongodump folder is exactly where you think it is.")
        return

    print("Decoding BSON file... this might take a moment.")
    try:
        with open(absolute_bson_path, 'rb') as f:
            data = bson.decode_all(f.read())

        df = pd.DataFrame(data)
        df.to_csv(absolute_output_path, index=False)
        print(f"Success! Data saved to: {absolute_output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    convert_to_csv()