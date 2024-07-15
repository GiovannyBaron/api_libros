import { router } from './routes';
import {
  actions, states,
} from './state';
import App from './views';

const { locationBarSync, MithrilRoutes } = router

const m = require('mithril')

m.route(document.body, '/', MithrilRoutes({ states, actions, App }))
states.map(state => locationBarSync(state.route))