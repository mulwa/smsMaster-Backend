# [SmsMaster-Backend](https://www.creative-tim.com/product/paper-dashboard-angular)
![version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg)


## Installation Instructions

1. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
2. Open Terminal
3. Go to your file project
4. Then: ```npm install```
5. Then: ```knex migrate: latest```
6. Then: ```knex seed:run```
7. And: ```nodemon server.js```
8. User [http://localhost:8080/api/](http://localhost:8080/api) to access the endpoints

## Endpoints Available


| Method | Endpoint                        | Description       |Parameters|
| ------ | ------------------------------- | ------------------|----------|
| POST   | http://localhost:8080/api/auth/| sign up a user    |name,mobile,email,password |
| POST   | http://localhost:8080/api/auth/login| login a user|email, password|
| POST   | http://localhost:8080/api/contact| Used to create contact| name, phoneNumber|
| GET   | http://localhost:8080/api/contact| Returns all contacts| N/A|
|POST     |http://localhost:8080/api/group|Creates A Group |groupName|
|GET     |http://localhost:8080/api/group/ |Returns all groups |N/A|
|GET     |http://localhost:8080/api/group/contact-group/{groupId} | Returns all Contacts of a specify Group| append groupId in your Url|
|GET     |http://localhost:8080/api/sms/send |Returns all Delivered messages |N/A|
