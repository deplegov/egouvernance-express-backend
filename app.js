require("dotenv").config();
const cors = require('cors');
const express = require("express");
const commentController = require("./controllers/comment");
const userController = require("./controllers/user");
const articleController = require("./controllers/article");
const tenderController = require("./controllers/tender");
const soumissionController = require("./controllers/soumission");
const societyController = require("./controllers/society");
const mongoose = require("mongoose");
const oracledb = require("oracledb");

const app = express();
const PORT = process.env.PORT || 80;

oracledb.initOracleClient({ libDir: './instantclient/linux'})

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use("/files", express.static('./public/files'));

app.use("/articles", articleController);
app.use("/comments", commentController);
app.use("/societies", societyController);
app.use("/soumissions", soumissionController);
app.use("/tenders", tenderController);
app.use("/users", userController);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
        console.log('Connected to mongodb');
      console.log(`Server is listening on port ${PORT}`);
    });
  }) 
  .catch((err) => {
    console.log(err);
  });
