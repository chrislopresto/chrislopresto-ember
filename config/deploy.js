module.exports = {
  production: {
    "store": {
      "type": "S3",
      "accessKeyId": process.env.CHRISLOPRESTO_RODOG_AWS_ACCESS_KEY_ID,
      "secretAccessKey": process.env.CHRISLOPRESTO_RODOG_AWS_SECRET_ACCESS_KEY,
      "bucket": "chrislopresto.com",
      "hostName": "chrislopresto.com.s3-website-us-east-1.amazonaws.com",
      "indexMode": "indirect",
      "acl": "public-read"
    },

    "assets": {
      "type": "s3",
      "accessKeyId": process.env.CHRISLOPRESTO_RODOG_AWS_ACCESS_KEY_ID,
      "secretAccessKey": process.env.CHRISLOPRESTO_RODOG_AWS_SECRET_ACCESS_KEY,
      "bucket": "chrislopresto.com-assets"
    }
  }
}
