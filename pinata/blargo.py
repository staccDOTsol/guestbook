import json 
with open ('output/downloaded-cids.json', 'r') as f:
    anobj = json.loads(f.read())
print(len(anobj))