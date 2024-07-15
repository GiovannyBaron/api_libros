const { map } = require('rambda')

const wrapAttrs = f => ({ attrs, ...other }) => f(attrs, other)

// TODO: lo lCMethods deberían tener la posibilidad de interactuar con los datos estaticos
module.exports = {
    mkComponent: (f, lcMethods = {}) => ({ attrs, ...other }) =>
        map(wrapAttrs, { view: f(attrs, other), ...lcMethods }),
}