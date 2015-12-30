/* jshint node: true */
'use strict';

module.exports = function(deployTarget) {
  var appName = 'chrislopresto';
  var domain = 'chrislopresto.com';

  var ENV = {};
  ENV.build = {};
  ENV.gzip = {
    zopfli: false
  };
  ENV['s3-index'] = {
    accessKeyId: process.env.CHRISLOPRESTO_RODOG_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.CHRISLOPRESTO_RODOG_AWS_SECRET_ACCESS_KEY,
    bucket: 'chrislopresto.com',
    region: 'us-east-1',
    allowOverwrite: true
  };
  ENV.s3 = {
    accessKeyId: process.env.CHRISLOPRESTO_RODOG_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.CHRISLOPRESTO_RODOG_AWS_SECRET_ACCESS_KEY,
    bucket: 'chrislopresto.com-assets',
    region: 'us-east-1'
  };
  ENV.slack = {
    webhookURL: process.env.ELEGANT_AND_TASTEFUL_EMBER_CLI_DEPLOY_SLACK_WEBHOOK
  };
  ENV.pipeline = {
    activateOnDeploy: true
  };

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
  }

  return ENV;
};
