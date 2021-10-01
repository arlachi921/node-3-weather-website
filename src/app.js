const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
//const port = process.env.PORT || 3000;
app.set("port", process.env.PORT || 3000);

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup statis directory to serve
app.use(express.static(publicDirectoryPath)); //to customize server

// NOTE: res.render --> for .hbs --> alternative for .html
// NOTE: res.send --> for app.use and .html files

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Arlachi",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Arlachi",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Arlachi",
        helpText: "this is helpful text",
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a Search Term",
        });
    }
    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Unable to find location. Try another search...",
        });
    }
    geocode.geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast.forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    location,
                    address: req.query.address,
                    forecast: forecastData,
                });
            });
        }
    );
});

//always place this at the end
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Arlachi",
        errorMessage: "Help Article not Found",
    });
});

//always place this at the end
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Arlachi",
        errorMessage: "Page not Found",
    });
});
// app.listen(port, () => {
//     console.log("Server is up on port " + port);
// });

app.listen(app.get("port"), () => {
    console.log("Server is up on port " + app.get("port"));
});
