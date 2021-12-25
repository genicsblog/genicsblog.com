# run this command before running the python -m nltk.downloader brown punkt
from pathlib import Path
import nltk
import json
from textblob import TextBlob

search_file = Path("_site/search.json")

with open(search_file) as f:
    data = json.load(f)

for item in data:
    txt = item["content"]
    blob = TextBlob(txt)
    noduplicates = set()
    for x in blob.noun_phrases:
        for y in x.split(" "):
            noduplicates.add(y)
    item["content"] = ' '.join(noduplicates)
    f.close()

with open(search_file, "w") as f:
    json.dump(data, f)
    f.close()