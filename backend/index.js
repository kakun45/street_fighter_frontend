const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const { readJsonData } = require("./controllers/readData");
const { actions, edges } = require("./data/edges_actionsv1");

const app = express();
const port = process.env.PORT || 8080;

// serve static files from public dir
app.use(express.static(path.join(__dirname, "public")));

const verticiesv2 = readJsonData("dr_vertices.json");

// route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// return data: actions
app.get("/actions", (req, res) => {
  // res.sendFile(path.join(__dirname, "public", "index.html"));
  res.json({ actions, edges });
});

app.listen(port, () => {
  console.log(`🚀Fire the command! at http://localhost:${port}`);
});

//  to run: npx nodemon index.js
