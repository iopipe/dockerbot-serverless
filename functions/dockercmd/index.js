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
      console.log(JSON.stringify(e.text))
      var s = e.text.indexOf(" ")
      var image = e.text.slice(0, s)
      var command = e.text.slice(s)
      c({
        image: image,
        command: command
      })
    },
    (e, c) => {
      /* Run docker image with command */
      console.log("Running Docker: "+e.image+" "+e.command)
      dals.make_lambda(e.image, e.command)({ }, iopipe.make_context(c))
      c(e.image)
    },
    (e, c) => {
      console.log("Formatting slack response")
      /* Format Slack response */
      c({response: {
          text: "docker output:",
          attachments: {
            text: e
          }
        }
      })
    }
    //(e, c) => { c(JSON.stringify(e)) }
    /*require('request')(
      event.response_url,

    )*/
    //event.response_url.toString()
  )(event, iopipe.make_context(context.succeed))
}
