const {ConfigEnvironments} = require("../../src/config");
module.exports = {
    Environment: ConfigEnvironments.SDLC,
    NameSuffix: 'foo',
    Parameters: {
        secrets: {
            FOO: 'sdlc'
        }
    }
}