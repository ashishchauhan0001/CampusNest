# Steps for setup between branches 

- `git checkout <your-branch-name>`  ( can be manik/ashish   and do your work into your branch)
- `git add .`  (add all your work into staging area)
- `git commit -m "Your commit message"` ( whatever we are doing )
- `git checkout main`  ( Now go to main branch )
- `git pull origin main` ( it will help to take all the changes from remote repo to local one )
- `git merge <your-branch-name>` ( while staying on the main branch merge your branch into main )
- `git push origin main` ( push all the changes into main and go back to you branch )
