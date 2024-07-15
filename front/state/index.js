import { app } from './app';

const merge = require('mergerino').default
const stream = require('mithril/stream')
const meiosis = require('meiosis-setup/mergerino').default

const { states, actions } = meiosis({ app, stream, merge })

export { actions, states };