# desk-booking-react

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## IMPORTANT: Short explanation about the app

This is an example of a desk booking app with a SQLite database.
The full app must have an admin console which allows add employes and desks.
The desk position must be defined in the FE as a click point. 
To simplify this sample this console is not available.
The list of employees and available desks can't be manually modified just by using Postman.

To test the operations is neccesary to introduce the employee code, it is "Test1234" for all.
A desk can be booked by clicking on it, every user can modify the date and update the reservation.
You can select a simple day or a range.
A desk can be released by Delete, only by the user who has it booked.

## Available Scripts

In the project directory, you can run:

### `node index.js` to starting the BE server

As this app is running over express server conected to MongoDB, we must start the serve by navigating to the server folder
were the server index.js script is contained, the run the command, the BE server uses the port 3000

### `npm start` to starting the FE server

To run this command first navigate to the client folder inside the proyect, there is contained the index.js script.
Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
