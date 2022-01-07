import os
import sys
import yaml
import requests
import frontmatter
from pathlib import Path

temp = open("temp.txt", "r")
files = temp.readlines()[0].split(" ")

total_files = len(files)

if total_files != 0:
    for file in files:
        file = file.strip()

        if(file.split("/")[0] != "_drafts"):
            raise Exception("File is outside the _drafts folder")

        post = frontmatter.load(file)

        with open("_data/contributors.yml", "r") as contributors:
            author = yaml.safe_load(contributors)[post["author"]]["links"]["github"]

        if author != sys.argv[1]:
            raise AssertionError(f"Errors in {file}: File author ({post['author']}), committer ({sys.argv[1]}) and github account of contributor({author}) have conflicts.")

        url = "https://raw.githubusercontent.com/genicsblog/genicsblog.github.io/main/_drafts/" + file.split('/')[1]

        try:
            response = requests.get(url)

            if response.status_code == 200:
                tempMd = open("temp.md", "w")
                tempMd.write(response.text)

                tempMd = open("temp.md")

                yml = frontmatter.load(tempMd)
                existingDraftAuthor = yml["author"]

                if author != existingDraftAuthor:
                    raise AssertionError(f"Committer tried to manipulate the author of {file}")

                os.remove("temp.md")

            elif response.status_code == 404:
                print(f"File not present on main branch, skipping...")

            else:
                raise Exception(f"Encountered error code {response.status_code} while reaching {url}. File may not be present on main branch.")

        except:
            raise Exception(f"Exception occured while reaching {url}")

        print(f"{file} is ok")

else:
    raise Exception("No changed files found.")
