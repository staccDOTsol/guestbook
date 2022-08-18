import os

import json
lines = []
with open ('md2-cids.json', 'r') as f : 
    staccs = json.loads(f.read())
for line in staccs.values():
    lines.append(line)

print(len(lines))