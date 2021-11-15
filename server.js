const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/hardware', router)


app.listen(4000, () => {
  console.log('Server listen on port: 4000');
})