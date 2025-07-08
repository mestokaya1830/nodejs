const express = require("express");
const app = express();
const bp = require("body-parser");
const qrcode = require("qrcode");

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  const url = req.body.url;
  if (url.length === 0) res.send("Empty Data!");
  qrcode.toDataURL(url, (err, code) => {
      if (err) res.send("Error occured");
      console.log(code)//write code to db
      res.render("scan", { code });
  });
});
const port = 3000;
app.listen(port, () => console.log("Server at 3000"));