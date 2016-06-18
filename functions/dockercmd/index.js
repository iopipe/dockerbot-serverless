var fs = require("fs")
var R = require("ramda")
var iopipe = require("iopipe")()
var Dockaless = require('dockaless')

var dals = new Dockaless({
  protocol: "https",
  host: "146.20.68.182",
  port: 2376,
  ca: fs.readFileSync('./cfg/ca.pem'),
  cert: fs.readFileSync('./cfg/cert.pem'),
  key: fs.readFileSync('./cfg/key.pem')
})

exports.handle = (event, context) => {
  iopipe.define(
    (e, c) => {
      /* Mangle Slack input */
      var s = e.text.split(" ", 1)
      c({
        image: s[0],
        command: s[1]
      })
    },
    (e, c) => {
      /* Run docker image with command */
      dals.make_lambda(e.image, e.command)({}, c)
    },
    (e, c) => {
      /* Format Slack response */
      c({response: {
          text: "docker output:",
          attachments: {
            text: e
          }
        }
      })
    },
    (e, c) => { c(JSON.stringify(e)) },
    event.response_url
  )(event, context)
}
//module.exports = exports.handle
//exports.handler = exports.handle

// Example usage:
// exports.handle({ text: "busybox ls" }, iopipe.make_context((e) => { console.log(e) }))
