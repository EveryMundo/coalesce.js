const coalesce = (...args) => args.reduce((a, b) => a || b)

module.exports = { coalesce }
