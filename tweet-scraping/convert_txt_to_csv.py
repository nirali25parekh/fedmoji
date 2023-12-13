import pandas as pd
df = pd.read_json (r'Path where the JSON file is saved\File Name.json')
df.to_csv (r'Path where the new CSV file will be stored\New File Name.csv', index = None)