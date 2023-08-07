const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");

const route = require("./routes");
const db = require("./config/db");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
    "hbs",
    engine({ extname: "hbs", helpers: { sum: (a, b) => a + b } })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
