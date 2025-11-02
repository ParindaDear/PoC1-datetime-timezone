var express = require("express");
var dotenv = require("dotenv");
dotenv.config();
var app = express();
app.use(express.json());
var studyPlanRoutes = require("./routes/studyPlan-route.js");

app.use("/study-plan", studyPlanRoutes);

app.use(express.static("../frontend"));
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
