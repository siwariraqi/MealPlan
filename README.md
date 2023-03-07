# Meal Plan
A brief description of the project.

## Prerequisites
1. Visual Studio Code
2. IntelliJ IDEA
3. MySQL
4. GitHub Desktop / Git Bash

## Getting Started

Clone the repository: 
```bash
git clone https://github.com/siwariraqi/MealPlan.git
```
Navigate to the project directory:
```bash
 cd mealplan-repo
```


### Frontend Side: Angular

Navigate to the Angular project directory:
```bash
 cd frontendmealplan
```
Install dependencies:
```bash
 npm install
```
Start the Angular project:
```bash
 ng serve -o
```

### Backend side: Java SpringBoot

Change the application.properties -> your datasource credentials 

spring.datasource.url=

spring.datasource.username=

spring.datasource.password=


Ready, Just Run!
## Branches Explanation:
### Existed branches:
The MealPlan repository contains 7 branches that serve different purposes. 
1. The main branch acts as the release branch, where the code is stable and ready to be released. 
2. The dev-branch acts as the development branch, where new features and changes are made before being merged into the main branch.
3. Teams branches:
- Team1 : dev-team1
- Team2 : dev-team2
- Team3 : dev-team3
- Team4 : dev-team4
- Team5 : dev-team5

Make sure you are working on the correct branch.
```bash
 git status
```
verify that you are in the main branch.
Then you need to checkout to your team's branch 

for example: 
```bash
 git checkout dev-team1
```

Now you can either create your own branch or work directly in your team branch. 

### Start modifying files and push to your team branch:

#### Way 1: Creating a new branch allows you to make changes or add new features without affecting the existing code in your team branch. 

To create a new branch, use the following command:

****please make sure before this step that you are in your team branch****
```bash
git checkout -b your-private-branch-name
```
When you are ready to merge your changes back into the team branch, you can create a pull request and ask another team member to review your code.

you can do that using following command:
```terminal
git status
//here you can see your modified files
git add specific-files
git commit -m "Your commit message"
git push origin your-private-branch-name
```
When you are ready to merge your changes back into the team branch, you can create a pull request and ask another team member to review your code.

#### Way 2: you can work directly in your team branch if your changes are minor or don't require a separate branch. In this case, you can make your changes, commit them, and push them back to the team branch using the following commands. 
```terminal
git add .
git commit -m "Your commit message"
git push origin your-team-branch
```

### Keep updated with your team's members 
To ensure that you have the latest changes from other team members in your team branch, you should regularly pull updates from the remote repository. 
**highly recommended to do that before starting to work**

To do this, use the following command:
```terminal
git checkout your-team-branch 
git pull
git checkout your-private-branch-name
git merge your-team-branch
```


### Keep team's branch updated with the devbranch (sync between teams)
```terminal
git checkout dev-branch
git pull
git checkout your-team-branch
git merge dev-branch
git push origin your-team-branch
```

### Important to notice:

1. If you accidentally push to the dev-branch or main branch, no worries! you will need three approvals before merging. This helps ensure that changes to the dev and main branches are carefully reviewed and reduces the chance of any accidental damage.

***Anyway please avoid pushing to main***

When you want to push to dev-branch please request review from :

Backend changes: 
 1. siwariraqi
 2. maha246
 3. muhammedjaradat
 4. mhahmad

Frontend changes: 
1. younis3
2. RubaEgbaria
3. amir98mm
4. siwariraqi


## Need Help?
If you encounter any issues or have any questions, don't hesitate to reach out. I'm always to offer assistance and support.

## Conclusion
Congratulations, you're now ready to start contributing to this project! Whether you're fixing a bug, adding a new feature, or just exploring the codebase, I appreciate your interest and willingness to help.

Thank you for your contributions and happy coding :)!
