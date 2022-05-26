const express = require("express");
const cors = require("cors");
require("./db/config");
const Lists = require("./db/Lists");
const SignUp = require("./db/SignUp");

const app = express();

app.use(express.json());

app.use(cors());

// post data in mangodb
app.post("/add-list", async (req, res) => {
  let list = new Lists(req.body);
  let result = await list.save();
  res.send(result);
});

// read data in mongodb
app.get("/get-list/:id", async (req, res) => {
  let listData = await Lists.find({
    $or: [{ userId: { $regex: req.params.id } }],
  });
  res.send(listData);
});

// edit data in mongodb
app.put("/update-list/:_id", async (req, res) => {
  let updatedData = await Lists.updateOne(req.params, { $set: req.body });
  res.send(updatedData);
});

// delete data in mongodb
app.delete("/delete-list/:_id", async (req, res) => {
  let result = await Lists.deleteOne({ _id: req.params._id });
  res.send(result);
});

app.post("/signUp", async (req, res) => {
  SignUp.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      let user = new SignUp(req.body);
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered" });
        }
      });
    }
  });
});

app.post("/login", async (req, res) => {
  SignUp.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      if (req.body.password === user.password) {
        res.send({ message: "Login Successfully", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("server runing on PORT", PORT);
});
