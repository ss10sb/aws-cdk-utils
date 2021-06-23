const {ConfigEnvironments} = require("../../src/config");
module.exports = {
    Environment: ConfigEnvironments.SDLC,
    Parameters: {
        secrets: {
            FOO: 'sdlc'
        }
    }
}