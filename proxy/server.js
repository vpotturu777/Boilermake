const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const request = require('request');
// require('https').globalAgent.options.ca = require('ssl-root-cas').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
const proxy = require('express-http-proxy');
const app = express();

app.use(cors());
app.use(cors());
app.use(morgan('dev'));

app.use('/', proxy('https://api.purdue.io'))

const PORT = process.env.PORT || 4200
const server = app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});


// const express = require('express')
// const app = express()
// const port = 3000
// // const HOST = '0.0.0.0';
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
