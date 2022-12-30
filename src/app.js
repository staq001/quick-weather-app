const path = require("path");
const express = require("express");
const { Dirent } = require("fs");
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");
const hbs = require("hbs");
const cors = require("cors");

// console.log(__dirname); // provides a path of the directory
// console.log(__filename); // provides a path to the file.
// console.log(path.join(__dirname, "../public")); sets a directory.

const app = express();
// express is a function as opposed to an object.
const port = process.env.PORT || 3000;
// this is for heroku as it needs it for it to run. we're saying 'that' or 3000 because 'that' would fail locally but 3000 won't.

//Define path for express config.
const publicDirectoryPath = path.join(__dirname, "../public");

// configuring another directory for Handlebars
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

app.set("view engine", "hbs"); // allows you set a value for a given express setting and there are a few. we have a key, setting name, value.
// it is case sensitive.

// configuring views location for Handlebars
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath)); // used to customize a folder.
app.use(
  cors({
    origin: "localhost:3000",
  })
);

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>"); // allows us to send something back to the requester.
// });

// this helps us configure what the server should do when someone tries to get a specific resource at a specific URL. it takes in two arguments, 1) the ROUTE 2) a function- that defines what we want to do when a person visit the ROUTE.

// console.log(__dirname);

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Omotola",
//       age: 23,
//     },
//     {
//       name: "Sarah",
//       age: 24,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Omotola Staq",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Omotola Staq",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "You're in the help page",
    title: "Help",
    name: "Omotola Staq",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Omotola Staq",
    errorMessage: "Help article not found",
  });
}); // matches an extension of help that isn't found

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        } else {
          forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
              return res.send({ error });
            } else {
              res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
              });
            }
          });
        }
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
    // here, we're saying we want the user to provide a search term with a query string.
  }

  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Omotola Staq",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
}); // starts the server and has it listen on a specific
