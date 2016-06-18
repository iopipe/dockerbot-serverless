var fs = require("fs")
var R = require("ramda")
var iopipe = require("iopipe")()
var dals = new require('dockaless')({
  protocol: "https",
  host: "146.20.68.182",
  port: 2376,
  ca: fs.readFileSync('./cfg/ca.pem'),
  cert: fs.readFileSync('./cfg/cert.pem'),
  key: fs.readFileSync('./cfg/key.pem')
})

exports.handler = iopipe.define(
  (e, c) => { c([ dals.make_lambda, e]) },
  R.call,
  //(e, c) => { c((e1, c1) => { dals.make_lambda(...e)(e1, c1) } ) },
  (e, c) => {
    c({response: {
        text: "docker output:",
        attachments: {
          text: event
        }
      }
    })
  }
)
