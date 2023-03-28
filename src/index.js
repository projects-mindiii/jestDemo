import express from "express";
var http = require('http');
import bodyParser from "body-parser";
import { v1routes } from '!/routes';
import createHttpError from "http-errors";
import { notFound } from "./middlewares/errorHandler";
import { responseHandler } from "./middlewares/responseHandler";
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';
import fileUpload from "express-fileupload";
import logger from "~/utils/logger";

var dotenv = require('dotenv').config();
const app = express(),
    APP_PORT = process.env.APP_PORT,
    APP_HOST = process.env.APP_HOST;
app.set("port", APP_PORT);
app.set("host", APP_HOST);
// set the view engine to ejs
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static('public')); 

/**
 * router managment for v1
 */
app.use( responseHandler );


app.use("/v1", v1routes);
app.use('/images', express.static('images'));

/*set error middleware*/
app.use(notFound); //return default error message not found

if(process.env.NODE_ENV !== 'test'){
    app.listen(app.get("port"), () => {
        console.log(`Server listing at http://${app.get("host")}:${app.get("port")}`)
    })
}

process.on('uncaughtException', ex => {
    console.log(ex);
    logger.error("uncaughtException: ",ex.message)
    process.exit(1);
})
  
process.on('unhandledRejection', reason => {
    logger.error("unhandledRejection: " + reason)
    process.exit(1);
})

export default app;