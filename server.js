const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;

const PORT = process.env.PORT || 3000;
const app = express();
const aws_api = "https://2yovt5foa3.execute-api.us-east-2.amazonaws.com/prod/resource"

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send("Server's Homepage");
});

app.get("/say", (req, res) => {
  let keyword = req.query.keyword;
  axios
    .post(aws_api, { keyword })
    .then((response) => {
      return res.status(response.status).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Server error occurred");
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));