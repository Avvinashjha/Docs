# Typescript and Node JS Starter Project

TODO: Write Proper Guid to pull this specific folder from git

```text
Cloning a specific folder (or sub-directory) from a Git repository is achieved using sparse-checkout. This allows you to download only the parts of a repository you need, rather than the entire project. 
Here's how to do it: 

• Initialize a new Git repository and add the remote: 

    mkdir <local-repo-name>
    cd <local-repo-name>
    git init
    git remote add -f origin <repository-url>

Replace &lt;local-repo-name&gt; with your desired local directory name and &lt;repository-url&gt; with the URL of the Git repository. Enable sparse-checkout in cone mode. 
    git sparse-checkout init --cone

Cone mode simplifies the configuration for common use cases. 

• Specify the folder you want to clone: 

    git sparse-checkout set <path/to/specific/folder>

Replace &lt;path/to/specific/folder&gt; with the relative path to the folder you want to clone within the remote repository (e.g., src/my-module). Checkout the desired branch. [1]  
    git checkout <branch-name>

Replace &lt;branch-name&gt; with the name of the branch you want to checkout (e.g., main or master). 
After these steps, only the specified folder and its contents will be present in your local &lt;local-repo-name&gt; directory. 

AI responses may include mistakes.

[1] https://kodekloud.com/blog/how-to-clone-a-git-repository-to-a-specific-folder/
```
