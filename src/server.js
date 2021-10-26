import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";

// Init app
const app = express();

// Connect to MongoDb
ConnectDB();

// Config session
configSession(app);

// Config view engine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({ extended: true }));

// Enable flash messages
app.use(connectFlash());

// Config passport js
app.use(passport.initialize());
app.use(passport.session());

// Init all routes
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Hello Bug Creator, I am running at ${process.env.APP_HOST}: ${process.env.APP_PORT}/`);
});

// import pem from "pem";
// import https from "https";

// pem.config({
//   pathOpenSSL: "C:\\Program Files\\OpenSSL-Win64\\bin\\openssl",
// });

// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//   if (err) {
//     throw err;
//   }
//   // Init app
//   let app = express();

//   // Connect to MongoDb
//   ConnectDB();

//   // Config session
//   configSession(app);

//   // Config view engine
//   configViewEngine(app);

//   // Enable post data for request
//   app.use(bodyParser.urlencoded({ extended: true }));

//   // Enable flash messages
//   app.use(connectFlash());

//   // Config passport js
//   app.use(passport.initialize());
//   app.use(passport.session());

//   // Init all routes
//   initRoutes(app);
//   https
//     .createServer({ key: keys.clientKey, cert: keys.certificate }, app)
//     .listen(process.env.APP_PORT, process.env.APP_HOST, () => {
//       console.log(`Hello Bug Creator, I am running at ${process.env.APP_HOST}: ${process.env.APP_PORT}/`);
//     });
// });
