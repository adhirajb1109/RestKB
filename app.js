const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 8000;
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
mongoose.connect(
  "mongodb+srv://adhirajb:adhirajb@notesapi.5pbbb.mongodb.net/RESTKB?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  (req, res) => {
    console.log("Connected To Database !");
  }
);
const articleSchema = {
  title: String,
  description: String,
};
const Article = mongoose.model("Article", articleSchema);
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome To RestKb ! RestKb is a REST API by the help of which you can organize your knowledge .",
  });
});
app
  .route("/articles")
  .get((req, res) => {
    Article.find({}, (err, article) => {
      if (!err) {
        res.json(article);
      } else {
        res.json(err);
      }
    });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      description: req.body.description,
    });
    newArticle.save((err) => {
      if (!err) {
        res.json(newArticle);
      } else {
        res.json(err);
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany({}, (err, article) => {
      if (!err) {
        res.json(article);
      } else {
        res.json(err);
      }
    });
  });
app
  .route("/articles/:title")
  .get((req, res) => {
    Article.findOne({ title: req.params.title }, (err, article) => {
      if (article) {
        res.json(article);
      } else {
        res.json({ message: "Article Matching The Above Title Not Found !" });
      }
    });
  })
  .put((req, res) => {
    Article.updateOne(
      { title: req.params.title },
      {
        title: req.body.title,
        description: req.body.description,
      },
      { overwrite: true },
      (err, article) => {
        if (!err) {
          res.json(article);
        } else {
          res.json(err);
        }
      }
    );
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.title },
      { $set: req.body },
      (err, article) => {
        if (!err) {
          res.json(article);
        } else {
          res.json(err);
        }
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.title }, (err, article) => {
      if (!err) {
        res.json(article);
      } else {
        res.json(err);
      }
    });
  });
app.listen(PORT, function () {
  console.log(`Server Initialized On Port ${PORT}`);
});
