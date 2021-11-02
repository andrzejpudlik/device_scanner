const express = require('express');
const cors = require('cors');
const router = require('./router');
// const path = require('path');

const app = express();

app.use(cors());

app.use(express.json());
// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "ui", "build")));

// app.use('/', (req, res) => {
//   console.log(path.join(__dirname, "ui", "build", "index.html"));
//   res.sendFile(path.join(__dirname, "ui", "build", "index.html"));
// })

app.use('/hardware', router)


app.listen(4000, () => {
  console.log('Server listen on port: 4000');
})