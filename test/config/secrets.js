const {ConfigEnvironments} = require("../../src/config");
module.exports = {
    Name: 'secrets',
    College: 'PCC',
    Environment: ConfigEnvironments.SDLC,
    Version: "0.0.0",
    Parameters: {
        secrets: {
            FOO: 'sdlc'
        }
    }
}