//init express
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");

const multiparty = require("connect-multiparty");
const MultipartyMiddleware = multiparty({ uploadDir: "./uploads" });

require("dotenv").config();
const app = express();

//CORS
app.use(cors());

//init body-parser
app.use(bodyParser.json());

//import router
const router = require("./routes/route");
app.use("/uploads", express.static("uploads"));
app.use("/api/v2", router);
app.post("/upload-image", MultipartyMiddleware, (req, res) => {
  console.log(req.files.upload);
  let TempFile = req.files.upload.path;
  // res.send({
  //     data : TempFile
  // })
  res.json({
    uploaded: true,
    url: `http://localhost:5001/${TempFile}`,
  });
});
app.use(fileUpload());

app.listen(5001, () => console.log("Listening on port 5001..."));
