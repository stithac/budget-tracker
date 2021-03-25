# hw18 Budget-Tracker, 18 MAR 21

#### By Ashley Stith

## Description
This application is a budget tracker that allows offline access and functionality.  Users are able to add expenses and deposits to their budgets whether or not they have internet connection.  Transactions that are entered offlined are populated in the total when the application is re-connected to the internet.  It is a Progressive Web Application (PWA) that includes a webmanifest, service-worker and cached API to be able to work offline.  In addition, the application can be downloaded locally.

## Features
The application utilizes a Mongo database with Mongoose schema.  It handles routes with Express.  The application is deployed with Heroku and MongoDB Atlas.

## Models
The application includes one model: transaction.js that is stored in the models folder.

## Site Images
### Homepage
The homepage displays the budget tracker.  The budget total is included at the top and the transactions are listed and shown on a graph below.  The user is able to add funds and subtract funds
![Site Homepage](./public/imgages/home-screenshot.PNG)

## Dependencies
The application includes the following dependencies:

[Epress NPM package](https://www.npmjs.com/package/express)

[Mongoose](https://mongoosejs.com/)

[Morgan](https://www.npmjs.com/package/morgan)

[Compression NPM package](https://www.npmjs.com/package/compression)

[Lite-Server NPM package](https://www.npmjs.com/package/lite-server)

The application is invoked locally by using the following command:

```bash
npm start
```

## Installation
* Install node.js to computer, if not already present.

    * Node.js can be installed from [here](https://nodejs.org/en/).

* Copy all the application files locally to one's machine.

* In a terminal window where you copied the files, install all dependencies. These installations are accomplished by performing the following command:

```bash
npm i
```

## Known Bugs
* There are no known bugs.

## Technologies Used
* node.js
* MongoDb
* Mongoose
* Express
* Compression
* Lite-Server

## Contact
Please email [Ashley Stith](mailto:ashleyc.stith@gmail.com) with questions or for additional inforamtion.

## Contribution Guidelines
Direct link to repository: https://github.com/stithac/budget-tracker

## Deployment
The site is deployed to heroku: https://obscure-springs-62382.herokuapp.com/