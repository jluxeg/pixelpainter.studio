# Contributing to pixelpainter.studio

So you want to help make pixelpainter.studio even better? (Or at least you want to know how to edit the code yourself.) Either way, thanks for being excited enough about the project to take that step! Any contributions you make will benefit all users and are greatly appreciated, whether it's:
- [reporting](https://github.com/jluxeg/pixelpainter.studio/issues)/fixing a bug
- [proposing](https://github.com/jluxeg/pixelpainter.studio/issues)/implementing a new feature
- improving the current code or documentation
- or even something else

You can see everyone who has contributed so far, [here](CONTRIBUTORS.md).

And if you're enjoying pixelpainter.studio, but don't have time to contribute, that's fine too. There are other easy ways to support the project and show your appreciation:
- tell your friends/colleagues who might be interested
- share it somewhere on the internet
- join in on the bug report/feature request conversations
- maybe even give pixelpainter.studio a star on GitHub


## What to Know Before Contributing

If you want to open a Pull Request (PR), there are a few key things to remember:
1. an accompanying open Issue should exist or be created before submitting a PR
2. it'd be appreciated if you comment in the Issue that you would like to work on it first
3. use the `next` branch when developing and submitting PRs to align with other new changes
4. keep unrelated additions/modifications in separate PRs

### Code of Conduct

We expect users to follow our code of conduct while participating with this project in any fashion. It currently is as follows:
1. Treat the other person as you want to be treated yourself.
	- If you're going to be an ass to yourself, see rule 2.
2. Don't be an ass.
3. A more formal code of conduct will be adopted if this simple one cannot be followed.

Please report unacceptable behavior to justinludwiguxe@gmail.com.


## Making Your Contribution

The rest of this document will be a step-by-step guide to setting up the repository and crafting a PR, assuming the reader has little prior knowledge.\
If anything in this document is unclear or can be improved, [open an issue](https://github.com/jluxeg/pixelpainter.studio/issues) about it.

### 1. Prepare the local development environment
If this is your first git project you can read about how to install git on your machine [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).\
To work on the project you need to have node/npm and gulp-cli.\
If you don't have node, you can download it from [here](https://nodejs.org/).

Then if you don't have gulp-cli, in your command line do:
```sh
npm install --global gulp-cli
```

### 2. Make your fork
Fork the [pixelpainter.studio repository](https://github.com/jluxeg/pixelpainter.studio) to your own Github account.\
This means that you'll have a copy of the repository under <your-GitHub-username>/pixelpainter.studio.

### 3. Clone your fork locally
If you have a specific path you want the local repo to live, cd into it and make the directory as needed:
```sh
cd <path/where/local/repos/should/go>

mkdir <your-directory>
cd <your-directory>
```

Once you are in your desired directory in your command line enter:
```sh
git clone git@github.com:<your-username>/pixelpainter.studio.git
```

Then navigate to the newly cloned directory:
```sh
cd pixelpainter.studio
```

And finally add an upstream remote to be able to easily pull other's commits later:
```sh
git remote add upstream https://github.com/jluxeg/pixelpainter.studio
```

### 4. Create the branch for your pull request

The `master` branch is the latest stable version, any changes should be done based on the `next` branch. PRs will also be made to the `next` branch.

Create your branch by running this command:
```sh
git checkout -b <your-branch-name> next
```

A helpful branch name would be in the following format: <type>/<issue-number>-<custom-name>, where 'type' could be:
- feat: for a new feature
- fix: for a bug fix
- docs: documentation only changes
- chore: for things like refactoring, code styling, etc.

### 5. Install development dependencies

From the root of the project in your command line enter:
```sh
npm ci
```

This will install the following base dependencies (beyond what npm and these packages also install):
```json
"devDependencies": {
	"browser-sync": "^2.29.3",
	"dart-sass": "^1.25.0",
	"eslint": "^8.51.0",
	"gulp": "^4.0.2",
	"gulp-autoprefixer": "^8.0.0",
	"gulp-concat": "^2.6.1",
	"gulp-eslint": "^6.0.0",
	"gulp-resolve-dependencies": "^4.1.0",
	"gulp-sass": "^5.1.0",
	"gulp-uglify": "^3.0.2"
},
"dependencies": {
	"downloadjs": "^1.4.7",
	"html-to-image": "^1.11.11",
	"jquery": "^3.7.1"
}
```
A deep understanding of these tools in not required to effectively contribute, but you can check out their attached documentation if you're interested in learning more about each one.

### 6. Make your changes

Now you can open the files in your editor of choice and start making your changes.\
Instead of a formal styleguide, take care to maintain the existing coding style in order to keep the code as readable as possible.

When editing files there are a few commands you can use... 
- to compile your scss saved changes:
```sh
gulp styles
```
- to compile your js saved changes:
```sh
gulp scripts
```
- to compile all your saved changes:
```sh
gulp build
```
- to automatically compile your changes when a file is saved:
```sh
gulp watch
```
- to start a localhosted browser instance:
```sh
gulp browserSync
```
- to start a localhosted browser instance and easily see your changes compiled when saving on the fly without manually reloading:
```sh
gulp
```

(To cancel a `gulp` or `gulp watch`, press ctrl+c in the command line)

When you are happy with your changes check if any of the documentation should be updated as well.
- include any necessary comments around your code
- update README, CONTRIBUTING, etc. if affected by your changes
- update the Unreleased section of the CHANGELOG with your changes
- add yourself to the CONTRIBUTORS file, include whatever name/contact information you are comfortable with

### 7. Commit your changes to your branch

Once you have made all your edits and updated the documentation, you can stage all your changes that are ready to be committed:
```sh
git add .
```

Then you can commit your changes to your branch. 
```sh
git commit -m "<summary of what you did>"
```
A helpful commit message would look something like this:
```sh
git commit -m "<type>: <summary of what you did> (<issue number>)" -m "<[BREAKING CHANGE]> <description if needed>"
```
Where 'type' could be feat, fix, docs, chore, etc.\
The second line for the message is only needed if you introduce a breaking change, or need more space to summarize your changes.

Next, it's time to make sure your origin is up to date with any recent changes to the upstream version.\
These next commands will:
- switch your working branch to your next branch
- pull any updates from the upstream version
- switch your working branch back to your new branch
- merge the updates into your new branch.
```sh
git checkout next
git pull upstream next
git checkout <your-branch-name>
git merge next
```

Some conflicts may have arose during the merge that will need to be resolved and committed as well.

If you are making changes to the js or css, run a final `gulp build` to re-bundle the files before the final commit.

If you are feeling spicy, you can try using stash during this step.\
Instead of making the commit right away after staging your changes, use:
```sh
git stash push
```
Then after updating from the upstream as above, use:
```sh
git stash pop
```
If there are conflicts, after you resolve them, use:
```sh
git stash drop
```
If there aren't any conflicts, or you have resolved them- run the `gulp build`, stage your files, and make your commit.


### 8. Publish your branch to your fork

Push the changes to your remote repository using:
```sh
git push origin <your-branch-name>
```

### 9. Create a new Pull Request

Open a PR in the pixelpainter.studio repository to the `next` branch from your new branch.\
A template will load guiding you through the information needed in the PR to efficiently review the changes.

Wait for the PR to be reviewed by a maintainer.\
They may suggest some changes you should make first before the PR is accepted.

Once your PR has been approved, a maintainer will merge your changes into the active `next` branch.

After your changes have been accepted and merged, update your local repo:
```sh
git checkout next
git pull upstream next
```

Then you can delete the branch on your local and remote repos:
```sh
git branch -d <your-branch-name>
git push origin --delete <your-branch-name>
```
(This can also be done during the pull request workflow on GitHub as well)

Thanks again for contributing!


## Release Strategy

The `next` branch will gather updates until a semi-stable release candidate is viable.\
At that point a `release` branch will be created off of `next` and undergo further testing before being merged into the `master` branch with an updated release tag.


## License

By contributing, you agree that you have the necessary rights to the content and that your contributions will be provided under the project's AGPL 3 License.

