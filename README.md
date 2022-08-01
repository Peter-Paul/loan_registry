# loan_registry
Loan Management System. It will be used as a loan processing pipeline to help with data management and analytical insights

## Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

To run the frontend server on your local machine, navigate to the the `frontend` folder and run the following commands as instructed

### Install Node Modules

Run `npm install` to install all node modules within the `package-lock.json` file


### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Backend

This project was generated with `Express` node framework

To run the backend server on your local machine, navigate to the the `backend` folder and run the following commands as instructed

### Install Node Modules

Run `npm install` to install all node modules within the `package-lock.json` file

### Create Database 

Open `database` folder and import `dbvol.sql` into your local sql management system

### Development Server

Run `npm run dev` to launch the server on port `3000`

### Deployment

1. Create node app image  `docker build -t node-app .` 
2. Run `docker-compose up` command
3. Open `http://localhost:8080/` 
