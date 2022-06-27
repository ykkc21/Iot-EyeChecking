const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
let phone;
let autoReport;
let cam;

app.set("view engine", "ejs");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  if (autoReport == 119) {
    return res.render("show", { autoReport });
  }
  res.render("index");
});

app.get("/edit", (req, res) => {
  res.render("edit");
});

app.post("/edit", (req, res) => {
  const data = req.body.phone;
  phone = data;
  res.redirect("/");
});

app.get("/report", (req, res) => {
  res.render("report", { phone });
});

// app.post("/report", (req, res) => {
//   const data = req.params;
//   res.redirect("/report");
// });

app.get("/report/:value", (req, res) => {
  const { value } = req.params;
  console.log(value);
  if (value == 119) {
    autoReport = value;
  }
});

app.post("/check", (req, res) => {
  autoReport = 0;
  phone = 0;
  if (autoReport == 0 && phone == 0) {
    return res.redirect("/");
  }
});

app.get("/cam", (req, res) => {
  if (cam == "Show") {
    return res.send("Show");
  }
  if (cam == "No") {
    return res.send("No");
  }
});

app.post("/cam", (req, res) => {
  const data = req.body;
  setTimeout(() => {
    cam = data.text;
    console.log(data.text);
  });

  res.send("okok");
});

app.listen(3000, () => {
  console.log("Server Start Open Port 3000");
});
