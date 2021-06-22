const {ConfigEnvironments} = require("../../src/config");
module.exports = {
    Environment: ConfigEnvironments.PROD,
    Parameters: {
        secrets: {
            FOO: 'prod'
        }
    }
}