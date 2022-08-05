# PLATINUM CREDIT PIPELINE
A Loan Pipeline System. It is to be used to enable data entry and state tracking of clients entered 

## Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

On build, the artifacts will are stored in the `frontend/dist/` directory

## Backend

This project was generated with `Express` node framework

To run the backend server on your local machine, navigate to the the `backend` folder and run the following commands as instructed

### Install Node Modules

Run `npm install` to install all node modules within the `package-lock.json` file

### Create Database 

Open `database` folder and import `loan_registry.sql` into your local sql management system

### Development Server

Run `npm run dev` to launch the server on port `3000`

### Deployment

1. Create node app image  `docker build -t node-backend .` 
2. Run `docker-compose up` command
3. The bash into the database container and do the following;
    -`mysql -uroot -ppassword` command
    -`use mysql;` command
    -`ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';` command
    -`flush priviledges';` command
    -`create database loan_registry;` command
    -`use loan_registry;` command
    -`source dbvol/loan_registry.sql;` command
4. Open `http://localhost:8080/` 
