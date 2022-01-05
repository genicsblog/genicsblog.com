import os
import sys
import yaml
import requests
import frontmatter
from pathlib import Path

file = "_data/contributors.yml"
temp = open("temp.txt", "r")


post = frontmatter.load("_data/contributors.yml")

with open(file, "r") as contributorData:
    newData = yaml.safe_load(contributorData)

url = f"https://raw.githubusercontent.com/genicsblog/genicsblog.github.io/main/{file}"

try:
    response = requests.get(url)

    if response.status_code == 200:
        tempYml = open("temp.yml", "w")
        tempYml.write(response.text)

        tempYml = open("temp.yml")

        existingData = yaml.safe_load(tempYml)
        changed = set()

        if newData != existingData:
            for key in newData:
                if key not in existingData:
                    changed.add(str(key))
                else:
                    for subKey in newData[key]:
                        if newData[key][subKey] != existingData[key][subKey]:
                            changed.add(str(key))

            for key in existingData:
                if key not in newData:
                    changed.add(str(key))
                else:
                    for subKey in existingData[key]:
                        if existingData[key][subKey] != newData[key][subKey]:
                            changed.add(str(key))

        for contributor in changed:
            contributorFile = open(f"_contributors/{contributor}.md", "w")
            contributorFile.write(f'''---
layout: contributor
name: {contributor}
---''')

        print("Contributors are valid!")

        os.remove("temp.yml")
        
    else:
        raise Exception(f"Encountered error code {response.status_code} while reaching {url}.")

except:
    raise Exception(f"Exception occured while reaching {url}.")

print(f"{file} is ok.")
