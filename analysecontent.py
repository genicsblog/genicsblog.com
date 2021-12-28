import nltk
import json
import html2text
import regex as re
from pathlib import Path
from textblob import TextBlob
from bs4 import BeautifulSoup

search_file = Path("_site/search.json")

with open(search_file) as f:
    data = json.load(f, strict=False)

for item in data:
    html = item["content"]
    soup = BeautifulSoup(html, "html.parser")

    for tag in soup.select('.highlighter-rouge'):
        tag.decompose()

    for tag in soup.select('.lang-name'):
        tag.decompose()

    for tag in soup.select('pre'):
        tag.decompose()

    for tag in soup.select('code'):
        tag.decompose()

    html = str(soup).replace("h1", "span")
    html = html.replace("h2", "span")
    html = html.replace("h3", "span")
    html = html.replace("h4", "span")
    html = html.replace("h5", "span")
    html = html.replace("h6", "span")

    text_maker = html2text.HTML2Text()
    text_maker.ignore_links = True
    text_maker.ignore_tables = True
    text_maker.ignore_images = True
    text = text_maker.handle(html)

    text = ''.join('{}.\n'.format(item) if (item and item[-1] not in '!?.,-') else '{}\n'.format(item) for item in text.split('\n'))
    final = re.sub('[!:;,*)@#%(&$_?^]', " ", text)

    blob = TextBlob(final)
    noduplicates = set()
    for x in blob.noun_phrases:
        for y in x.split(" "):
            noduplicates.add(y)
    item["content"] = ' '.join(noduplicates)
    f.close()

with open(search_file, "w") as f:
    json.dump(data, f)
    f.close()