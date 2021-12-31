import sys
import yaml
import frontmatter
from pathlib import Path

temp = open('temp.txt', 'r')
files = temp.readlines()[0].split(' ')

total_files = len(files)

if total_files != 0:
    for file in files:
        if(file.split('/')[0] != "_drafts"):
            raise Exception('File is outside the _drafts folder')

        post = frontmatter.load(file)

        with open("_data/contributors.yml", "r") as contributors:
            author = yaml.safe_load(contributors)[post['author']]['links']['github']

        if author != sys.argv[1]:
            raise AssertionError(f"Errors in {file}: File author ({post['author']}), committer ({sys.argv[1]}) and github account of contributor({author}) have conflicts.")
        else:
            print(f'{file} is ok')

else:
    raise Exception('No changed files found.')