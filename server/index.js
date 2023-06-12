import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai";
import openAiRoutes from "./routes/openai.js";

/* Configurations */
dotenv.config();
const app = express();
app.use(express.json()); /* This line adds middleware to the application. It uses express.json() to parse JSON data in the request body. This middleware allows you to access the request body in a JSON format. */
app.use(helmet()); /* This line adds the Helmet middleware, which helps secure your Express app by setting various HTTP headers related to security. It adds default security headers to prevent common vulnerabilities. */
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); /* This line sets the Cross-Origin Resource Policy (CORP) header using the Helmet middleware. It allows cross-origin access to resources from all domains. CORP is a mechanism that restricts how resources on a web page can be fetched from other origins. */
app.use(morgan("common")); /* This line adds the Morgan middleware, which is used for logging HTTP requests. In this case, it uses the "common" format, which logs the date, HTTP method, URL, status code, response size, and response time. */
app.use(bodyParser.json({limit: "30mb", extended: true})); /* This line adds the bodyParser middleware to parse JSON data with a maximum limit of 30 megabytes. It allows you to access the request body as req.body when the request has a JSON content type. */
app.use(bodyParser.urlencoded({limit: "30mb", extended: true})); /* This line adds the bodyParser middleware to parse URL-encoded data with a maximum limit of 30 megabytes. It allows you to access the request body as req.body when the request has a URL-encoded content type. */
app.use(cors()); /* This line adds the CORS middleware, which enables Cross-Origin Resource Sharing. It allows your Express app to respond to requests from different domains or origins. */


/* Open Ai Configuration */
const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
export const openai = new OpenAIApi(configuration);

/* Routes */
app.use('/openai', openAiRoutes);

/* Server Setup */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});