const express = require("express");
const cors = require("cors");
const FileUpload = require("express-fileupload");
const router = require("./src/routers/router");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    credentials: true,
  })
);
app.use(FileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src"));

router(app);

app.use((error, request, response, next) => {
  console.log(`error ${error.message}`);
  const status = error.status || 400;
  response.status(status).json({ message: error.message });
});

app.listen(PORT, () =>
  console.log(`SERVER RUNNING ON PORT http://localhost:${PORT}`)
);
