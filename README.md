# Meal Plan
A brief description of the project.

## Prerequisites
1. Visual Studio Code
2. IntelliJ IDEA
2. MySQL

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
The MealPlan repository contains 7 branches that serve different purposes. 
1. The main branch is the default branch and acts as the release branch, where the code is stable and ready to be released. 
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
