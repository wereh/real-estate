import express from 'express';
import { test } from '../controllers/user.controller.js';

//create  routers

const router = express.Router();

//api endpoint

router.get('/test', test); 


//export the router

export default router;  // this will make router available to other files by importing it.  This is a common practice in Node.js for creating modular and reusable code.  It helps to maintain a clean and organized codebase.  The router is now ready to be used in our server.js file.  This file will import our router and start the server.  This makes our server.js file more maintainable and easier to read.  This also makes it easier to add more routes in the future.  Without this, we would have to add the new route to our server.js file every time we wanted to add a new route.  By using a router, we can separate our routes into different files and make it easier to manage and maintain.  This is a best practice in Node.js.  It also makes our code more modular and reusable.  This makes it easier to add more features in the future.  Without this, we would have
