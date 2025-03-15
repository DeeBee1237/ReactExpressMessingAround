const express = require("express");
const app = express();

// middleware
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let messages = [];

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree!"] });
});

// Interesting read ? https://medium.com/@benlugavere/using-promises-with-express-8c986c10fae
app.get("/weatherInCity/:cityName", (req, res) => {
  const city = req.params.cityName;

  if (city === "London") {
    res.json({
      main: "London Weather",
      description: "London description",
    });
  } else if (city === "Liverpool") {
    res.json({
      main: "Liverpool Weather",
      description: "Liverpool description",
    });
  }
  res.json({ cod: "404", message: "city not found" });
});

app.post("/postNewMessage", function (req, res) {
  
  let message = req.body.message;
  let userName = req.body.userName;

  messages.push({'userName': userName, 'message' : message});
  console.log(messages);

  res.setHeader('Content-Type', 'application/json');
  res.json({ 'messages': messages });
});

app.get("/getMessages", function (req, res) {
  res.json({ 'messages': messages });
});

app.listen(5000, () => {
  console.log("The server is started on port 5000");
});
