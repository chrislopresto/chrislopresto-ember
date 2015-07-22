/* global module */

module.exports = {
  scenarios: [
    {
      name: "beta",
      dependencies: {
        "ember": "beta"
      }
    },
    {
      name: 'canary',
      dependencies: {
        "ember": "canary"
      }
    },
    {
      name: "release",
      dependencies: {
        "ember": "1.11.1"
      }
    }
  ]
};
