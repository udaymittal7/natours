<h1 align="center">
  <br>
  <a href="https://natours-uday.herokuapp.com/"><img src="https://github.com/udaymittal7/natours/blob/master/public/img/logo-green-round.png" alt="Natours" width="200"></a>
  <br>
  Natours
  <br>
</h1>

<h4 align="center">An awesome tour booking site built on top of <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>.</h4>

## Deployed Version
Live demo (Feel free to visit) 👉 : https://natours-uday.herokuapp.com/


## Key Features

* Authentication and Authorization
  - Login and logout
  - Using JWT 
  - Using best security practices like rate-limiter, xss-clean, helmat for headers, hpp for preventing parameter pollution and mongo-sanitize.
* Tour
  - Manage booking, check tours map, check users' reviews and rating
  - Admin can add new tours
* User profile
  - Update username, photo, email, and password
  - See all your bought tours at the same place
* Credit card Payment
  - Using stripe using webhooks to avoid adding tour without payment

## How To Use

### Book a tour
* Login or Signup to the site
* Search for tours that you want to book
* Book a tour
* Proceed to the payment checkout page
* Enter the card details:
  ```
  - Card No. : 4242 4242 4242 4242
  - Expiry date: 02 / 22
  - CVV: 222
  ```
* Finished!

## API Documentation
Link(https://documenter.getpostman.com/view/14039764/TWDfDDa9)

## API Usage
Before using the API, you need to set the variables in Postman depending on your environment (development or production). Simply add: 
  ```
  - {{URL}} with your hostname as value (Eg. http://127.0.0.1:3000 or http://www.example.com)
  - {{password}} with your user password as value.
  ```

<b> API Features: </b>

Tours List 👉 https://natours-uday.herokuapp.com/api/v1/tours

Tours State 👉 https://natours-uday.herokuapp.com/api/v1/tours/tour-stats

Get Top 5 Cheap Tours 👉https://natours-uday.herokuapp.com/api/v1/tours/top-5-cheap

Get Tours Within Radius 👉https://natours-uday.herokuapp.com/api/v1/tours/tours-within/200/center/34.098453,-118.096327/unit/mi



## Deployment
The website is deployed with git into heroku. Below are the steps taken:
```
git init
git add -A
git commit -m "Commit message"
heroku login
heroku create
heroku config:set CONFIG_KEY=CONFIG_VALUE
parcel build ./public/js/index.js --out-dir ./public/js --out-file bundle.js
git push heroku master
heroku open
```
You can also changed your website url by running this command:
```
heroku apps:rename natours-users
```


## Build With

* [NodeJS](https://nodejs.org/en/) - JS runtime environment
* [Express](http://expressjs.com/) - The web framework used
* [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
* [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine
* [JSON Web Token](https://jwt.io/) - Security token
* [Stripe](https://stripe.com/) - Online payment API
* [Postman](https://www.getpostman.com/) - API testing
* [Mailtrap](https://mailtrap.io/) & [Nodemailer](https://nodemailer.com/) - Email delivery platform
* [Heroku](https://www.heroku.com/) - Cloud platform



## To-do

* Review and rating
  - Allow user to add a review directly at the website after they have taken a tour
* Booking
  - Prevent duplicate bookings after user has booked that exact tour, implement favourite tours
* Advanced authentication features
  - Confirm user email, two-factor authentication, using email functionality properly
* And More ! There's always room for improvement!


## Installation
You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the
dependencies by running
```
$ npm i
set your env variables
$ npm run watch:js
$ npm run build:js
$ npm run dev (for development)
$ npm run start:prod (for production)
$ npm run debug (for debug)
$ npm start
```
