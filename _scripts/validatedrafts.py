import sys
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

        if post['author'] != sys.argv[1]:
            raise AssertionError(f'Author of {file.strip()} ({post["author"]}) is not {sys.argv[1]}')
        else:
            print(f'{file} is ok')

else:
    raise Exception('No changed files found.')