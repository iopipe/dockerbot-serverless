Docker-Slackbot - a serverless Docker slackbot
----------------------------------------------
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000)](https://gitter.im/iopipe/iopipe)

Easily run Docker from Slack with a /docker command!

Usage:
```
/docker busybox uname -a
```
Developed as a demo & example for the
[IOpipe](https://github.com/iopipe/iopipe) library,
which simplifies the development, sharing, and lifecycle-management
of functional, cross-cloud serverless apps.

------------
Installation
------------

1. Add the following Docker API authentication files into
	 _functions/dockercmd/cfg/_: ca.pem,	cert.pem, key.pem.

	For convenience, we recommend using _docker-machine_ or Rackspace
Carina to create these keys. Rackspace Carina is a beta service offering
free, out-of-box Docker Swarm clusters with a downloadable zip file
containing these keys.

2. Run ```npm install``` in the directory _functions/dockercmd/_.
3. Edit _project.json_ to specify your AWS Lambda Execution role ARN.
4. Run ```apex deploy``` or manually deploy on AWS Lambda. ([Download
	 Apex](http://apex.run))
5. Access the portal for Amazon's API Gateway service and click [Create
	 API](https://console.aws.amazon.com/apigateway/).
6. Click "_Import from Swagger_", then "_Select Swagger File_". Choose
	 the _swagger.json_ file at the root of this repository and click
_Import_.
7. Click _Actions -> Deploy API_ and choose _Deployment Stage_, "[New
	 Stage]" and specify a stage name (i.e. "prod").
8. From the Stage Editor copy the "Invoke URL" from the top of the page.
9. Navigate to Slack's [Custom
	 Integrations](https://slack.com/apps/manage/custom-integrations)
page.
10. Click _Slack Commands_.
11. Click _Add Configuration_.
12. Under, "Choose a Command", specify the slash-command you would like
		to trigger this plugin. We recommend */docker* or */docker-run*.
13. Paste the "Invoke URL" from AWS API Gateway into Slack's URL field.
14. Specify _Method_, GET.
15. Click _Save Integration_.

-------
License
-------

Apache 2.0; Copyright 2016, IOpipe, Inc.
