var fs = require("fs")
var R = require("ramda")
var iopipe = require("iopipe")()
var Dockaless = require('dockaless')
var iopipe_agent = require('iopipe-agent')

var dals = new Dockaless({
  host: "146.20.68.182", // put your IP address here.
  port: 2376, // or 2375
  ca: fs.readFileSync('./cfg/ca.pem'),
  cert: fs.readFileSync('./cfg/cert.pem'),
  key: fs.readFileSync('./cfg/key.pem')
})

exports.handle = iopipe_agent(iopipe.define(
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
    dals.make_lambda(e.image, ['sh', '-c', e.command])({ }, c)
  }
  /** The following formats for JSON which is prettier, but
   *  I've had trouble getting this working with AWS Gateway.
   *  --ewindisch */
  /*(e, c) => {
    console.log("Formatting slack response")
    var response = {response: {
        text: "docker output:",
        attachments: {
          text: e
        }
      }
    }
    console.log(response)
    c(response)
  }*/
))
